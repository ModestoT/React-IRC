import io from "socket.io-client";

import { FormatIntoMatrix } from "./GeneralHelpers.js";

export const CreateIrcConnection = ircOptions => {
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

export const ParseForChannelName = message => {
	if (message[0] === "[") {
		let channelName = "";
		for (let i = 1; i < message.length; i++) {
			if (message[i] === "]") break;
			channelName += message[i];
		}

		return channelName;
	} else {
		return null;
	}
};

export const GrabServerName = serverUrl => {
	const servername = serverUrl.split(".");

	return servername[1];
};

export const SearchChannelMatrix = (matrix, tar, limit) => {
	let res = [];

	for (let i = 0; i < matrix.length; i++) {
		let searchRes = matrix[i].filter(channel => {
			return (
				FormatChannelName(channel.channel)
					.toLowerCase()
					.indexOf(tar.toLowerCase()) !== -1
			);
		});
		if (searchRes.length > 0) {
			res = [...res, ...searchRes];
		}
	}

	return FormatIntoMatrix(res, limit);
};

const FormatChannelName = str => {
	if (str[0] !== "#") return str;

	return str.replace(/(#)|(\/|\[)|(\])/gi, "");
};
