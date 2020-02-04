const IRC = require("irc-framework");

module.exports = createIrcClient = socket => {
  const client = new IRC.Client();

  client.on('socket connected', () => {
    console.log("IRC Socket connected Registering...");
  }).on('connected', e => {
    console.log("Connected: \n", e);
    console.log("joining channel...");
    client.join("#horriblesubs");
  }).on('debug', e => {
    console.log("debug: ", e);
  }).on('join', e => {
      console.log("JOINED CHANNEL: ", e);
      socket.emit("joined channel", e);
  }).on('action', e => {
    console.log("action: ", e);
  }).on('topic', e => {
    console.log("Topic event: ", e);
  }).on('part', e => {
    console.log("Part Event: ", e);
  }).on('quit', e => {
    console.log("Quit event", e);
  }).on('invited', e => {
    console.log("Invite event: ", e);
  }).on('notice', e => {
    console.log("Notice event: ", e);
    let newData = e.message;
    if(newData.includes("\u0002")){
      const tempData = newData.replace(/\u0002/g, "").replace(/\u0003/g, "").replace(/11/g, "");
      newData = tempData;
    }
    socket.emit("irc notice", {
      nick: e.nick,
      message: newData
    });
  }).on('privmsg', e => {
    console.log("Private message event: ", e);
  }).on('tagmsg', e => {
    console.log("Tag Msg event: ", e);
  }).on("wallops", e => {
    console.log("Wallop event: ", e);
  }).on('ctcp request', e => {
    console.log("CTCP Request event", e);
  }).on('motd', e => {
    console.log("MOTD event: ", e);
    let newData = e.motd;
    if(newData.includes("\u0002")){
      const tempData = newData.replace(/\u0002/g, "").replace(/\u0003/g, "").replace(/11/g, "");
      newData = tempData;
    }
    socket.emit("server motd", newData);
  }).on('raw', e => {
    // console.log("Raw event:", e);
    // console.log(e.line.replace('\n', ''));
    // socket.emit("irc connection", e.line);
  }).on('reconnecting', () => {
    console.log("reconnecting...");
  }).on('socket close', () => {
    console.log("irc client disconected");
  });

  return client;
};