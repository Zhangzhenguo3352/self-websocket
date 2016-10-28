var express = require('express');
var app = express();
//这个页面 要实现广播型 聊天室
app.get('/',function(req,res){
	res.sendfile('./index.html')
})
var server = require('http').createServer(app)
var io = require('socket.io')(server)

io.on('connection',function(socket){
	console.log('ok')
	socket.emit('message','欢迎来到聊天室，请输入匿名 ^ . ^ ! ')
	var username;
	socket.on('message',function(msg){
		// 得到前台的 input的value值 ，通知给所有人 io
		if(username){
			// 如果用户写了匿名
			// 广播型发送消息
			io.emit('message','(' +username+ ') 说：'+msg)
		}else{
			
			// 如果用户没有写匿名
			username = msg // 把用户第一次 输入的，当成匿名
			io.emit('message','系统：（' +username+ '）来到了房间')

		}
	})
})

server.listen(3000)
