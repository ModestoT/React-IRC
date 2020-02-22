import React from "react";
import styled from "styled-components";

const Btn = styled.button`
	cursor: pointer;
	border: none;
	padding: 8px 18px;
	margin: 15px;
	font-weight: bold;
	border-radius: 3px;
	background: ${props => props.theme.btnBg};
	color: ${props => props.theme.btnText};

	&:hover {
		background: #808075;
		color: #bfbfb0;
	}
`;

const Button = ({ onClick, btnText }) => {
	return <Btn onClick={onClick}>{btnText}</Btn>;
};

export default Button;
