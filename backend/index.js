const IRC = require("irc-framework");
const server = require("http").createServer();
const io = require("socket.io")(server);


io.on("connection", socket => {
  console.log("connection made to server socket!");
  const client = new IRC.Client();

  socket.on("connect to irc", (username, server) => {
    console.log("connecting to the irc client", username, server);
    
    client.connect({
      host: 'irc.rizon.net',
      port: 6667,
      nick: username,
      username: username,
      gecos: username
    });
    
    client.on('socket connected', () => {
      console.log("Socket connected Registering...");
    });

    client.on('connected', e => {
      console.log("Connected: \n", e);
      console.log("joining channel...");
      client.join("#horriblesubs");
    });

    client.on('debug', e => {
      console.log("debug: ", e);
    });

    client.on('join', e => {
      if(e.nick === client.options.nick){
        console.log("JOINED CHANNEL: ", e);
        socket.emit("irc connection", e);
      }
    });

    client.on('action', e => {
      console.log("action: ", e);
    });

    client.on('raw', e => {
      // console.log(e.line.replace('\n', ''));
      socket.emit("irc connection", e.line);
    });

    client.on('reconnecting', () => {
      console.log("reconnecting...");
    });

    client.on('socket close', () => {
      console.log("irc client disconected");
    });
  });
  
  socket.on("disconnect", reason => {
    console.log('disconection: ', reason);
    client.quit();
  });
});

server.listen(3001, () => {
  console.log("listening for request to port 3001")
});

// let client = new IRC.Client();

// client.connect({
//   host: 'irc.rizon.net',
//   port: 6667,
//   nick: username,
//   username: username,
//   gecos: username
// });

// client.on('socket connected', () => {
//   console.log("Socket connected Registering...");
// });

// client.on('connected', e => {
//   console.log("Connected: \n", e);
//   console.log("joining channel...");
//   client.join("#horriblesubs");
// });

// client.on('debug', e => {
//   console.log("debug: ", e);
// });

// client.on('join', e => {
//   if(e.nick === client.options.nick){
//     console.log("JOINED CHANNEL: ", e);
//     socket.emit("irc connection", e);
//   }
// });

// client.on('action', e => {
//   console.log("action: ", e);
// });

// // client.on('raw', e => {
// //   console.log(e.line.replace('\n', ''));
// // });

// client.on('reconnecting', () => {
//   console.log("reconnecting...");
// });

// client.on('socket close', () => {
//   console.log("Socket disconected");
// });

// client.on('close', () => {
//   console.log("client closed, failed to reconnect");
//   client.end();
// });

// let net = require("net");

// let client = net.connect({
//   host: 'irc.rizon.net',
//   port: '6667'
// });

// client.on('data', function(data) {
//   console.log(data.toString());
// });

// client.on('connect', e => {
//   console.log("connect:", e);
//   client.write('NICK username\r\nUSER username criten rizen :username\r\nJOIN #nibl\r\n');
// });


// client.on('error', err => {
//   console.log("error:", err);
//   client.end();
// })
// client.on('end', function() { 
//   console.log('disconnected from server');
// });


