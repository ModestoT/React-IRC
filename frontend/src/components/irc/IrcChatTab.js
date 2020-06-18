import React from "react";
import styled from "styled-components";

const TabWrapper = styled.div`
	cursor: pointer;
	display: flex;
	border: 1.5px solid;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	color: ${(props) => (props.isCurrentTab ? props.theme.mainText : props.theme.btnText)};
	border-color: ${(props) => props.theme.btnBg};
	background: ${(props) => !props.isCurrentTab && props.theme.btnBg};
`;

const ChannelTab = styled.h2`
	width: ${(props) => (props.isCurrentTab ? "inherit" : `${props.currentTabWidth}px`)};
	text-transform: capitalize;
	margin: 1% 0;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const CloseTabBtn = styled.button`
	border: none;
	background: inherit;
`;

const IrcChatTab = ({
	channelName,
	currentTab,
	setCurrentTab,
	leaveIrcChannel,
	isServerTab,
	currentTabWidth,
}) => {
	return (
		<TabWrapper isCurrentTab={currentTab.toLowerCase() === channelName.toLowerCase()}>
			<ChannelTab
				currentTabWidth={currentTabWidth}
				isCurrentTab={currentTab.toLowerCase() === channelName.toLowerCase()}
				onClick={() => setCurrentTab(channelName)}
			>
				{channelName}
			</ChannelTab>
			<CloseTabBtn onClick={() => leaveIrcChannel(channelName, isServerTab)}>X</CloseTabBtn>
		</TabWrapper>
	);
};

export default IrcChatTab;
