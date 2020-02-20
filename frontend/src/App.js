import React from "react";
import styled, { ThemeProvider } from "styled-components";

import { useIrc } from "./customHooks/ircHook/useIrc.js";
import IrcChatView from "./views/IrcChatView.js";
import IrcLoginView from "./views/IrcLoginView.js";
import HeaderAndSideMenuView from "./views/HeaderAndSideMenuView.js";

const theme = {
	mainBg: "#2B2B28",
	mainText: "#D7DADC",
	secondaryBg: "#2A282B",
	btnBg: "#B8B8AB",
	btnText: "#33332F",
	inputBg: "#383834"
};

const AppWrapper = styled.div`
	font-size: 0.9rem;
	display: flex;
	flex-direction: column;
	height: 100vh;
	color: ${props => props.theme.mainText};
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
		<ThemeProvider theme={theme}>
			<AppWrapper>
				<HeaderAndSideMenuView
					connectToIrc={connectToIrc}
					currentServer={state.serverName}
					pastConfigs={state.pastConfigs}
					deleteConfig={deleteConfig}
				>
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
				</HeaderAndSideMenuView>
			</AppWrapper>
		</ThemeProvider>
	);
}

export default App;
