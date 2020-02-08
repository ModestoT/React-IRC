import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import IrcChatMsg from "./IrcChatMsg";

const IrcChatWindow = styled.div`
	width: 80%;
	overflow: auto;
	word-break: break-word;
	margin: 1% auto;
	border: 1px solid;
	padding: 1%;
`;

const IrcChat = ({ channel }) => {
	const { messages, userList } = channel;
	const divRef = useRef(null);

	useEffect(() => {
		divRef.current.scrollTop = divRef.current.scrollHeight;
	}, [messages]);

	return (
		<div style={{ display: "flex", height: "87vh" }}>
			<IrcChatWindow ref={divRef}>
				{messages.map((msg, index) => {
					return <IrcChatMsg key={index} msg={msg} />;
				})}
			</IrcChatWindow>
			{userList.length > 0 && (
				<ul className="irc-chat-user-list" style={{ overflow: "auto" }}>
					{userList.map(user => {
						return <li key={user.nick}>{user.nick}</li>;
					})}
				</ul>
			)}
		</div>
	);
};

export default IrcChat;
