import React from "react";
import styled from "styled-components";

const InputFieldWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 2% 0;

	#irc-port {
		width: 25%;
	}
`;

const LabelWrapper = styled.div`
	width: 46%;
`;

const InputWrapper = styled.div`
	width: 100%;

	input {
		max-width: 100%;
		margin: 5px;
		padding: 1% 3%;
	}
`;

const InputField = ({ id, labelText, type, value, onChange, checked }) => {
	return (
		<InputFieldWrapper>
			<LabelWrapper>
				<label htmlFor={id}>{labelText}</label>
			</LabelWrapper>
			<InputWrapper>
				<input id={id} type={type} value={value} onChange={onChange} checked={checked} />
			</InputWrapper>
		</InputFieldWrapper>
	);
};

export default InputField;
