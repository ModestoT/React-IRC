import React from "react";
import styled from "styled-components";

const TabWrapper = styled.div`
	cursor: pointer;
	display: flex;
	border: 1.5px solid;
	border-top-left-radius: 5px;
	border-top-right-radius: 5px;
	color: ${(props) => (props.isCurrentTab ? props.theme.btnText : props.theme.mainText)};
	border-color: ${(props) => props.theme.mainText};
	background: ${(props) => props.isCurrentTab && props.theme.btnBg};
`;

const ChannelTab = styled.h2`
	width: 60px;
	text-transform: capitalize;
	margin: 1% 0;
	overflow: hidden;
	text-overflow: ellipsis;
`;

const CloseTabBtn = styled.button`
	border: none;
	background: inherit;
`;

const IrcChatTab = ({ channelName, currentTab, setCurrentTab, leaveIrcChannel, isServerTab }) => {
	return (
		<TabWrapper isCurrentTab={currentTab.toLowerCase() === channelName.toLowerCase()}>
			<ChannelTab onClick={() => setCurrentTab(channelName)}>{channelName}</ChannelTab>
			<CloseTabBtn onClick={() => leaveIrcChannel(channelName, isServerTab)}>X</CloseTabBtn>
		</TabWrapper>
	);
};

export default IrcChatTab;
