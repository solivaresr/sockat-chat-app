// incluir socket.io y asignar puerto
const io = require('socket.io')(3000)
const users = {} // guarda todos los conectados al chat

// cada vez que alguien visite la página cargará esta función
// y les dará a cada usuario su propio socket
io.on('connection', socket => {
  socket.on('new-user', name => {
    users[socket.id] = name
    socket.broadcast.emit('user-connected', name)
  })
  // maneja el evento de los formularios de chat
  socket.on('send-chat-message', message => {
    socket.broadcast.emit('chat-message', { message: message, name: users[socket.id] }) // envía el mensaje y el nombre a todos los conectados al servidor, exepto al que lo envío
  })

  socket.on('disconnect', () => {
    socket.broadcast.emit('user-disconnected', users[socket.id])
    delete users[socket.id]
  })
})
