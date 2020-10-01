import React, { useState } from "react";
import styled from "styled-components";

import InputFieldWrapper from "../components/InputFieldWrapper.js";
import IrcCurrentChannelChat from "../components/irc/IrcChannel/IrcCurrentChannelChat.js";
import Button from "../components/Button.js";

const ChatViewWrapper = styled.div`
	height: 100%;
`;

const ChannelHeader = styled.header`
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 8%;

	@media (min-width: 1024px) {
		height: 6%;
	}

	h2 {
		margin-left: 15px;
		font-size: 2rem;
	}
`;

const IrcChatView = ({
	state,
	joinIrcChannel,
	sendMessageToChannel,
	setUserAsAway,
	setUserAsBack,
	sendPrivMsg,
	currentChannel,
	windowWidthSize,
	updateReadMessages,
	setCurrentChannel,
}) => {
	const {
		serverName,
		serverMsgs,
		userChannels,
		nick,
		away,
		privateMsgs,
		totalUnreadMessages,
	} = state;

	// const [currentTab, setCurrentTab] = useState(serverName);
	const [showUsers, setShowUsers] = useState(false);

	const handleJoinIrcChannel = (channelName) => {
		joinIrcChannel(channelName);
		setCurrentChannel(channelName);
	};

	return (
		<ChatViewWrapper>
			<ChannelHeader>
				<h2>{currentChannel}</h2>
				{currentChannel.toLowerCase() !== state.serverName.toLowerCase() &&
					windowWidthSize < 1024 && (
						<Button onClick={() => setShowUsers(!showUsers)} btnText="Users" />
					)}
			</ChannelHeader>
			<IrcCurrentChannelChat
				serverName={serverName}
				serverMsgs={serverMsgs}
				userChannels={userChannels}
				showUsers={showUsers}
				currentChannel={currentChannel}
			/>
			<InputFieldWrapper
				currentChannel={currentChannel}
				sendMessageToChannel={sendMessageToChannel}
				joinIrcChannel={handleJoinIrcChannel}
				nick={nick}
				away={away}
				setUserAsAway={setUserAsAway}
				setUserAsBack={setUserAsBack}
				sendPrivMsg={sendPrivMsg}
				privateMsgs={privateMsgs}
				totalUnreadMessages={totalUnreadMessages}
				updateReadMessages={updateReadMessages}
			/>
		</ChatViewWrapper>
	);
};

export default IrcChatView;
