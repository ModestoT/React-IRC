import React from 'react';

import { useFormInput } from "./customHooks/useFormInput.js";
import IrcChatView from './views/IrcChatView.js';
import './App.css';
import IrcLoginView from './views/IrcLoginView.js';

function App() {
  const [ircOptions, handleInput] = useFormInput({
    host: '',
    port: 6667,
    nick: '',
    ssl: false
  });
  return (
    <div className="App">
      <IrcLoginView ircOptions={ircOptions} handleInput={handleInput}/>
      {/* <IrcChatView ircOptions={ircOptions}/> */}
    </div>
  );
}

export default App;