const images = {
   Clear: require('../assets/clear.png'),
  // 'Heavy Cloud': require('../assets/heavy-cloud.png'),
  // 'Light Cloud': require('../assets/light-cloud.png'),
  'Sunrise': require('../assets/Sunrise.jpg'),
  'Sundown':require('../assets/Sundown.jpg'),
  'Night': require('../assets/Night.jpg'),
};

export default hours => {
  if(hours > 5 && hours < 7 ){  // 6:00 -> 6:59
    return images["Sunrise"];
  }
  else if(hours > 6 && hours < 17 ){  //7 -> 16:59
    return images["Clear"];
  }
  else if ( hours > 16 && hours < 19){ //17 -> 18:59
    return images["Sundown"];
  }
  return images["Night"]
}
