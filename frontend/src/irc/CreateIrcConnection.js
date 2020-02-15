import io from "socket.io-client";

import { AddConfigToStorage } from "../helpers/GeneralHelpers.js";

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

const CreateIrcConnection = (ircOptions, saveConfig) => {
	if (saveConfig) {
		AddConfigToStorage({ ...ircOptions, saveConfig });
	}

	return ConnectToIrc(ircOptions);
};
export default CreateIrcConnection;
