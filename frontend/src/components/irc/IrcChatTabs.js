import React from "react";
import styled from "styled-components";

import IrcChatTab from "./IrcChatTab";

const TabsWrapper = styled.div`
	display: flex;
	justify-content: space-evenly;
	align-items: center;
`;

const IrcChatTabs = ({
	tabs,
	currentTab,
	setCurrentTab,
	toggleModal,
	leaveIrcChannel
}) => {
	return (
		<TabsWrapper>
			{tabs.map(({ channelName, isServerTab }) => {
				return (
					<IrcChatTab
						key={channelName}
						channelName={channelName}
						currentTab={currentTab}
						setCurrentTab={setCurrentTab}
						leaveIrcChannel={leaveIrcChannel}
						isServerTab={isServerTab}
					/>
				);
			})}
			<button className="join-channel" onClick={() => toggleModal()}>
				+
			</button>
		</TabsWrapper>
	);
};

export default IrcChatTabs;
