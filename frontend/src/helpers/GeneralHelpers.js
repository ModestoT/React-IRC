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
