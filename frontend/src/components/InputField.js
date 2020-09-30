import React from "react";
import styled from "styled-components";

const InputFieldWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;
	margin: 2% 0;
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
		background: ${(props) => props.theme.inputBg};
		color: ${(props) => props.theme.mainText};
		border: 1px solid ${(props) => props.theme.mainText};
		border-radius: 3px;

		&:focus {
			background: ${(props) => props.theme.mainBg};
		}
	}

	#irc-port {
		width: 25%;
	}
`;

const InputField = ({ id, labelText, type, value, onChange, checked }) => {
	return (
		<InputFieldWrapper id={`${id}-wrapper`}>
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
