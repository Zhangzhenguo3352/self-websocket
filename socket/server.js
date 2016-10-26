var express = require('express')
var app = express();

app.get('/',function(req,res){
	res.sendfile('./index.html')
})
var server = require('http').createServer(app)
// 我下载了 socket.io ,
var io = require('socket.io')(server)
//每个客户端 链接上来后 都是一个独立的socket 对象
io.on('connection',function(socket){ // 每个成功链接时的事件对象
	console.log('客户端已经链接')
	// io 是整个服务器
	// socket 是每个客户 发送过来的消息
	socket.on('message',function(msg ){
		console.log('客户端发过来的信息是'+msg)
		//服务器 想给 客户端 发点消息
		socket.send(msg+'too')
	})
	// 监听 客户端 链接终端 事件
	socket.on('disconnect',function(){
		console.log('客户端链接中断')
	})

	//可以利用 事件 来发消息 emit/on
	// 服务端 接收客户端 发过来的 消息
	socket.on('aaa',function(doc){
		console.log('客户端发过来'+doc)
	})
	// 服务端 向 客户端发送
	socket.emit('bbb',8866)
})

server.listen(3000)




