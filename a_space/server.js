

var express = require('express');
var app = express();
//命名空间的概念,
//点击哪一个 ，实现命名空间里的方法执行

app.get('/',function(req,res){
	res.sendfile('./click.html')
})
var server = require('http').createServer(app)
var io = require('socket.io')(server)
var room;
io.of('/green').on('connection',function(socket){
	socket.on('green',function(msg){
		console.log('绿房间发送消息==>'+msg)



		socket.send(msg+'too')  //发送给指定人消息




		// 发送给 除自己的所有 人
		//socket.broadcast.emit('message',msg+'too')



		// 发送给 指定的派消息，其它派看不到， to('hua')
		// 打开两个浏览器，当第二个浏览器选择了绿房间，并且是 华山派，才能看到第一个浏览器发的消息
		socket.broadcast.to('hua').emit('message',msg+'too') 


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
















