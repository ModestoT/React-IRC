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

const getErrMsg = (msg, s_index) => {
	let cutOffPoint = s_index;
	for (let i = cutOffPoint; i < msg.length; i++) {
		if (msg[i] === ":") break;
		cutOffPoint++;
	}

	return msg.slice(cutOffPoint + 1);
};

module.exports = {
	strSortFn,
	formatQuitMessage,
	sortMatrix,
	getErrMsg
};
