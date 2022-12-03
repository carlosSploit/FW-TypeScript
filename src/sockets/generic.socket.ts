export default (socket) => {
  socket.on('conectado', (result) => {
    const data = { result }
    console.log(data)
    console.log(`Usuario ${socket.id} Conectado - `)
  })
}
