const { formatQuitMessage } = require("./helpers/helperFunctions.js");
const { formattedNicks, baseNick, formatNick } = require("./helpers/ircHelperFunctions.js");

module.exports = class IrcChannel {
	constructor(ircClient, channelName, webSocket, key) {
		this.ircClient = ircClient;
		this.webSocket = webSocket;
		this.channelName = channelName;
		this.users = [];

		this.ircClient
			.on("join", event => {
				if (event.channel.toLowerCase() === this.channelName.toLowerCase()) {
					if (event.nick.toLowerCase() === this.ircClient.user.nick.toLowerCase()) {
						this.webSocket.emit("joined channel", { ...event, users: this.users });
					} else {
						this.ircClient.who(event.nick, ({ users }) => {
							this.users.push({ ...users[0], channel: this.channelName });

							this.webSocket.emit("joined channel", {
								...users[0],
								channel: this.channelName,
								users: this.users
							});
						});
					}
				}
			})
			.on("part", event => {
				if (
					event.channel.toLowerCase() === this.channelName.toLowerCase() &&
					event.nick.toLowerCase() !== this.ircClient.user.nick.toLowerCase()
				) {
					this.users = this.users.filter(
						({ nick }) => baseNick(nick.toLowerCase()) !== event.nick.toLowerCase()
					);

					this.webSocket.emit("left channel", {
						...event,
						message: formatQuitMessage(event.message),
						users: this.users
					});
				}
			})
			.on("kick", event => {
				if (event.channel.toLowerCase() === this.channelName.toLowerCase()) {
					this.users = this.users.filter(
						({ nick }) => baseNick(nick.toLowerCase()) !== event.kicked.toLowerCase()
					);

					this.webSocket.emit("left channel", {
						...event,
						channel: this.channelName,
						users: this.users
					});
				}
			})
			.on("nick", event => {
				const foundUser = this.users.find(user => {
					if (baseNick(user.nick.toLowerCase()) === event.nick.toLowerCase()) {
						user.nick = formatNick(event.new_nick, user.channel_modes);
						return true;
					}
				});
				if (foundUser) {
					this.webSocket.emit("users list", {
						channelName: this.channelName,
						users: this.users
					});
				}
			})
			.on("quit", event => {
				let isThisChannel = false;

				this.users = this.users.filter(({ nick }) => {
					if (baseNick(nick.toLowerCase()) === event.nick.toLowerCase()) {
						isThisChannel = true;
					}

					return baseNick(nick.toLowerCase()) !== event.nick.toLowerCase();
				});

				if (isThisChannel) {
					this.webSocket.emit("left channel", {
						...event,
						channel: this.channelName,
						users: this.users
					});
					isThisChannel = false;
				}
			})
			.on("away", event => {
				const foundUser = this.users.find(user => {
					if (baseNick(user.nick.toLowerCase()) === event.nick.toLowerCase()) {
						user.away = true;
						return true;
					}
				});
				if (foundUser) {
					this.webSocket.emit("users list", {
						channelName: this.channelName,
						users: this.users
					});
				}
			})
			.on("back", event => {
				const foundUser = this.users.find(user => {
					if (baseNick(user.nick.toLowerCase()) === event.nick.toLowerCase()) {
						user.away = false;
						return true;
					}
				});
				if (foundUser) {
					this.webSocket.emit("users list", {
						channelName: this.channelName,
						users: this.users
					});
				}
			})
			.on("privmsg", event => {
				if (event.target.toLowerCase() === this.channelName.toLowerCase()) {
					const foundUser = this.users.find(
						user => baseNick(user.nick.toLowerCase()) === event.nick.toLowerCase()
					);

					if (foundUser) {
						this.webSocket.emit("channel prv msg", {
							...event,
							nick: foundUser.nick
						});
					}
				}
				// client.who(e.nick, res => {
				// 	if (res.users[0].nick === e.nick) {
				// 		socket.emit("channel prv msg", {
				// 			...e,
				// 			nick: formatNick(res.users[0].nick, res.users[0].channel_modes)
				// 		});
				// 	} else {
				// 		console.log("incorrect nick", res, e);
				// 	}
				// });
			});

		this.ircClient.join(channelName, key);
	}

	updateUsers(cb) {
		this.ircClient.who(this.channelName, whoList => {
			const newList = formattedNicks(whoList.users);

			this.users = newList;

			this.webSocket.emit("users list", {
				channelName: this.channelName,
				users: this.users
			});
		});
		if (typeof cb === "function") {
			cb(this);
		}
	}

	removeListeners() {
		this.ircClient.removeListener("join");
		this.ircClient.removeListener("part");
		this.ircClient.removeListener("kick");
		this.ircClient.removeListener("nick");
		this.ircClient.removeListener("quit");
		this.ircClient.removeListener("away");
		this.ircClient.removeListener("back");
		this.ircClient.removeListener("privmsg");
	}
};
