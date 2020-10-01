import { GrabServerName } from "./IrcHelpers";

export const FormatIntoMatrix = (arr, limit) => {
	if (arr.length <= limit) return [arr];

	let res = [];
	let temp = [];
	for (let i = 0; i < arr.length; i++) {
		temp.push(arr[i]);
		if (temp.length >= limit) {
			res.push(temp);
			temp = [];
		} else {
			res.push();
		}
	}

	return res;
};

export const AddServerToStorage = (server) => {
	const pastServers = JSON.parse(localStorage.getItem("past_servers"));
	if (pastServers && pastServers.length > 0) {
		console.log("running save Server");

		const alreadySaved = pastServers.find(
			(savedServer) =>
				savedServer.host === server.host &&
				savedServer.nick.toLowerCase() === server.nick.toLowerCase()
		);

		if (!alreadySaved) {
			pastServers.push({ id: pastServers[pastServers.length - 1].id + 1, ...server, channels: [] });
			localStorage.setItem("past_servers", JSON.stringify(pastServers));
		}
	} else {
		localStorage.setItem("past_servers", JSON.stringify([{ id: 1, ...server, channels: [] }]));
	}
};

export const AddChannelToPastServers = (channel, serverName, nick) => {
	console.log("running save chanel", channel, serverName);
	const pastServers = JSON.parse(localStorage.getItem("past_servers"));

	for (let i = 0; i < pastServers.length; i++) {
		if (
			pastServers[i].nick.toLowerCase() === nick.toLowerCase() &&
			GrabServerName(pastServers[i].host.toLowerCase()) === serverName.toLowerCase()
		) {
			console.log(pastServers[i]);
			pastServers[i] = {
				...pastServers[i],
				channels: UpdatePastServersChannels(pastServers[i].channels, channel),
			};
			localStorage.setItem("past_servers", JSON.stringify(pastServers));
			return pastServers;
		}
	}
	return null;
};

const UpdatePastServersChannels = (channels, newChannel) => {
	for (let i = 0; i < channels.length; i++) {
		if (channels[i].toLowerCase() === newChannel.toLowerCase()) {
			return channels;
		}
	}
	channels.push(newChannel);

	return channels;
};

export const DeleteServer = (id) => {
	const pastServers = JSON.parse(localStorage.getItem("past_servers"));
	const serverIndex = pastServers.findIndex((server) => server.id === id);

	pastServers.splice(serverIndex, 1);

	localStorage.setItem("past_servers", JSON.stringify(pastServers));

	return pastServers;
};

export const DeleteChannelFromServer = (channelName, serverId) => {
	const pastServers = JSON.parse(localStorage.getItem("past_servers"));

	for (let i = 0; i < pastServers.length; i++) {
		if (pastServers[i].id === serverId) {
			pastServers[i].channels = pastServers[i].channels.filter(
				(channel) => channel.toLowerCase() !== channelName.toLowerCase()
			);

			break;
		}
	}

	localStorage.setItem("past_servers", JSON.stringify(pastServers));

	return pastServers;
};

export const UpdatePastServerInfo = (id, newVal) => {
	let savedServers = JSON.parse(localStorage.getItem("past_servers"));

	for (let i = 0; i < savedServers.length; i++) {
		if (savedServers[i].id === id) {
			savedServers[i] = newVal;
			break;
		}
	}

	localStorage.setItem("past_servers", JSON.stringify(savedServers));
};
