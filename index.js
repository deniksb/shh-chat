const express = require('express')
const app = express()
const server = require('http').createServer(app)
const port = process.env.PORT || 3000
const io = require('socket.io')(server)
const path = require('path')

app.use(express.static(path.join(__dirname + '/public')))

//saving last 10 messages
let savedMessages = {};

io.on('connection', socket => {
  console.log('Some client connected')
  for(let i=0;i<savedMessages.length;i++){
    io.emit('chat', savedMessages[i]);
  }

  socket.on('chat', message => {
    console.log(message)
    if(savedMessages.length <= 10){
      savedMessages.push(message);
    }
    else {
      savedMessages.shift();
      savedMessages.push(message);
    }
    
    io.emit('chat', message)
  })
})

server.listen(port, () => {
  console.log(`Server running on port: ${port}`)
})
