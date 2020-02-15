import React from "react";

import { useIrc } from "./customHooks/ircHook/useIrc.js";
import IrcChatView from "./views/IrcChatView.js";
import IrcLoginView from "./views/IrcLoginView.js";

import "./App.css";
import PastConfigsList from "./components/PastConfigsList.js";

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
		<div className="App">
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
		</div>
	);
}

export default App;
