let app = require('express')();
let http = require('http').createServer(app);
let io = require('socket.io')(http, {
	cors: {
		origins: ['http://localhost:4000/', 'http://localhost:4200/']
	}
});
const { CreateNewChatRoom } = require('./utils/chat-manager');

app.get('/', (req, res) => res.send('hello world!'));
io.on('connection', (socket)=>{
	console.log('a user connected...');
	socket.on('add-message', (msg)=>{
		console.log(msg);
		socket.broadcast.emit('broadcast-message', msg);
	});
});
http.listen(4000, ()=> {
	console.log('listening to port: 4000');
});