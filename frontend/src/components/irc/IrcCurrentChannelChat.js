import React from "react";

import IrcChat from "./IrcChat.js";

const IrcCurrentChannelChat = ({
	serverName,
	serverMsgs,
	userChannels,
	showUsers,
	currentChannel,
	windowWidthSize,
}) => {
	if (currentChannel === serverName) {
		return (
			<IrcChat
				channel={{ messages: serverMsgs, userList: [] }}
				showUsers={showUsers}
				windowWidthSize={windowWidthSize}
			/>
		);
	} else {
		const channel = userChannels.find(
			({ channelName }) => channelName.toLowerCase() === currentChannel.toLowerCase()
		);

		if (channel) {
			return <IrcChat channel={channel} showUsers={showUsers} windowWidthSize={windowWidthSize} />;
		} else {
			return (
				<IrcChat
					channel={{ messages: [], userList: [] }}
					showUsers={showUsers}
					windowWidthSize={windowWidthSize}
				/>
			);
		}
	}
};

export default IrcCurrentChannelChat;
