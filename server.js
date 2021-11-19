const server = require('http').createServer();
const io = require('socket.io')(server, { cors: { origin: '*' } });
let readyPlayerCount = 0;
const PORT = 3000;

server.listen(PORT);
console.log('Server is running on port ', PORT);

const connection = socket => {
    console.log('connected using socket.io');

    socket.on('ready', () =>{
        console.log('Player is ready', socket.id);
        readyPlayerCount++;

        if (readyPlayerCount == 2) {
            io.emit('startGame', socket.id);
        }
    });

    socket.on('paddleMove', (paddleData) => {
        socket.broadcast.emit('paddleMove', paddleData);
    });

    socket.on('ballMove', ballData => {
        socket.broadcast.emit('ballMove', ballData);
    })
}

io.on('connection',connection);