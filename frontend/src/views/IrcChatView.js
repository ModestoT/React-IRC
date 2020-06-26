import React, { useState } from "react";

import Modal from "../components/Modal";
import IrcJoinableChannels from "../components/irc/IrcJoinableChannels";
import IrcChatTabs from "../components/irc/IrcChatTabs";
import IrcInputField from "../components/irc/IrcInputfield";
import IrcCurrentChannelChat from "../components/irc/IrcCurrentChannelChat";

const IrcChatView = ({
	state,
	joinIrcChannel,
	grabAvailableChannels,
	leaveIrcChannel,
	disconnectFromIrc,
	sendMessageToChannel,
	setUserAsAway,
	setUserAsBack,
	handleCreatePrvMsg,
	currentChannel,
}) => {
	const {
		serverName,
		serverMsgs,
		userChannels,
		joinableChannels,
		isGrabbingChannels,
		nick,
	} = state;

	// // const [isToggled, setIsToggled] = useState(false);
	const [currentTab, setCurrentTab] = useState(serverName);
	const [showUsers, setShowUsers] = useState(false);

	// const toggleModal = () => {
	// 	if (joinableChannels.pages === 0) {
	// 		grabAvailableChannels();
	// 	}

	// 	setIsToggled(!isToggled);
	// };

	const handleJoinIrcChannel = (channelName) => {
		joinIrcChannel(channelName);
		setCurrentTab(channelName);
	};

	// const handleCreatePrvMsgTab = (target) => {
	// 	createPrvMsgTab(target);
	// 	setCurrentTab(target);
	// };

	// const handleLeaveIrcChannel = (channel, isServerTab) => {
	// 	//leave channel selected
	// 	//check if channel selected is the current tab or not
	// 	//if it is the current tab change it to the tab to the left of the channel exited
	// 	//else dont change the current tab
	// 	if (isServerTab) {
	// 		disconnectFromIrc();
	// 	} else {
	// 		leaveIrcChannel(channel);
	// 		if (channel === currentTab) {
	// 			const channelExitedIndex = userChannels.findIndex(
	// 				({ channelName }) => channelName === channel
	// 			);

	// 			if (channelExitedIndex > 0) {
	// 				setCurrentTab(userChannels[channelExitedIndex - 1].channelName);
	// 			} else {
	// 				setCurrentTab(serverName);
	// 			}
	// 		}
	// 	}
	// };

	return (
		<div>
			<h2>{currentChannel}</h2>
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
			{/* <Modal showModal={isToggled} toggleModal={setIsToggled}>
				<IrcJoinableChannels
					joinableChannels={joinableChannels}
					joinIrcChannel={handleJoinIrcChannel}
					isGrabbingChannels={isGrabbingChannels}
				/>
			</Modal> */}
		</div>
	);
};

export default IrcChatView;
