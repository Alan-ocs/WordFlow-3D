// backend/app.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const router = require('./routes');
require('./db'); // Conecta ao Mongo

const app = express();

app.use(morgan('combined'));
app.use(express.json());
app.use(cors());
app.use(helmet());

// Middleware para definir o charset utf-8
app.use((req, res, next) => {
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  next();
});

const server = http.createServer(app);
const io = new Server(server, { /* options */ });

// Injetar o io para uso no router
app.use((req, res, next) => {
  req.io = io;
  next();
});

// Rotas
app.use('/api', router);

app.get('/health', (req, res) => {
  res.send('OK');
});

// Socket.IO
io.on('connection', (socket) => {
  console.log('WebSocket connected');
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Backend running on port ${PORT}`);
});
