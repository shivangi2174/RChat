//Node Server which will handle socket IO connections

//const io = require('socket.io')(8000)

// const io = require("socket.io")(httpServer, {
//     cors: {
//       origin: "http://localhost:8000",
//       methods: ["GET", "POST"]
//     }
//   });
  
// httpServer.listen(3000);

//var server = app.listen(8000);
var io = require('socket.io')(8000, {
    cors: {
      origin: '*',
    }
});
const users ={};

io.on('connection', socket =>{ //io.on is for listening the event
    socket.on('new-user-joined', name =>{ //socket.on is for for listening that particular event
        console.log("New User", name);
        users[socket.id] = name;
        socket.broadcast.emit('user-joined', name); //to notify every user in th char that a new user have joined
    });

    socket.on('send', message =>{
        socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
    });

    socket.on('disconnect', message =>{
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
});