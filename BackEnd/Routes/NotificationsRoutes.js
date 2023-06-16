
module.exports = (io) => {

    io.on('connection', (socket) => {
      socket.on('joinNotifications', (params, cb) => {
        socket.join(params.sender)
        cb()
      })
  
      socket.on('sendNotifications', (request) => {
        io.to(request.reciever).emit('recieveNotifications', request)
      })
    })
  }