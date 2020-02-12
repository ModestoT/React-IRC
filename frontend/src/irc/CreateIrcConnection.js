import io from "socket.io-client";

const CreateIrcConnection = ircOptions => {
	const socket = io.connect("http://localhost:3001");

	console.log("connecting to irc client");
	socket.emit("connect to irc", {
		...ircOptions,
		username: ircOptions.nick,
		gecos: ircOptions.nick,
		port: Number(ircOptions.port)
	});

	return socket;
};

export default CreateIrcConnection;
