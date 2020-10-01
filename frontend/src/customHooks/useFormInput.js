import { useState } from "react";

export const useFormInput = (initalValue) => {
	const [value, setValue] = useState(initalValue);

	const handleInput = (updatedValue) => {
		if (typeof initalValue === "object") {
			setValue((val) => ({
				...val,
				...updatedValue,
			}));
		} else {
			setValue(updatedValue);
		}
	};

	return [value, handleInput];
};
