export default (socket) => {
  socket.on('tipocurso:insertdata', (result) => {
    const data = { result }
    console.log(socket.id, 'data: ', data)
    socket.broadcast.emit('tipocurso:clinsertdata', result)
    socket.emit('tipocurso:clinsertdata', result)
  })

  socket.on('tipocurso:actualdata', (result) => {
    const data = { result }
    console.log(socket.id, 'data: ', data)
    socket.broadcast.emit('tipocurso:clactualdata', result)
    socket.emit('tipocurso:clactualdata', result)
  })

  socket.on('tipocurso:delectedata', (result) => {
    const data = { result }
    console.log(socket.id, 'data: ', data)
    socket.broadcast.emit('tipocurso:cldelectedata', result)
    socket.emit('tipocurso:cldelectedata', result)
  })
}
