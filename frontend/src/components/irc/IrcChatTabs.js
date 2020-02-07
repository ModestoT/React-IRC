import React from "react";
import IrcChatTab from "./IrcChatTab";

const IrcChatTabs = ({ tabs, currentTab, setCurrentTab }) => {
	return (
		<div className="tabs-wrapper">
			{tabs.map(({ channelName }) => {
				return (
					<IrcChatTab
						channelName={channelName}
						currentTab={currentTab}
						setCurrentTab={setCurrentTab}
					/>
				);
			})}
		</div>
	);
};

export default IrcChatTabs;
