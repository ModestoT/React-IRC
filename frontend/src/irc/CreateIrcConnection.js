import io from "socket.io-client";

import { AddServerToStorage } from "../helpers/GeneralHelpers.js";

const ConnectToIrc = ircOptions => {
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

const CreateIrcConnection = (ircOptions, saveServer) => {
	if (saveServer) {
		AddServerToStorage({ ...ircOptions, saveServer });
	}

	return ConnectToIrc(ircOptions);
};
export default CreateIrcConnection;
