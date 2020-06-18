import React, { useState, useEffect } from "react";
import styled from "styled-components";

import IrcChatTab from "./IrcChatTab";
import Button from "../Button.js";

const TabsWrapper = styled.div`
	display: flex;
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
	const [currentTabWidth, setCurrentTabWidth] = useState(60);
	const [windowWidthSize, setwindowWidthSize] = useState(window.innerWidth);

	//Current plan for tabs:
	//Based on the current window size and the amount of tabs the user has open,
	//it should adjust the width of the tabs so that everything is able to fit
	//with the available screen realestate
	useEffect(() => {
		const updateWidth = () => {
			setwindowWidthSize(window.innerWidth);
		};
		const adjustTabSize = () => {
			//threshold is to achieve the size adjustment at around 3 tabs at a screensize of 414px
			const threshold = Math.floor(windowWidthSize * 0.008);

			//if tabs length is greater than our threshold we need to adjust the tab's width
			if (tabs.length > threshold) {
				let newWidth = Math.floor(currentTabWidth * 0.3);
				console.log(newWidth);
				if (newWidth > 10) {
					setCurrentTabWidth(newWidth);
				}
			}

			if (tabs.length - 1 < threshold && currentTabWidth !== 60) {
				setCurrentTabWidth(60);
			}
		};

		window.addEventListener("resize", updateWidth);
		adjustTabSize();

		return () => window.removeEventListener("resize", updateWidth);
	}, [tabs.length, windowWidthSize, currentTabWidth]);

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
						currentTabWidth={currentTabWidth}
					/>
				);
			})}
			<Button onClick={() => toggleModal()} btnText="+" />
			<Button onClick={() => setShowUsers(!showUsers)} btnText="Users" />
		</TabsWrapper>
	);
};

export default IrcChatTabs;
