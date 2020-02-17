import React from "react";
import styled from "styled-components";

import { useIrc } from "./customHooks/ircHook/useIrc.js";
import IrcChatView from "./views/IrcChatView.js";
import IrcLoginView from "./views/IrcLoginView.js";

import PastConfigsList from "./components/PastConfigsList.js";

const AppWrapper = styled.div`
	font-size: 0.9rem;
	display: flex;
	height: 100vh;
`;

function App() {
	const {
		state,
		connectToIrc,
		disconnectFromIrc,
		joinIrcChannel,
		grabAvailableChannels,
		leaveIrcChannel,
		sendMessageToChannel,
		setUserAsAway,
		setUserAsBack,
		createPrvMsgTab,
		deleteConfig
	} = useIrc();
	return (
		<AppWrapper>
			<PastConfigsList
				connectToIrc={connectToIrc}
				currentServer={state.serverName}
				pastConfigs={state.pastConfigs}
				deleteConfig={deleteConfig}
			/>
			{state.isConnected ? (
				<IrcChatView
					state={state}
					joinIrcChannel={joinIrcChannel}
					leaveIrcChannel={leaveIrcChannel}
					grabAvailableChannels={grabAvailableChannels}
					disconnectFromIrc={disconnectFromIrc}
					sendMessageToChannel={sendMessageToChannel}
					setUserAsAway={setUserAsAway}
					setUserAsBack={setUserAsBack}
					createPrvMsgTab={createPrvMsgTab}
				/>
			) : (
				<IrcLoginView connectToIrc={connectToIrc} />
			)}
		</AppWrapper>
	);
}

export default App;
