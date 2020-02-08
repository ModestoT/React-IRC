import React, { useState } from "react";

import Modal from "../components/Modal";
import IrcJoinableChannels from "../components/irc/IrcJoinableChannels";
import IrcChatTabs from "../components/irc/IrcChatTabs";
import IrcChat from "../components/irc/IrcChat";

const IrcChatView = ({ state, joinIrcChannel, grabAvailableChannels }) => {
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
		joinIrcChannel(channelName);
		setCurrentTab(channelName);
	};
	return (
		<div>
			<IrcChatTabs
				tabs={[{ channelName: serverName }, ...userChannels]}
				serverName={serverName}
				currentTab={currentTab}
				setCurrentTab={setCurrentTab}
				toggleModal={toggleModal}
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
