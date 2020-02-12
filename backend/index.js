require("dotenv").config();

const server = require("http").createServer();
const io = require("socket.io")(server);

const CreateIrcClient = require("./ircClient.js");
const { updateUsersList } = require("./helpers/ircHelperFunctions.js");
const port = process.env.PORT || 3001;

io.on("connection", socket => {
	console.log("connection made to server socket!");
	let userChannels = [];

	const ircClient = CreateIrcClient(socket, userChannels);

	socket
		.on("connect to irc", options => {
			console.log("connecting to the irc client", options);
			ircClient.connect(options);
		})
		.on("join channel", channelName => {
			const channel = ircClient.channel(channelName);

			userChannels.push(channel);
			updateUsersList(channel, socket);
		})
		.on("grab channel list", () => {
			ircClient.list();
		})
		.on("leave channel", channelName => {
			const channel = userChannels.find(({ name }) => name === channelName);

			channel.part();
		})
		.on("msgChannel", data => {
			const { target, message } = data;
			const channel = userChannels.find(({ name }) => name === target);

			channel.say(message);
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
