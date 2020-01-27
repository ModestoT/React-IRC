const server = require("http").createServer();
const io = require("socket.io")(server);
const createIrcClient = require("./ircClient.js");


io.on("connection", socket => {
  console.log("connection made to server socket!");
  const ircClient = createIrcClient(socket);

  // options param structure : 
  // {
  //   host: string, (ex: 'irc.freenode.net')
  //   port: int, (ex: 6697)
  //   nick: string,
  //   username: string,
  //   gecos: string, (irc realname)
  //   ssl: boolean (have secure connection or not)
  // }
  socket.on("connect to irc", options => {
    console.log("connecting to the irc client", options);
    
    ircClient.connect(options);
    // {
    //   host: 'irc.rizon.net',
    //   port: 6697,
    //   nick: username,
    //   username: username,
    //   gecos: username,
    //   ssl: true
    // }
  });
  
  socket.on("disconnect", reason => {
    console.log('disconection: ', reason);
    ircClient.quit();
  });
});

server.listen(3001, () => {
  console.log("listening for request to port 3001")
});

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


