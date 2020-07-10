import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import IrcChatMsg from "./IrcChatMsg";
import IrcChatUsersList from "./IrcChatUsersList";

const IrcChatWrapper = styled.div`
	display: flex;
	height: 87%;
	border-top: 1px solid;
	border-bottom: 1px solid;

	@media (min-width: 1024px) {
		height: 89%;
	}
`;

const IrcChatWindow = styled.div`
	width: 100%;
	overflow: auto;
	word-break: break-word;
	padding: 1%;
`;

const IrcChat = ({ channel, showUsers, windowWidthSize }) => {
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
			{windowWidthSize > 1024 ? (
				<IrcChatUsersList userList={userList} />
			) : (
				showUsers && <IrcChatUsersList userList={userList} />
			)}
		</IrcChatWrapper>
	);
};

export default IrcChat;
