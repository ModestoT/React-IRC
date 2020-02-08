// function that removes the channel the quit/part message is being sent to
const formatQuitMessage = message => {
	if (message === "" || message[0] !== "#") return message;
	let cutOffPoint = 0;
	for (let i = 0; i < message.length; i++) {
		if (message[i] === " ") break;
		cutOffPoint++;
	}
	return message.slice(cutOffPoint);
};

const mergeSortMatrix = (matrix, sortFn) => {
	let tempArray = [];

	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			tempArray.push(matrix[i][j]);
		}
	}

	tempArray.sort(sortFn);

	return tempArray;
};
const sortMatrix = (matrix, sortFn) => {
	let tempArray = mergeSortMatrix(matrix, sortFn);

	let k = 0;
	for (let i = 0; i < matrix.length; i++) {
		for (let j = 0; j < matrix[i].length; j++) {
			matrix[i][j] = tempArray[k];
			k++;
		}
	}

	return matrix;
};

const strSortFn = (a, b) => {
	if (a.nick.toLowerCase() > b.nick.toLowerCase()) {
		return 1;
	}
	if (a.nick.toLowerCase() < b.nick.toLowerCase()) {
		return -1;
	}

	return 0;
};

const strBinarySearch = (arr, tar) => {
	let l = 0,
		r = arr.length - 1,
		maxLoops = 1000,
		loopCount = 0;

	while (l < r) {
		if (loopCount >= maxLoops)
			throw "Inifite loop detected in strBinarSearch function";

		let mid = Math.floor(l + (r - l) / 2);

		if (arr[mid].nick.toLowerCase() === tar) {
			return mid;
		} else if (arr[mid].nick.toLowerCase() < tar) {
			l = mid + 1;
		} else {
			r = mid;
		}
		loopCount++;
	}

	return -1;
};

const searchForUser = (arr, tar) => {
	//sort array so we can run a binary search for the user
	arr.sort(strSortFn);

	return strBinarySearch(arr, tar);
};

const findChannelLeft = (userChannels, tar) => {
	let channelsLeft = [];
	for (let i = 0; i < userChannels.length; i++) {
		let findUser = searchForUser(userChannels[i].users, tar);
		if (findUser !== -1) {
			channelsLeft.push(userChannels[i]);
		}
	}
	return channelsLeft;
};

module.exports = {
	formatQuitMessage,
	sortMatrix,
	findChannelLeft,
	strSortFn
};
