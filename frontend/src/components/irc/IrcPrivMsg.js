import React from "react";
import styled from "styled-components";

const PrivMsgWrapper = styled.div`
	display: flex;
	align-items: center;
`;

const IrcPrivMsg = ({ recievedMsg }) => {
	const { user, messages } = recievedMsg;
	return (
		<PrivMsgWrapper>
			<h4>{user}</h4>
			<p>{messages[messages.length - 1]}</p>
		</PrivMsgWrapper>
	);
};

export default IrcPrivMsg;
