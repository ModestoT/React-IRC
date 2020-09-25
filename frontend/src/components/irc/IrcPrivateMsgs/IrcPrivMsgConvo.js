import React from "react";
import styled from "styled-components";

const PrivMsgWrapper = styled.div`
	display: flex;
	align-items: baseline;
	padding: 0 3%;
	margin-top: 5px;

	h4 {
		margin: 0;
	}

	p {
		margin: 0 0 0 15px;
		width: 72%;
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
