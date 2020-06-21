import React from "react";

import IrcChat from "./IrcChat.js";

const IrcCurrentTabChat = ({
	currentTab,
	serverName,
	serverMsgs,
	userChannels,
	showUsers,
	currentChannel,
}) => {
	if (currentChannel === serverName) {
		return <IrcChat channel={{ messages: serverMsgs, userList: [] }} showUsers={showUsers} />;
	} else {
		const channel = userChannels.find(
			({ channelName }) => channelName.toLowerCase() === currentChannel.toLowerCase()
		);

		if (channel) {
			return <IrcChat channel={channel} showUsers={showUsers} />;
		} else {
			return <IrcChat channel={{ messages: [], userList: [] }} showUsers={showUsers} />;
		}
	}
};

export default IrcCurrentTabChat;
