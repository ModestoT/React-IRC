require("dotenv").config();

const { formattedNicks } = require("./helpers/ircHelperFunctions.js");

const server = require("http").createServer();
const io = require("socket.io")(server);

const CreateIrcClient = require("./ircClient.js");
const port = process.env.PORT || 3001;

io.on("connection", (socket) => {
	console.log("connection made to server socket!");
	let userChannels = [];

	const ircClient = CreateIrcClient(socket, userChannels);

	socket
		.on("connect to irc", (options) => {
			console.log("connecting to the irc client", options);
			ircClient.connect(options);
		})
		.on("join channel", (channelName) => {
			const channel = ircClient.channel(channelName);

			userChannels.push(channel);
			// channel.updateUsers((updated) => {
			// 	userChannels.push(updated);
			// });
		})
		.on("grab channel list", () => {
			ircClient.list();
		})
		.on("leave channel", (channel) => {
			ircClient.part(channel);

			for (let i = 0; i < userChannels.length; i++) {
				if (userChannels[i].name.toLowerCase() === channel.toLowerCase()) {
					userChannels.splice(i, 1);
					i--;
				}
			}
		})
		.on("msgChannel", (data) => {
			const { target, message } = data;
			ircClient.say(target, message);
		})
		.on("set away", () => {
			ircClient.emit("away", { nick: ircClient.user.nick });
		})
		.on("set back", () => {
			ircClient.emit("back", { nick: ircClient.user.nick });
		})
		.on("error", (err) => {
			console.log("Socket error: ", err);
		})
		.on("disconnect", (reason) => {
			console.log("disconection: ", reason);
			ircClient.quit();
		});
});

server.listen(port, () => {
	console.log(`listening for request to port ${port}`);
});
