import React,{useState} from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const SearchInput = (props) => {
  const { placeholder,onSubmit } = props;
  const [text,setText] = useState("")
  
  const handleChangeText = text => {
    setText(text)
  };

  const handleSubmitEditing = () => {
    if (!text) return;
    onSubmit (text);
    // setText("")
  };

    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="gray"
          underlineColorAndroid="transparent"
          textAlign="center"
          style={styles.textInput}
          // clearButtonMode="always"
          // keyboardType={"decimal-pad"}
          onChangeText={handleChangeText}
          onSubmitEditing={handleSubmitEditing}
        />
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    marginHorizontal: 40,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: 'rgba(255,255,255,0.5)',
  },
});

export default SearchInput
