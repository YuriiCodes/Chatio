const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const {Server} = require("socket.io");
const io = new Server(server);


const PORT = process.env.PORT ?? 3000;
const path = require('path');

app.use(express.static(path.resolve(__dirname, 'static')))
app.use("/static", express.static(path.resolve(__dirname, 'static')))
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({extended: false}));


let messages = []


io.on('connection', (socket) => {
    console.log(new Date() +  ' :a user connected');

    socket.on('newMsg', (data) => {
        let message = {name: data.name, message: data.message}

        messages.push(message)
        console.log(new Date() +  ": saved new message from : " + data.name + " : " + data.message.substring(0, 10) + "...")

        io.emit('newMsg', {
            name: data.name,
            message: data.message
        });
    })
});


app.get('/', (req, res) => {
    console.log(new Date() + " :new connection on root");
    res.render('chatroom', {title: "Test ChatRoom", data: messages})
})


server.listen(PORT, (req, res) => {
    console.log(`${new Date()} :server running on ${PORT}`)
})
