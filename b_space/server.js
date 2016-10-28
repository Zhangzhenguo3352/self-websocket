

var express = require('express');
var app = express();
//命名空间 + 所有人发送消息 io

app.get('/',function(req,res){
	res.sendfile('./click.html')
})
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var room;
io.of('/green').on('connection',function(socket){
	socket.on('green',function(msg){
		console.log('绿房间发送消息==>'+msg)
		// 向所有人 发送消息
		io.of('/green').emit('message',msg)


	})
	socket.on('room',function(msg){
		//加入某个房间
		room = msg 
		socket.join(msg)
	})
})
io.of('/red').on('connection',function(socket){
	socket.on('red',function(msg){
		console.log('红房间发送消息=>'+msg)
		socket.send(msg+'too')
	})
})
server.listen(3000)
















