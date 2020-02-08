import React, { useState } from "react";

import Modal from "../components/Modal";
import IrcJoinableChannels from "../components/irc/IrcJoinableChannels";
import IrcChatTabs from "../components/irc/IrcChatTabs";
import IrcChat from "../components/irc/IrcChat";

const IrcChatView = ({
	state,
	joinIrcChannel,
	grabAvailableChannels,
	leaveIrcChannel,
	disconnectFromIrc
}) => {
	const {
		serverName,
		serverMsgs,
		userChannels,
		joinableChannels,
		isGrabbingChannels
	} = state;
	const [isToggled, setIsToggled] = useState(false);
	const [currentTab, setCurrentTab] = useState(serverName);

	const toggleModal = () => {
		if (joinableChannels.pages === 0) {
			grabAvailableChannels();
		}

		setIsToggled(!isToggled);
	};
	const getCurrentTabChat = () => {
		if (currentTab === serverName) {
			return <IrcChat channel={{ messages: serverMsgs, userList: [] }} />;
		} else {
			const channel = userChannels.find(
				({ channelName }) => channelName === currentTab
			);

			if (channel) {
				return <IrcChat channel={channel} />;
			} else {
				return <IrcChat channel={{ messages: [], userList: [] }} />;
			}
		}
	};
	const handleJoinIrcChannel = channelName => {
		console.log("joining: ", channelName);
		joinIrcChannel(channelName);
		setCurrentTab(channelName);
	};
	const handleLeaveIrcChannel = (channel, isServerTab) => {
		if (isServerTab) {
			disconnectFromIrc();
		} else {
			//leave channel selected
			leaveIrcChannel(channel);
			//check if channel selected is the current tab or not
			if (channel === currentTab) {
				//if it is the current tab change it to the tab to the left of the channel exited
				const channelExitedIndex = userChannels.findIndex(
					({ channelName }) => channelName === channel
				);
				console.log(channelExitedIndex, userChannels[channelExitedIndex - 1]);

				if (channelExitedIndex !== -1 && channelExitedIndex !== 0) {
					setCurrentTab(userChannels[channelExitedIndex - 1].channelName);
				} else {
					console.log(serverName);
					setCurrentTab("rizon");
					console.log("updated current tab");
				}
			}
			//else dont change the current tab
		}
	};
	return (
		<div>
			<IrcChatTabs
				tabs={[{ channelName: serverName, isServerTab: true }, ...userChannels]}
				serverName={serverName}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
				toggleModal={toggleModal}
				leaveIrcChannel={handleLeaveIrcChannel}
			/>
			{getCurrentTabChat()}
			<Modal showModal={isToggled} toggleModal={setIsToggled}>
				<IrcJoinableChannels
					joinableChannels={joinableChannels}
					joinIrcChannel={handleJoinIrcChannel}
					isGrabbingChannels={isGrabbingChannels}
				/>
			</Modal>
		</div>
	);
};

export default IrcChatView;
