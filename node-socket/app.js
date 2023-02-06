
const { createServer } = require("http")
const { Server } = require("socket.io")

const httpServer = createServer();
const io = new Server(httpServer, {
  // 允许哪些客户端进行连接
  cors: {
    origin: "http://10.36.138.42:9090"
  }
})

// 监听客户端连接事件
io.on('connection', client => {

  console.log('---有人连接上了')
  // 监听socket客户端发来的消息，并对其进行转发
  client.on('server', data=>{
    // do something
    // console.log('---来自admin发来的信息', data)
    // 把admin发来的消息，发给指定的商家
    io.emit(data.id, data.msg)
  })

  client.on('disconnect', () => {
    console.log('--有人断开了连接')
  })
})

httpServer.listen(8888, ()=>{
  console.log('--- socket server is running on 8888')
})
