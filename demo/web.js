// 担任客户端 的一个角色
var WebSocket = require('ws');
// 建立链接对象
var socket = new WebSocket('ws://localhost:3000')

// open 当服务端与客户端 链接时 触发这个事件
socket.on('open',function(){ 
	// 向服务器发送消息
	socket.send('hello')

})
socket.on('message',function(msg){
	console.log('服务器向浏览器发送了'+msg)
})









