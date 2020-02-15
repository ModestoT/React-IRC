require("dotenv").config();

const server = require("http").createServer();
const io = require("socket.io")(server);

const CreateIrcClient = require("./ircClient.js");
const IrcChannel = require("./ircChannel.js");
const port = process.env.PORT || 3001;

io.on("connection", socket => {
	console.log("connection made to server socket!");
	let userChannels = [];

	const ircClient = CreateIrcClient(socket);

	socket
		.on("connect to irc", options => {
			console.log("connecting to the irc client", options);
			ircClient.connect(options);
		})
		.on("join channel", channelName => {
			const channel = new IrcChannel(ircClient, channelName, socket);

			channel.updateUsers(updated => {
				userChannels.push(updated);
			});
		})
		.on("grab channel list", () => {
			ircClient.list();
		})
		.on("leave channel", channel => {
			ircClient.part(channel);

			for (let i = 0; i < userChannels.length; i++) {
				if (userChannels[i].channelName.toLowerCase() === channel.toLowerCase()) {
					userChannels[i].removeListeners();
					userChannels.splice(i, 1);
				}
			}
		})
		.on("msgChannel", data => {
			const { target, message } = data;
			ircClient.say(target, message);
		})
		.on("set away", () => {
			ircClient.emit("away", { nick: ircClient.user.nick });
		})
		.on("set back", () => {
			ircClient.emit("back", { nick: ircClient.user.nick });
		})
		.on("error", err => {
			console.log("Socket error: ", err);
		})
		.on("disconnect", reason => {
			console.log("disconection: ", reason);
			ircClient.quit();
		});
});

server.listen(port, () => {
	console.log(`listening for request to port ${port}`);
});
