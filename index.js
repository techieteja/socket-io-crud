const express = require('express');
const app = express();
const port = 3000;
const server = app.listen(port);
const io = require('socket.io')(server);
const path = require('path');
const mongoose = require("./database");
const Post = require('./schemas/postSchema');


// Body parser extracts the entire body of an incoming request and exposes it on req. body
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', async(req, res) => {
    await res.render('/public/index.html');
});


io.on('connection', async(socket) => {
    socket.on('Create a post', async(msg) => {
        await Post.create({ textPost: msg });
    });
    await Post.find()
    .then((data) => {
        var items = JSON.stringify(data);
        socket.emit('Show all posts', items);
    });
});
