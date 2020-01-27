const IRC = require("irc-framework");

module.exports = createIrcClient = socket => {
  const client = new IRC.Client();

  client.on('socket connected', () => {
    console.log("Socket connected Registering...");
  });

  client.on('connected', e => {
    console.log("Connected: \n", e);
    console.log("joining channel...");
    client.join("#horriblesubs");
  });

  client.on('debug', e => {
    console.log("debug: ", e);
  });

  client.on('join', e => {
    if(e.nick === client.options.nick){
      console.log("JOINED CHANNEL: ", e);
      socket.emit("irc connection", e);
    }
  });

  client.on('action', e => {
    console.log("action: ", e);
  });

  client.on('raw', e => {
    // console.log(e.line.replace('\n', ''));
    socket.emit("irc connection", e.line);
  });

  client.on('reconnecting', () => {
    console.log("reconnecting...");
  });

  client.on('socket close', () => {
    console.log("irc client disconected");
  });

  return client;
};