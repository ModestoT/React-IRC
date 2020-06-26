const IRC = require("irc-framework");
const { sortMatrix, getErrMsg, formatQuitMessage } = require("./helpers/helperFunctions.js");
const { baseNick } = require("./helpers/ircHelperFunctions.js");

module.exports = CreateIrcClient = (socket, userChannels) => {
	const client = new IRC.Client();
	let availableChannels = [];

	client
		.on("socket connected", () => {
			console.log("IRC Socket connected Registering...");
			socket.emit("connected");
		})
		.on("connected", (e) => {
			console.log("Connected: \n", e);
			socket.emit("connected to server");
		})
		.on("channel list start", () => {
			socket.emit("grabbing channel list");
		})
		.on("channel list", (list) => {
			availableChannels.push(list);
			socket.emit("available channels", list.length);
		})
		.on("join", (event) => {
			let channel = userChannels.find(
				(channel) => channel.name.toLowerCase() === event.channel.toLowerCase()
			);
			if (channel) {
				if (event.nick.toLowerCase() === client.user.nick.toLowerCase()) {
					socket.emit("joined channel", { ...event, users: [] });
				} else {
					client.who(event.nick, ({ users }) => {
						socket.emit("joined channel", {
							...users[0],
							channel: channel.name,
							users: channel.users,
						});
					});
				}
			}
		})
		.on("part", (event) => {
			if (event.nick.toLowerCase() !== client.user.nick.toLowerCase()) {
				const channelLeft = userChannels.find(
					(channel) => channel.name.toLowerCase() === event.channel.toLowerCase()
				);

				socket.emit("left channel", {
					...event,
					message: formatQuitMessage(event.message),
					users: channelLeft.users,
				});
			}
		})
		.on("quit", (event) => {
			let channelLeft = null;

			for (let i = 0; i < userChannels.length; i++) {
				let users = userChannels[i].users;
				for (let j = 0; j < users.length; j++) {
					if (users[j].nick.toLowerCase() === event.nick.toLowerCase()) {
						channelLeft = userChannels[i];
						break;
					}
				}

				if (channelLeft) break;
			}

			if (channelLeft) {
				socket.emit("left channel", {
					...event,
					channel: channelLeft.name,
					users: channelLeft.users,
				});
			}
		})
		.on("channel list end", () => {
			sortMatrix(availableChannels, (a, b) => {
				return b.num_users - a.num_users;
			});

			socket.emit("grabbing channel list end", availableChannels);
			availableChannels = [];
		})
		.on("action", (e) => {
			console.log("action: ", e);
		})
		.on("topic", (e) => {
			console.log("Topic event: ", e);
			// socket.emit("set channel topic", e);
		})
		.on("invited", (e) => {
			console.log("Invite event: ", e);
		})
		.on("notice", (e) => {
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
				message: newData,
			});
		})
		.on("privmsg", (e) => {
			if (e.target.toLowerCase() === client.user.nick.toLowerCase()) {
				console.log("private message to you :", e);

				socket.emit("personal msg", { sentFrom: e.nick, message: e.message });
			}
		})
		.on("tagmsg", (e) => {
			console.log("Tag Msg event: ", e);
		})
		.on("wallops", (e) => {
			console.log("Wallop event: ", e);
		})
		.on("motd", (e) => {
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
		.on("nick in use", (err) => {
			socket.emit("errMsg", err.reason);
		})
		.on("nick invalid", (err) => {
			socket.emit("errMsg", err.reason);
		})
		.on("raw", (e) => {
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
		.on("error", (e) => {
			console.log("IRC error event: ", e);
		});

	return client;
};
