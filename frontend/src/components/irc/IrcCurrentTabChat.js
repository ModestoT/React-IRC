import React from "react";

import IrcChat from "./IrcChat.js";

const IrcCurrentTabChat = ({ currentTab, serverName, serverMsgs, userChannels }) => {
	if (currentTab === serverName) {
		return <IrcChat channel={{ messages: serverMsgs, userList: [] }} />;
	} else {
		const channel = userChannels.find(
			({ channelName }) => channelName.toLowerCase() === currentTab.toLowerCase()
		);

		if (channel) {
			return <IrcChat channel={channel} />;
		} else {
			return <IrcChat channel={{ messages: [], userList: [] }} />;
		}
	}
};

export default IrcCurrentTabChat;
