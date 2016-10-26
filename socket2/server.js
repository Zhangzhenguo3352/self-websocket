//添加 命名空间思想 io.of('red').on('connection',function(xxx){})
var express = require('express')
var app = express();

app.get('/',function(req,res){
	res.sendfile('./index.html')
})
var server = require('http').createServer(app)
// 我下载了 socket.io ,
var io = require('socket.io')(server)
//每个客户端 链接上来后 都是一个独立的socket 对象
io.of('/green').on('connection',function(socket){ // 每个成功链接时的事件对象
	console.log('客户端已经链接')
	// io 是整个服务器
	// socket 是每个客户 发送过来的消息
	socket.on('message',function(msg ){
		console.log('客户端发过来的信息是'+msg)
		//服务器 想给 客户端 发点消息
		socket.send(msg+'too')
	})

})
io.of('/red').on('connection',function(socket){

})

server.listen(3000)




