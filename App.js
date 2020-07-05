
import React, { useReducer, useEffect, useRef, useState } from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  StatusBar,
  AppState
} from 'react-native';

import SearchInput from './SearchInput'
import moment from 'moment';
import getImageForWeather from './utils/getImageForWeather'
import getIconForWeather from './utils/getIconForWeather'
import { getTemperature,getNextFromCurrent,getAfterFromCurrent } from './utils/api';

const reducer = (state, action) => {
  switch (action.type) {
    case "setError":
      return {
        ...state,
        error: action.payload,
        loading: false
      }
    case "setLoading":
      return {
        ...state,
        loading: action.payload,
      }
    case "saveCurrent":
      return {
        ...state,
        temperature: action.payload.Temperature,
        created: action.payload.timestamp,
        loading: false,
        error: false
      }
    case "saveNextFromCurrent":
      return {
        ...state,
        next:action.payload
      }
    case "saveAfterFromCurrent":
      return {
        ...state,
        after:action.payload
      }
    default:
      return state
  }
}
const initial = {
  loading: false,
  error: false,
  temperature: null,
  created: null,
  next:null,
  after:null
}
const App = () => {
  const [state, dispatch] = useReducer(reducer, initial)
  const appState = useRef(AppState.currentState);

  let interval
  useEffect(() => {
    AppState.addEventListener('change', _handleAppStateChange);
    dispatch({ type: "setLoading", payload: true })
    callAPI()
    interval = setInterval(callAPI, 10000)
    return () => {
      clearInterval(interval)
      AppState.removeEventListener('change', _handleAppStateChange);
    }
  }, [])

  const _handleAppStateChange = nextAppState => {
    if (appState.current.match(/inactive|active/) && nextAppState === "background") {
      console.log("App has come to the background!");
      clearInterval(interval)
    }
    if (appState.current.match(/inactive|background/) && nextAppState === "active") {
      console.log("App has come to the foreground!");
      callAPI()
      interval = setInterval(callAPI, 10000)
    }
    appState.current = nextAppState
  };

  async function callAPI() {
    try 
    {
      const current = await getTemperature()
      current.timestamp = moment.unix(current.timestamp / 1000).format("DD MMM YYYY hh:mm:ss a")
      dispatch({ type: "saveCurrent", payload: current })
      let next = await getNextFromCurrent()
      dispatch({type:"saveNextFromCurrent",payload:next})
      let after = await getAfterFromCurrent()
      dispatch({type:"saveAfterFromCurrent",payload:after})
    }
    catch (e) {
      console.log(e)
      dispatch({ type: "setError",payload: true })
    }
  }

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">

      <StatusBar barStyle="light-content" />

      <ImageBackground
        source={getImageForWeather(moment().hours())}
        style={styles.imageContainer}
        imageStyle={styles.image}
      >

        <View style={[styles.detailsContainer, styles.opacity(moment().hours())]}>
          <ActivityIndicator animating={state.loading} color="white" size="large" />

          {!state.loading && (
            <View>
              {state.error && (
                <Text style={[styles.regularText, styles.textStyle]}>
                  😞 Failed to connect. Please check your connect... 
                </Text>
              )}
              {!state.error && (
                <View>
                  <Text style={[styles.largeText, styles.textStyle, styles.iconSize]}>
                    {getIconForWeather(moment().hours())}
                  </Text>
                  <Text style={[styles.regularText, styles.textStyle]}>
                    Current 
                  </Text>
                  <Text style={[styles.largeText, styles.textStyle]}>
                    {`${state.temperature}°`}
                  </Text>
                </View>
              )}

              {!state.error && (
                <Text style={[styles.regularText, styles.textStyle]}>
                  {`Last update:\n ${moment(state.created, "DD MMM YYYY hh:mm:ss a").startOf('second').fromNow()}`}
                </Text>
              )}

              {/* {!state.error && <SearchInput
                placeholder="T/H"
              // onSubmit={this.handleUpdateLocation}
              />} */}

              {!state.error && (
                <View style={{ paddingTop: 64 }}>
                  <Text style={[styles.regularText, styles.textStyle]}>
                    Next Temperature
                  </Text>
                  <Text style={[styles.mediumText, styles.textStyle]}>
                    {`${state.next}°`}
                  </Text>
                </View>
              )}

              {!state.error && (
                <View style={{ paddingTop: 64 }}>
                  <Text style={[styles.regularText, styles.textStyle]}>
                    After 60'
                  </Text>
                  <Text style={[styles.smallText, styles.textStyle]}>
                    {`${state.after}°`}
                  </Text>
                </View>
              )}

            </View>
          )}
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#34495E',
  },
  imageContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover',
  },
  detailsContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingHorizontal: 20,
    paddingTop: 32
  },
  opacity: (hours) => {
    hours = 20
    var opacity
    if (hours > 5 && hours < 7) {  // 6:00 -> 6:59
      opacity = 0.5
    }
    else if (hours > 6 && hours < 9) {  // 7:00 -> 8:59
      opacity = 0.3
    }
    else if (hours > 8 && hours < 15) {  // 9 -> 14:59
      opacity = 0.2
    }
    else if (hours > 14 && hours < 17) {  //15 -> 16:59
      opacity = 0.3
    }
    else if (hours > 16 && hours < 19) {  //18 -> 18:59
      opacity = 0.4
    }
    else opacity = 0.4
    return {
      backgroundColor: `rgba(0,0,0,${opacity})`,
    }
  },
  textStyle: {
    textAlign: 'center',
    fontFamily: Platform.OS === 'ios' ? 'AvenirNext-Regular' : 'Roboto',
  },
  iconSize: {
    fontSize: 30,
    paddingBottom: 16,
  },
  largeText: {
    fontSize: 54,
    color: 'rgba(255,255,255,0.9)',
    fontWeight: '500',
  },
  mediumText: {
    fontSize: 50,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '400',

  },
  smallText: {
    fontSize: 46,
    color: 'rgba(255,255,255,0.5)',
    fontWeight: '300',
  },
  regularText: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
  }
});
export default App;
