import React, { useEffect, useRef } from "react";
import styled from "styled-components";

import IrcChatMsg from "./IrcChatMsg";
import IrcChatUsersList from "./IrcChatUsersList";
import Button from "../Button";

const IrcChatWindow = styled.div`
	width: 80%;
	overflow: auto;
	word-break: break-word;
	margin: 1% auto;
	border: 1px solid;
	padding: 1%;
`;

const IrcChat = ({ channel, showUsers, setShowUsers }) => {
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
			<div className="usersList">
				<Button onClick={() => setShowUsers(!showUsers)} btnText="Users" />
				{showUsers && <IrcChatUsersList userList={userList} />}
			</div>
		</div>
	);
};

export default IrcChat;
