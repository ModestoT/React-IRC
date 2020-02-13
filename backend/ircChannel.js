const { formatQuitMessage } = require("./helpers/helperFunctions.js");
const { formattedNicks } = require("./helpers/ircHelperFunctions.js");

module.exports = class IrcChannel {
	constructor(ircClient, channelName, webSocket, key) {
		this.ircClient = ircClient;
		this.webSocket = webSocket;
		this.channelName = channelName;
		this.users = [];

		ircClient
			.on("join", event => {
				if (event.channel.toLowerCase() === this.channelName.toLowerCase()) {
					if (event.nick.toLowerCase() === this.ircClient.user.nick.toLowerCase()) {
						this.webSocket.emit("joined channel", { ...event, users: this.users });
					} else {
						this.ircClient.who(event.nick, ({ users }) => {
							this.users.push(users[0]);

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
						({ nick }) => nick.toLowerCase() !== event.nick.toLowerCase()
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
						({ nick }) => nick.toLowerCase() !== event.kicked.toLowerCase()
					);

					this.webSocket.emit("left channel", {
						...event,
						channel: this.channelName,
						users: this.users
					});
				}
			})
			.on("quit", event => {
				let isThisChannel = false;

				this.users = this.users.filter(({ nick }) => {
					if (nick.toLowerCase() === event.nick.toLowerCase()) {
						isThisChannel = true;
					}

					return nick.toLowerCase() !== event.nick.toLowerCase();
				});

				if (isThisChannel) {
					this.webSocket.emit("left channel", {
						...event,
						channel: this.channelName,
						users: this.users
					});
					isThisChannel = false;
				}
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
};
