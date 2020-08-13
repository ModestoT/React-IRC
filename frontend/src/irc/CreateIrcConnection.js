import io from "socket.io-client";

import { AddServerToStorage } from "../helpers/GeneralHelpers.js";
const backend = process.env.REACT_APP_BACKEND || "http://localhost:3001";

const ConnectToIrc = (ircOptions) => {
	console.log(`connecting to ${backend}`);
	const socket = io.connect(backend);

	console.log("connecting to irc client");
	socket.emit("connect to irc", {
		...ircOptions,
		username: ircOptions.nick,
		gecos: ircOptions.nick,
		port: Number(ircOptions.port),
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
