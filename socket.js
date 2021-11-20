let readyPlayerCount = 0;
function listen(io) {
    const connection = socket => {
      console.log('connected using socket.io');

      socket.on('ready', () =>{
          console.log('Player is ready', socket.id);
          readyPlayerCount++;

          if (readyPlayerCount % 2 == 0) {
              io.emit('startGame', socket.id);
          }
      });

      socket.on('paddleMove', (paddleData) => {
          socket.broadcast.emit('paddleMove', paddleData);
      });

      socket.on('ballMove', ballData => {
          socket.broadcast.emit('ballMove', ballData);
      });
      socket.on('disconnect', (reason)=>{
          console.log(`Client ${socket.id} disconnecte`, reason);
      })
    }

    io.on('connection',connection);
}

module.exports = {listen};