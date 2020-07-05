const icons = {
  Clear: '☀',
  Night:'🌙',
  // Hail: '⛆',
  // 'Heavy Cloud': '☁️',
  // 'Light Cloud': '⛅',
  // 'Heavy Rain': '⛈️',
  // 'Light Rain': '🌧️',
  // Showers: '🌧️',
  // Sleet: '🌨️',
  // Snow: '❄️',
  // Thunder: '⛈️'
};

export default hours => {
  if(hours > 6 && hours < 18){
    return icons["Clear"]
  }
  return icons["Night"];
}