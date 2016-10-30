var express = require('express');
var app = express();
//这个页面 要实现（广播型 + 私聊） 聊天室
app.use(express.static(__dirname)) // 纠正引入 文件路径 
app.get('/',function(req,res){
	res.sendfile('./index.html')
})
var server = require('http').createServer(app)
var io = require('socket.io')(server)
// 把 注册的 用户 暂时放在 一个 json 里
var users = {};

io.on('connection',function(socket){
	
	// console.log('ok')
	socket.emit('message',{user:'',info:'欢迎来到聊天室，请输入匿名 ^ . ^ ! '})
	var username;

	// 接收 客户端发送的 事件
	socket.on('us_info',function(){
		// 给所有人发送 用户有几个，把他们的名字发送出去
		io.emit('us_info',Object.keys(users))
	})

	socket.on('message',function(msg){
		// console.log(Object.keys(users))  // [ 'name1', 'name2' ]
		
		// 得到前台的 input的value值 ，通知给所有人 io
		
		if(username){
			
			var reg = msg.match(/@(.+)\s(.+)/) // [ '@sda ', 'sda', index: 0, input: '@sda ' ]
			if(reg){
				var objUser = reg[1] // 用户名
				var mas_content = reg[2] // 发给某个用户的话
				//得到对方的 socket 然后发送消息
				// 发送方就是本人
				users[objUser].emit('message',{user:username,info:' 私聊给 ('+objUser+') 说：'+mas_content})
				//让自己也看到 私聊的信息
				socket.emit('message',{user:username,info:' 私聊给 ('+objUser+') 说：'+mas_content})
			}else{
				// 如果用户写了匿名
				// 广播型发送消息
				io.emit('message',{user:username,info:' 广播说：'+msg})
			}
			
		}else{
			
				username = msg
				users[username] = socket
				//发送用户信息时，给客户端发送 就发送 客户端有几个
				io.emit('us_info',Object.keys(users))
				io.emit('message',{user:'', info:'系统：欢迎<span class="color_399">（' +username+ '）</span>来到了房间'})
	

		}
	})
})

server.listen(3000)
