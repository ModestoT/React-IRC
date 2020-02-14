import io from "socket.io-client";

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
		const pastConfigs = JSON.parse(localStorage.getItem("past_configs"));
		if (pastConfigs && pastConfigs.length > 0) {
			console.log("running save config");
			pastConfigs.push({ id: pastConfigs[pastConfigs.length - 1].id + 1, ...ircOptions });
			localStorage.setItem("past_configs", JSON.stringify(pastConfigs));
		} else {
			localStorage.setItem("past_configs", JSON.stringify([{ id: 1, ...ircOptions }]));
		}
	}

	return ConnectToIrc(ircOptions);
};
export default CreateIrcConnection;
