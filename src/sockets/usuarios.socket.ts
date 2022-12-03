export default (socket) => {
  socket.on('usuario:cerrarsesion', (result) => {
    const data = { result }
    console.log(socket.id, 'data: ', data)
    // broadcast emite a todos menos al remitente
    socket.broadcast.emit('usuario:clcerrarsesion', result)
    // emitir mensaje a una sola persona
    // socket.to(socket.id).emit('usuario:clcerrarsesion', result)
    socket.emit('usuario:clcerrarsesion', result)
  })
}
