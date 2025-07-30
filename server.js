const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);

// Serve static files from "public" folder
app.use(express.static('public'));

// Create WebSocket server on top of HTTP server
const wss = new WebSocket.Server({ server });

// Handle WebSocket connection
wss.on('connection', (ws) => {
  console.log('🟢 New client connected');

  // Receive message from client
  ws.on('message', (message) => {
    console.log('📨 Received:', message.toString());

    // Broadcast to all other clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message.toString());
      }
    });
  });

  // Client disconnect
  ws.on('close', () => {
    console.log('🔴 Client disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
