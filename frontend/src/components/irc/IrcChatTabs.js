import React from "react";
import styled from "styled-components";

import IrcChatTab from "./IrcChatTab";
import Button from "../Button.js";

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
	leaveIrcChannel,
	showUsers,
	setShowUsers,
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
			<Button onClick={() => toggleModal()} btnText="+" />
			<Button onClick={() => setShowUsers(!showUsers)} btnText="Users" />
		</TabsWrapper>
	);
};

export default IrcChatTabs;
