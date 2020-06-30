const { formatQuitMessage } = require("./helpers/helperFunctions.js");
const { baseNick } = require("./helpers/ircHelperFunctions.js");

module.exports = SetUpChannelListeners = (client, socket, userChannels) => {
	client
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
		});
};
