import React, {useState,useEffect,useRef} from "react";
import io from "socket.io-client";


const IrcChatView = ({ ircOptions }) => {
  const [data, setData] = useState([]);
  const divRef = useRef(null);
  
  useEffect(() => {
    const connectToServer = () => {
      const socket = io.connect("http://localhost:3001");
      console.log("connecting to irc client")
      socket.emit("connect to irc", {
        ...ircOptions,
        username: ircOptions.nick,
        gecos: ircOptions.nick,
        port: Number(ircOptions.port)
      });
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
  },[ircOptions]);

  return(
    <div className="irc-chat" style={{width:'50%', height:'300px', overflow:'auto', wordBreak:'break-word', margin:'5% auto', border:'1px solid', padding:'1%'}} ref={divRef}>
      {data.map(line => {
        return <p>{line}</p>
      })}
    </div>
  );
};


export default IrcChatView;