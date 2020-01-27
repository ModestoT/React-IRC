import React, {useState, useEffect, useRef} from 'react';
import io from "socket.io-client";

import './App.css';

const socket = io.connect("http://localhost:3001");
function App() {
  const [data, setData] = useState([]);
  const divRef = useRef(null);

  useEffect(() => {
    const connectToServer = () => {
      socket.emit("connect to irc", "drol", null);
      socket.on("irc connection", newData => {
        console.log(typeof newData);
        if(typeof newData === 'string'){
          setData(d => [...d, newData]);
          divRef.current.scrollTop = divRef.current.scrollHeight;
        } else {
          console.log(newData)
        }
      });
    
      socket.on("disconnect", reason => {
        console.log(reason);
        socket.connect();
      });
    }
    connectToServer();
  },[]);
  
  return (
    <div className="App">
      <div className="irc-chat" style={{width:'50%', height:'300px', overflow:'auto', wordBreak:'break-word', margin:'5% auto', border:'1px solid', padding:'1%'}} ref={divRef}>
        {data.map(line => {
          return <p>{line}</p>
        })}
      </div>
    </div>
  );
}

export default App;