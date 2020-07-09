import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import IrcChatMsg from "./IrcChatMsg";
import IrcChatUsersList from "./IrcChatUsersList";

const IrcChatWrapper = styled.div`
	display: flex;
	height: 80vh;
`;

const IrcChatWindow = styled.div`
	overflow: auto;
	word-break: break-word;
	margin: 1% auto;
	border-top: 1px solid;
	border-bottom: 1px solid;
	padding: 1%;
`;

const IrcChat = ({ channel, showUsers }) => {
	const { messages, userList } = channel;
	const divRef = useRef(null);

	useEffect(() => {
		divRef.current.scrollTop = divRef.current.scrollHeight;
	}, [messages]);

	return (
		<IrcChatWrapper>
			<IrcChatWindow ref={divRef}>
				{messages.map((msg, index) => {
					return <IrcChatMsg key={index} msg={msg} />;
				})}
			</IrcChatWindow>
			{showUsers && <IrcChatUsersList userList={userList} />}
		</IrcChatWrapper>
	);
};

export default IrcChat;
