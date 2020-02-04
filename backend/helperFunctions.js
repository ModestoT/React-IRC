const formatQuitMessage = message => {
  if(message === '' || message[0] !== '#') return message;
  let cutOffPoint = 0;
  for(let i = 0; i < message.length; i++){
    if(message[i] === ' ') break;
    cutOffPoint++;
  }
  return message.slice(cutOffPoint);
};


module.exports = {
  formatQuitMessage
}