import React from "react";
import styled from "styled-components";

const Btn = styled.button`
	cursor: pointer;
	border: none;
	padding: ${(props) => `${props.padding[0]}px ${props.padding[1]}px`};
	margin: ${(props) => props.margin}px;
	font-weight: bold;
	border-radius: 3px;
	background: ${(props) => props.theme.btnBg};
	color: ${(props) => props.theme.btnText};

	&:hover {
		background: #808075;
		color: white;
	}
`;

const Button = ({ onClick, btnText, margin = 15, padding = [8, 18] }) => {
	return (
		<Btn margin={margin} padding={padding} onClick={onClick}>
			{btnText}
		</Btn>
	);
};

export default Button;
