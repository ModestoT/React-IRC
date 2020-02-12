const IRC = require("irc-framework");
const {
	formatQuitMessage,
	sortMatrix,
	strSortFn,
	getErrMsg
} = require("./helpers/helperFunctions.js");
const { updateUsersList } = require("./helpers/ircHelperFunctions.js");
const QuitBuffer = require("./quitBuffer.js");

module.exports = CreateIrcClient = (socket, userChannels) => {
	const client = new IRC.Client();
	const quitBuffer = new QuitBuffer({ socket, userChannels });
	let availableChannels = [];

	client
		.on("socket connected", () => {
			console.log("IRC Socket connected Registering...");
			socket.emit("connected");
		})
		.on("connected", e => {
			console.log("Connected: \n", e);
		})
		.on("channel list start", () => {
			socket.emit("grabbing channel list");
		})
		.on("channel list", list => {
			availableChannels.push(list);
			socket.emit("available channels", list.length);
		})
		.on("channel list end", () => {
			sortMatrix(availableChannels, (a, b) => {
				return b.num_users - a.num_users;
			});

			socket.emit("grabbing channel list end", availableChannels);
			availableChannels = [];
		})
		.on("debug", e => {
			console.log("debug: ", e);
		})
		.on("join", e => {
			// console.log("JOINED CHANNEL: ", e);
			socket.emit("joined channel", e);

			//assuming channel will be there since this listener does not fire unless user has joined a channel
			const channel = userChannels.find(({ name }) => name === e.channel);

			updateUsersList(channel, socket);
		})
		.on("action", e => {
			console.log("action: ", e);
		})
		.on("topic", e => {
			console.log("Topic event: ", e);
			// socket.emit("set channel topic", e);
		})
		.on("part", e => {
			if (e.nick !== client.user.nick) {
				socket.emit("left channel", {
					...e,
					message: formatQuitMessage(e.message)
				});
				//assuming channel will be there since this listener does not fire unless user has joined a channel
				const channel = userChannels.find(({ name }) => name === e.channel);

				updateUsersList(channel, socket);
			}
		})
		.on("quit", e => {
			console.log("Quit event", e);
			quitBuffer.addQuitEvent(e);
		})
		.on("invited", e => {
			console.log("Invite event: ", e);
		})
		.on("notice", e => {
			// console.log("Notice event: ", e);
			//do this on front end to properly display BOLD and color assignments /u00002 = bold /u0003 = blue
			let newData = e.message;
			if (newData.includes("\u0002")) {
				const tempData = newData
					.replace(/\u0002/g, "")
					.replace(/\u0003/g, "")
					.replace(/11/g, "");
				newData = tempData;
			}
			socket.emit("irc notice", {
				nick: e.nick,
				message: newData
			});
		})
		.on("privmsg", e => {
			// console.log("Private message event: ", e);
			socket.emit("channel prv msg", e);
		})
		.on("tagmsg", e => {
			console.log("Tag Msg event: ", e);
		})
		.on("wallops", e => {
			console.log("Wallop event: ", e);
		})
		.on("motd", e => {
			// console.log("MOTD event: ", e);
			let newData = e.motd;
			if (newData.includes("\u0002")) {
				const tempData = newData
					.replace(/\u0002/g, "")
					.replace(/\u0003/g, "")
					.replace(/11/g, "");
				newData = tempData;
			}
			socket.emit("server motd", newData);
		})
		.on("nick in use", err => {
			socket.emit("errMsg", err.reason);
		})
		.on("nick invalid", err => {
			socket.emit("errMsg", err.reason);
		})
		.on("raw", e => {
			const line = /477\s/gi.exec(e.line);
			if (line) {
				console.log("Msg: ", getErrMsg(e.line.replace("\n", ""), line.index));
				socket.emit("errMsg", getErrMsg(e.line.replace("\n", ""), line.index));
			}
			// console.log("Raw event:", e);
			// socket.emit("irc connection", e.line);
		})
		.on("socket close", () => {
			console.log("irc client disconected");
			socket.disconnect(true);
		})
		.on("error", e => {
			console.log("IRC error event: ", e);
		});

	return client;
};
