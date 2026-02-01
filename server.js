console.log("server.js file is running");

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve files from "public" folder
app.use(express.static('public'));

let fishTank = [];

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.emit('init', fishTank);

  socket.on('newFish', (fishData) => {
    fishTank.push(fishData);
    io.emit('addFish', fishData);
  });
});

server.listen(2433, () => {
  console.log('Server running on http://localhost:2433');
});