const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Serve Twine game files from "public"
app.use(express.static('public'));

// Handle player connections
io.on('connection', (socket) => {
  console.log('A player connected');

  socket.on('playerMessage', (msg) => {
    // Broadcast to all players
    io.emit('broadcastMessage', msg);
  });
});

// Start server on port 2433
server.listen(2433, () => {
  console.log('Server running on http://localhost:2433');
});