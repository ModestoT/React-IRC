const { formatQuitMessage } = require("./helpers/helperFunctions.js");
const { formattedNicks, baseNick, formatNick } = require("./helpers/ircHelperFunctions.js");

module.exports = SetUpChannelListeners = (client, socket, userChannels) => {
	client
		.on("join", (event) => {
			let channel = userChannels.find(
				(channel) => channel.name.toLowerCase() === event.channel.toLowerCase()
			);
			if (channel) {
				client.who(channel.name, (whoList) => {
					const newList = formattedNicks(whoList.users);

					channel.users = newList;

					socket.emit("joined channel", { ...event, users: channel.users });
				});
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
		.on("privmsg", (event) => {
			socket.emit("channel prv msg", {
				...event,
				nick: baseNick(event.nick),
			});
			// if (event.target.toLowerCase() === this.channelName.toLowerCase()) {
			//   const foundUser = this.users.find(
			//     (user) => baseNick(user.nick.toLowerCase()) === event.nick.toLowerCase()
			//   );

			//   if (foundUser) {
			//     this.webSocket.emit("channel prv msg", {
			//       ...event,
			//       nick: foundUser.nick,
			//     });
			//   }
			// }
		})
		.on("away", (event) => {
			let channel = null;

			for (let i = 0; i < userChannels.length; i++) {
				let users = userChannels[i].users;
				for (let j = 0; j < users.length; j++) {
					if (baseNick(users[j].nick.toLowerCase()) === event.nick.toLowerCase()) {
						users[j].away = true;
						channel = userChannels[i];
						break;
					}
				}

				if (channel) break;
			}

			if (channel) {
				socket.emit("users list", {
					channelName: channel.name,
					users: channel.users,
				});
			}
		})
		.on("back", (event) => {
			let channel = null;

			for (let i = 0; i < userChannels.length; i++) {
				let users = userChannels[i].users;
				for (let j = 0; j < users.length; j++) {
					if (baseNick(users[j].nick.toLowerCase()) === event.nick.toLowerCase()) {
						users[j].away = false;
						channel = userChannels[i];
						break;
					}
				}

				if (channel) break;
			}
			if (channel) {
				socket.emit("users list", {
					channelName: channel.name,
					users: channel.users,
				});
			}
		})
		.on("kick", (event) => {
			let channel = userChannels.find(
				(channel) => channel.name.toLowerCase() === event.channel.toLowerCase()
			);

			if (channel) {
				socket.emit("left channel", {
					...event,
					channel: channel.name,
					users: channel.users,
				});
			}
		})
		.on("nick", (event) => {
			for (let i = 0; i < userChannels.length; i++) {
				let foundUser = userChannels[i].users.find((user) => {
					if (baseNick(user.nick.toLowerCase()) === event.nick.toLowerCase()) {
						user.nick = formatNick(event.new_nick, user.channel_modes);
						return true;
					}
				});
				if (foundUser) {
					socket.emit("users list", {
						channelName: userChannels[i].name,
						users: userChannels[i].users,
					});
				}
			}
			// const foundUser = this.users.find((user) => {
			// 	if (baseNick(user.nick.toLowerCase()) === event.nick.toLowerCase()) {
			// 		user.nick = formatNick(event.new_nick, user.channel_modes);
			// 		return true;
			// 	}
			// });
			// if (foundUser) {
			// 	this.webSocket.emit("users list", {
			// 		channelName: this.channelName,
			// 		users: this.users,
			// 	});
			// }
		});
};
