import React from "react";

import { useIrc } from "./customHooks/ircHook/useIrc.js";
import IrcChatView from "./views/IrcChatView.js";
import IrcLoginView from "./views/IrcLoginView.js";

import "./App.css";

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
		createPrvMsgTab
	} = useIrc();
	return (
		<div className="App">
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
