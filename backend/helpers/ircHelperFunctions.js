const { strSortFn } = require("./helperFunctions.js");

const baseNick = nick => {
	if (/[~]|[&]|[@]|[%]|[+]/g.test(nick)) {
		return nick.slice(1);
	} else {
		return nick;
	}
};

const formatNick = (nick, modes) => {
	if (modes[0] === "q" && nick[0] !== "~") {
		return `~${nick}`;
	} else if (modes[0] === "a" && nick[0] !== "&") {
		return `&${nick}`;
	} else if (modes[0] === "o" && nick[0] !== "@") {
		return `@${nick}`;
	} else if (modes[0] === "h" && nick[0] !== "%") {
		return `%${nick}`;
	} else if (modes[0] === "v" && nick[0] !== "+") {
		return `+${nick}`;
	} else {
		return nick;
	}
};

const formattedNicks = usersList => {
	//storing the nicks with modes sorted based on their rank
	let formattedNicks = {
		1: [],
		2: [],
		3: [],
		4: [],
		5: []
	};
	const tempArr = [];
	//loop through the user list adding the users with modes to the appropriate key in the formattedNicks obj and remove it from the original array
	for (let i = 0; i < usersList.length; i++) {
		let { nick, channel_modes } = usersList[i];
		if (channel_modes[0] === "q" && nick[0] !== "~") {
			formattedNicks[1] = [...formattedNicks[1], { ...usersList[i], nick: `~${nick}` }];
		} else if (channel_modes[0] === "a" && nick[0] !== "&") {
			formattedNicks[2] = [...formattedNicks[2], { ...usersList[i], nick: `&${nick}` }];
		} else if (channel_modes[0] === "o" && nick[0] !== "@") {
			formattedNicks[3] = [...formattedNicks[3], { ...usersList[i], nick: `@${nick}` }];
		} else if (channel_modes[0] === "h" && nick[0] !== "%") {
			formattedNicks[4] = [...formattedNicks[4], { ...usersList[i], nick: `%${nick}` }];
		} else if (channel_modes[0] === "v" && nick[0] !== "+") {
			formattedNicks[5] = [...formattedNicks[5], { ...usersList[i], nick: `+${nick}` }];
		} else {
			tempArr.push(usersList[i]);
		}
	}

	//after storing the users with modes add them to the front of the array
	let res = [];

	for (let key in formattedNicks) {
		res = [...res, ...formattedNicks[key].sort(strSortFn)];
	}

	return res.concat(tempArr.sort(strSortFn));
};

module.exports = {
	formatNick,
	formattedNicks,
	baseNick
};
