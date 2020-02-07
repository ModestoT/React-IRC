import React, { useEffect, useRef } from "react";
import IrcChatMsg from "./IrcChatMsg";

const IrcChat = ({ chatMsgs }) => {
	const divRef = useRef(null);

	useEffect(() => {
		divRef.current.scrollTop = divRef.current.scrollHeight;
	}, [chatMsgs]);

	return (
		<div
			className="irc-chat"
			style={{
				width: "50%",
				height: "300px",
				overflow: "auto",
				wordBreak: "break-word",
				margin: "5% auto",
				border: "1px solid",
				padding: "1%"
			}}
			ref={divRef}
		>
			{chatMsgs.map((msg, index) => {
				return <IrcChatMsg key={index} msg={msg} />;
			})}
		</div>
	);
};

export default IrcChat;
