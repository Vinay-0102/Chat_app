const io = require("socket.io")(8000)

const users = {};

io.on('connection', socket => {
    socket.on('new_user_joined', name => {
        console.log(`new user `, name);
        users[socket.id] = name;
        socket.broadcast.emit('user_joined', name);
    });

    socket.on('send_msg', message => {
        socket.broadcast.emit('receive_msg', { message: message, name: users[socket.id] });
    });

    socket.on('disconnect', message => {
        socket.broadcast.emit('left', users[socket.id]);
        delete users[socket.id];
    });
})