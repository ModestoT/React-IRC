import { FormatIntoMatrix } from "./GeneralHelpers.js";

export const CheckIfOverMessageLimit = (channel, limit) => {
	if (channel.messagesCount < limit) return channel;
	console.log(`Trimming ${channel.channelName}'s messages`);
	const msgs = channel.messages.slice(limit / 2);
	return {
		...channel,
		messages: msgs,
		messagesCount: msgs.length
	};
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

export const SearchChannelMatrix = (matrix, tar_channel, limit) => {
	let res = [];

	for (let i = 0; i < matrix.length; i++) {
		let searchRes = matrix[i].filter(({ channel }) => {
			return (
				FormatChannelName(channel)
					.toLowerCase()
					.indexOf(tar_channel.toLowerCase()) !== -1
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
