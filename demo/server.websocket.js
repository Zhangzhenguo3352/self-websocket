// 服务端 写的东西
var ws_server = require('ws').Server  // 服务端对象
var server = new ws_server({port:3000}) // 指定端口号
server.on('connection',function(ws){ // 建立链接的对象
	// ws 代表的就是魔鬼客户端
	// message 监听客户端发送的消息
	ws.on('message',function(msg){
		console.log('客户端向服务器 发送了数据'+msg)
		ws.send(msg+'too')
	})
})

















