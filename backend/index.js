require("dotenv").config();

const server = require("http").createServer();
const io = require("socket.io")(server);
const CreateIrcClient = require("./ircClient.js");

const port = process.env.PORT || 3001;

io.on("connection", socket => {
	console.log("connection made to server socket!");
	let userChannels = [];
	const ircClient = CreateIrcClient(socket, userChannels);

	// options param structure :
	// {
	//   host: string, (ex: 'irc.freenode.net')
	//   port: int, (ex: 6697)
	//   nick: string,
	//   username: string,
	//   gecos: string, (irc realname)
	//   ssl: boolean (have secure connection or not)
	// }
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
					users: channel.users
				});
			});
		})
		.on("grab channel list", () => {
			ircClient.list();
		})
		.on("disconnect", reason => {
			console.log("disconection: ", reason);
			ircClient.quit();
		});
});

server.listen(port, () => {
	console.log(`listening for request to port ${port}`);
});

// let net = require("net");

// let client = net.connect({
//   host: 'irc.rizon.net',
//   port: '6667'
// });

// client.on('data', function(data) {
//   console.log(data.toString());
// });

// client.on('connect', e => {
//   console.log("connect:", e);
//   client.write('NICK username\r\nUSER username criten rizen :username\r\nJOIN #nibl\r\n');
// });

// client.on('error', err => {
//   console.log("error:", err);
//   client.end();
// })
// client.on('end', function() {
//   console.log('disconnected from server');
// });
