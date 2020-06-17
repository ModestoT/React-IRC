import React from "react";

import IrcChat from "./IrcChat.js";

const IrcCurrentTabChat = ({ currentTab, serverName, serverMsgs, userChannels, showUsers }) => {
	if (currentTab === serverName) {
		return <IrcChat channel={{ messages: serverMsgs, userList: [] }} showUsers={showUsers} />;
	} else {
		const channel = userChannels.find(
			({ channelName }) => channelName.toLowerCase() === currentTab.toLowerCase()
		);

		if (channel) {
			return <IrcChat channel={channel} showUsers={showUsers} />;
		} else {
			return <IrcChat channel={{ messages: [], userList: [] }} showUsers={showUsers} />;
		}
	}
};

export default IrcCurrentTabChat;
