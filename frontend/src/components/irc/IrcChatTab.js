import React from "react";
import styled from "styled-components";

const TabWrapper = styled.div`
	display: flex;
`;

const ChannelTab = styled.h2`
	cursor: pointer;
	border: 1px solid;
	background: ${props => props.isCurrentTab && "blue"};
	text-transform: capitalize;
	margin: 1% 0;
	color: ${props => (props.isCurrentTab ? "white" : "black")};
`;

const IrcChatTab = ({
	channelName,
	currentTab,
	setCurrentTab,
	leaveIrcChannel,
	isServerTab
}) => {
	return (
		<TabWrapper>
			<ChannelTab
				isCurrentTab={currentTab === channelName}
				onClick={() => setCurrentTab(channelName)}
			>
				{channelName}
			</ChannelTab>
			<button
				className="leave-channel-btn"
				onClick={() => leaveIrcChannel(channelName, isServerTab)}
			>
				X
			</button>
		</TabWrapper>
	);
};

export default IrcChatTab;
