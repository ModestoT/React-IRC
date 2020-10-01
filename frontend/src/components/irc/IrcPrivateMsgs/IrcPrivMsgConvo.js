import React from "react";
import styled from "styled-components";

const PrivMsgWrapper = styled.div`
	padding: 0 3%;
	margin-top: 5px;

	h4 {
		margin: 0;
		font-size: 1rem;
		text-overflow: ellipsis;
	}

	p {
		margin: 3px 0 0 0;
	}

	@media (min-width: 1024px) {
		margin-top: 10px;
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
