import io from "socket.io-client";


export const createIrcConnection = ircOptions => {
  const socket = io.connect("http://localhost:3001");

  console.log("connecting to irc client")
  socket.emit("connect to irc", {
    ...ircOptions,
    username: ircOptions.nick,
    gecos: ircOptions.nick,
    port: Number(ircOptions.port)
  });

  return socket;
};

export const parseForChannelName = message => {
  if(message[0] === '['){
    let channelName = '';
    for(let i = 1; i < message.length; i++){
      if(message[i] === ']') break;
      channelName += message[i];
    }
    
    return channelName;
  } else {
    return null;
  }
}