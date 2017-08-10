import Socket = NodeJS.Socket;
let app = require('express')();
let http = require('http').Server(app);
let io = require('socket.io')(http);

app.get('/', function(req: Request, res: any){
  res.sendfile('chat.component.html');
});
io.on('connection', function(socket: Socket){
  console.log('user connected');
  socket.on('chat message', function(msg: any){
    io.emit('chat message', msg);
  });
  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});
