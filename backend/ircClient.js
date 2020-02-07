const IRC = require("irc-framework");
const { formatQuitMessage, sortMatrix, findChannelLeft } = require("./helperFunctions.js");

module.exports = CreateIrcClient = (socket, userChannels )=> {
  const client = new IRC.Client();
  let availableChannels = [];

  client.on('socket connected', () => {
    console.log("IRC Socket connected Registering...");
    socket.emit("connected");

  }).on('connected', e => {
    console.log("Connected: \n", e);
    // console.log("joining channel...");
    // channel = client.channel('#Rizon');
    // channel.updateUsers(channel => {
    //   socket.emit("users list", {channelName: channel.name, users: channel.users});
    // })
  }).on("channel list start", () => {
    socket.emit("grabbing channel list");

  }).on('channel list', list => {
    availableChannels.push(list);
    socket.emit("available channels", list.length);

  }).on("channel list end", () => {
    sortMatrix(availableChannels, (a, b) => {
      return b.num_users - a.num_users;
    });

    socket.emit("grabbing channel list end", availableChannels);
    availableChannels = [];
  }).on('debug', e => {
    console.log("debug: ", e);

  }).on('join', e => {
    // console.log("JOINED CHANNEL: ", e);
    socket.emit("joined channel", e);
    // console.log(userChannels);

  }).on('action', e => {
    console.log("action: ", e);

  }).on('topic', e => {
    console.log("Topic event: ", e);

  }).on('part', e => {
    // console.log("Part Event: ", e);
    socket.emit("left channel", {...e, message: formatQuitMessage(e.message)});

  }).on('quit', e => {
    // console.log("Quit event", e);
    // let channelList = []; for keeping track of what channels the user is in when they quit the server
    // loop through all the channels the user is apart of and if the user that quit the server is
    // in a channel append it to the list and send the list of channels to the frontend
    // console.log("Quit event: ", e);
    const channelsLeft = findChannelLeft(userChannels, e.nick.toLowerCase());

    channelsLeft.forEach(channel => {
      socket.emit("left channel", {...e, channel: channel.name});
    });

  }).on('invited', e => {
    console.log("Invite event: ", e);

  }).on('notice', e => {
    // console.log("Notice event: ", e);
    //do this on front end to properly display BOLD and color assignments /u00002 = bold /u0003 = blue
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
    socket.emit("channel prv msg", e);
  }).on('tagmsg', e => {
    console.log("Tag Msg event: ", e);

  }).on("wallops", e => {
    console.log("Wallop event: ", e);

  }).on('ctcp request', e => {
    console.log("CTCP Request event", e);

  }).on('motd', e => {
    // console.log("MOTD event: ", e);
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
    socket.disconnect(true);
  });

  return client;
};