const express = require('express');
const app = express(); // Init app and export it so other modules can access it
const cors = require('cors');
const io = require('socket.io');
const http = require('http');

// cors
app.use(cors());
app.options('*', cors());
app.use(express.json({ extended: true }));
app.get('/', (req, res) => {
  res.send('codebox');
});
const PORT = 3000;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const socket = io(server, {
  cors: {
    origin: 'https://codebox-play.vercel.app',
    methods: ['GET', 'POST'],
  },
});

socket.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });

  socket.on('click', (count) => {
    console.log('click', count);
    socket.broadcast.emit('click', count);
  });
});

module.exports = app;
