import React, { useState } from "react";
import styled from "styled-components";
import IrcInputField from "../components/irc/IrcInputfield";
import IrcCurrentChannelChat from "../components/irc/IrcCurrentChannelChat";
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
	handleCreatePrvMsg,
	currentChannel,
}) => {
	const { serverName, serverMsgs, userChannels, nick } = state;

	const [currentTab, setCurrentTab] = useState(serverName);
	const [showUsers, setShowUsers] = useState(false);

	const handleJoinIrcChannel = (channelName) => {
		joinIrcChannel(channelName);
		setCurrentTab(channelName);
	};

	// const handleCreatePrvMsgTab = (target) => {
	// 	createPrvMsgTab(target);
	// 	setCurrentTab(target);
	// };

	return (
		<ChatViewWrapper>
			<ChannelHeader>
				<h2>{currentChannel}</h2>
				{currentChannel.toLowerCase() !== state.serverName.toLowerCase() && (
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
			<IrcInputField
				currentChannel={currentTab}
				sendMessageToChannel={sendMessageToChannel}
				joinIrcChannel={handleJoinIrcChannel}
				nick={nick}
				setUserAsAway={setUserAsAway}
				setUserAsBack={setUserAsBack}
				createPrvMsgTab={handleCreatePrvMsg}
			/>
		</ChatViewWrapper>
	);
};

export default IrcChatView;
