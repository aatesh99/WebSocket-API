const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

app.use(express.static('public'));

wss.on('connection', (ws) => {
  console.log('🟢 New client connected');

  ws.on('message', (message) => {
    console.log('📨 Received:', message.toString());

    // Echo the message back to the same client
    ws.send(`Echo: ${message.toString()}`);
  });

  ws.on('close', () => {
    console.log('🔴 Client disconnected');
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
