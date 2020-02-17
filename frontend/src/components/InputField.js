import React from "react";
import styled from "styled-components";

const InputWrapper = styled.div`
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: flex-start;

	#irc-port {
		width: 25%;
	}
`;

const LabelWrapper = styled.div`
	width: 36%;
`;

const Input = styled.input`
	margin: 5px;
	max-width: 100%;
`;

const InputField = ({ id, labelText, type, value, onChange, checked }) => {
	return (
		<InputWrapper>
			<LabelWrapper>
				<label htmlFor={id}>{labelText}</label>
			</LabelWrapper>
			<div>
				<Input id={id} type={type} value={value} onChange={onChange} checked={checked} />
			</div>
		</InputWrapper>
	);
};

export default InputField;
