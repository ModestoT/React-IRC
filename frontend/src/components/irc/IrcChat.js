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
	position: relative;
	width: 100%;
	overflow: auto;
	word-break: break-word;
	padding: 1%;
	right: ${(props) => (props.showUsers ? "67%" : "0")};
	transition: right 0.5s;
	${(props) =>
		props.showUsers &&
		`
      background-color: rgba(0,0,0,.4);
      opacity: .5;
		`}
`;

const IrcChat = ({ channel, showUsers, windowWidthSize }) => {
	const { messages, userList } = channel;
	const divRef = useRef(null);

	useEffect(() => {
		divRef.current.scrollTop = divRef.current.scrollHeight;
	}, [messages]);

	return (
		<IrcChatWrapper showUsers={showUsers}>
			<IrcChatWindow ref={divRef} showUsers={showUsers}>
				{messages.map((msg, index) => {
					return <IrcChatMsg key={index} msg={msg} />;
				})}
			</IrcChatWindow>
			<IrcChatUsersList userList={userList} showUsers={showUsers} />
			{/* {windowWidthSize > 1024 ? (
				<IrcChatUsersList userList={userList} showUsers={showUsers} />
			) : (
				showUsers && <IrcChatUsersList userList={userList} showUsers={showUsers} />
			)} */}
		</IrcChatWrapper>
	);
};

export default IrcChat;
