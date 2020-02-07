import React from "react";
import styled from "styled-components";

const ChannelTab = styled.h2`
	cursor: pointer;
	border: 1px solid;
	background: ${props => props.isCurrentTab && "blue"};
`;

const IrcChatTab = ({ channelName, currentTab, setCurrentTab }) => {
	return (
		<ChannelTab
			isCurrentTab={currentTab === channelName}
			onClick={() => setCurrentTab(channelName)}
		>
			{channelName}
		</ChannelTab>
	);
};

export default IrcChatTab;
