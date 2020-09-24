import React from "react";
import styled from "styled-components";

const PrivMsgWrapper = styled.div`
	display: flex;
	align-items: center;
	height: 12%;
	padding: 0 3%;

	p {
		margin-left: 15px;
	}
`;

const IrcPrivMsgConvo = ({ message }) => {
	const { msg, sentFrom } = message;
	return (
		<PrivMsgWrapper>
			<h4>{sentFrom}</h4>
			<p>{msg}</p>
		</PrivMsgWrapper>
	);
};

export default IrcPrivMsgConvo;
