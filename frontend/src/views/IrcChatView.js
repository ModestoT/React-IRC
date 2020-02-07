import React, { useState } from "react";

import Modal from "../components/Modal";
import IrcJoinableChannels from "../components/irc/IrcJoinableChannels";
import IrcChatTabs from "../components/irc/IrcChatTabs";
import IrcChat from "../components/irc/IrcChat";

const IrcChatView = ({
	state,
	joinIrcChannel,
	grabAvailableChannels,
	searchForChannel,
	resetSearchResArray
}) => {
	const {
		serverName,
		serverMsgs,
		userChannels,
		joinableChannels,
		isGrabbingChannels,
		searchRes
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
			return <IrcChat chatMsgs={serverMsgs} />;
		} else {
			const chat = userChannels.find(
				({ channelName }) => channelName === currentTab
			);

			if (chat) {
				return <IrcChat chatMsgs={chat.messages} />;
			} else {
				return <IrcChat chatMsgs={[]} />;
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
			/>
			{getCurrentTabChat()}
			<button className="join-channel" onClick={() => toggleModal()}>
				+
			</button>
			<Modal showModal={isToggled} toggleModal={setIsToggled}>
				<IrcJoinableChannels
					joinableChannels={joinableChannels}
					joinIrcChannel={handleJoinIrcChannel}
					isGrabbingChannels={isGrabbingChannels}
					searchRes={searchRes}
					searchForChannel={searchForChannel}
					resetSearchResArray={resetSearchResArray}
				/>
			</Modal>
		</div>
	);
};

export default IrcChatView;
