import React, { useState, useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";

import { useIrc } from "./customHooks/ircHook/useIrc.js";
import { GrabServerName } from "./helpers/IrcHelpers.js";
import IrcChatView from "./views/IrcChatView.js";
import IrcLoginView from "./views/IrcLoginView.js";
import HeaderAndSideMenu from "./components/HeaderAndSideMenu.js";

const darkTheme = {
	mainBg: "#2B2B28",
	mainText: "#D7DADC",
	secondaryBg: "#2A282B",
	tertiaryBg: "#33332F",
	btnBg: "#B8B8AB",
	btnText: "#33332F",
	inputBg: "#383834",
};

const AppWrapper = styled.div`
	font-size: 0.9rem;
	display: flex;
	flex-direction: column;
	height: 100vh;
	color: ${(props) => props.theme.mainText};
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
		sendPrivMsg,
		deleteServer,
		deleteChannelFromPastServers,
		updateReadMessages,
	} = useIrc();

	const [windowWidthSize, setwindowWidthSize] = useState(window.innerWidth);
	const [currentChannel, setCurrentChannel] = useState(state.serverName);

	useEffect(() => {
		const updateWidth = () => {
			setwindowWidthSize(window.innerWidth);
		};
		window.addEventListener("resize", updateWidth);

		return () => window.removeEventListener("resize", updateWidth);
	}, []);

	const connectToIrcServer = (e, ircOptions, savedServer) => {
		connectToIrc(e, ircOptions, savedServer);
		setCurrentChannel(GrabServerName(ircOptions.host));
	};
	return (
		<ThemeProvider theme={darkTheme}>
			<AppWrapper>
				<HeaderAndSideMenu
					connectToIrc={connectToIrcServer}
					state={state}
					deleteServer={deleteServer}
					deleteChannelFromPastServers={deleteChannelFromPastServers}
					windowWidthSize={windowWidthSize}
					currentChannel={currentChannel}
					setCurrentChannel={setCurrentChannel}
					disconnectFromIrc={disconnectFromIrc}
					grabAvailableChannels={grabAvailableChannels}
					joinIrcChannel={joinIrcChannel}
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
							sendPrivMsg={sendPrivMsg}
							updateReadMessages={updateReadMessages}
							windowWidthSize={windowWidthSize}
							currentChannel={currentChannel}
						/>
					) : (
						<IrcLoginView connectToIrc={connectToIrcServer} />
					)}
				</HeaderAndSideMenu>
			</AppWrapper>
		</ThemeProvider>
	);
}

export default App;
