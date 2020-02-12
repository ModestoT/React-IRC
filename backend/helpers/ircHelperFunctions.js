const { strSortFn } = require("./helperFunctions.js");

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
		if (usersList[i].modes[0] === "q" && usersList[i].nick[0] !== "~") {
			formattedNicks[1] = [
				...formattedNicks[1],
				{ ...usersList[i], nick: `~${usersList[i].nick}` }
			];
		} else if (usersList[i].modes[0] === "a" && usersList[i].nick[0] !== "&") {
			formattedNicks[2] = [
				...formattedNicks[2],
				{ ...usersList[i], nick: `&${usersList[i].nick}` }
			];
		} else if (usersList[i].modes[0] === "o" && usersList[i].nick[0] !== "@") {
			formattedNicks[3] = [
				...formattedNicks[3],
				{ ...usersList[i], nick: `@${usersList[i].nick}` }
			];
		} else if (usersList[i].modes[0] === "h" && usersList[i].nick[0] !== "%") {
			formattedNicks[4] = [
				...formattedNicks[4],
				{ ...usersList[i], nick: `%${usersList[i].nick}` }
			];
		} else if (usersList[i].modes[0] === "v" && usersList[i].nick[0] !== "+") {
			formattedNicks[5] = [
				...formattedNicks[5],
				{ ...usersList[i], nick: `+${usersList[i].nick}` }
			];
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
const updateUsersList = (channel, socket) => {
	channel.updateUsers(channel => {
		//before sorting we need to update the nicks based on their mode so that chat
		//properly displays their role
		const newList = formattedNicks(channel.users);

		socket.emit("users list", {
			channelName: channel.name,
			users: newList
		});
	});
};

module.exports = {
	updateUsersList,
	formatNick
};
