import React from "react";

import { useIrc } from "./customHooks/ircHook/useIrc.js";
import IrcChatView from "./views/IrcChatView.js";
import IrcLoginView from "./views/IrcLoginView.js";

import "./App.css";

function App() {
  const { state, connectToIrc } = useIrc();
  return (
    <div className="App">
      {state.isConnected ? 
        <IrcChatView state={state}/> 
      : <IrcLoginView connectToIrc={connectToIrc}/>
      }
    </div>
  );
}

export default App;