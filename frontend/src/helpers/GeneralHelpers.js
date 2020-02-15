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

export const AddConfigToStorage = config => {
	const pastConfigs = JSON.parse(localStorage.getItem("past_configs"));
	if (pastConfigs && pastConfigs.length > 0) {
		console.log("running save config");
		pastConfigs.push({ id: pastConfigs[pastConfigs.length - 1].id + 1, ...config, channels: [] });
		localStorage.setItem("past_configs", JSON.stringify(pastConfigs));
	} else {
		localStorage.setItem("past_configs", JSON.stringify([{ id: 1, ...config, channels: [] }]));
	}
};

export const AddChannelToPastConfigs = (channel, serverName) => {
	const pastConfigs = JSON.parse(localStorage.getItem("past_configs"));

	console.log("running save channel");
	for (let i = 0; i < pastConfigs.length; i++) {
		if (
			pastConfigs[i].saveConfig &&
			GrabServerName(pastConfigs[i].host.toLowerCase()) === serverName.toLowerCase()
		) {
			pastConfigs[i] = {
				...pastConfigs[i],
				channels: UpdatePastConfigsChannels(pastConfigs[i].channels, channel)
			};
			localStorage.setItem("past_configs", JSON.stringify(pastConfigs));
			break;
		}
	}
};

const UpdatePastConfigsChannels = (channels, newChannel) => {
	for (let i = 0; i < channels.length; i++) {
		if (channels[i].toLowerCase() === newChannel.toLowerCase()) {
			return channels;
		}
	}
	channels.push(newChannel);

	return channels;
};
