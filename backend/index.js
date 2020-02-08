require("dotenv").config();

const server = require("http").createServer();
const io = require("socket.io")(server);

const CreateIrcClient = require("./ircClient.js");
const { strSortFn } = require("./helperFunctions.js");

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

			channel.updateUsers(channel => {
				socket.emit("users list", {
					channelName: channel.name,
					users: channel.users.sort(strSortFn)
				});
			});
		})
		.on("grab channel list", () => {
			ircClient.list();
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
