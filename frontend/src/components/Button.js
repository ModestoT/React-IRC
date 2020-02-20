import React from "react";
import styled from "styled-components";

const Btn = styled.button`
	border: none;
	padding: 2% 5%;
	margin: 4%;
	font-weight: bold;
	border-radius: 3px;
	background: ${props => props.theme.btnBg};
	color: ${props => props.theme.btnText};
`;

const Button = ({ onClick, btnText }) => {
	return <Btn onClick={onClick}>{btnText}</Btn>;
};

export default Button;
