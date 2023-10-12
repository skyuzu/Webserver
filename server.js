const express = require('express');
const http = require('http');
const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

// WebSocket server
wss.on('connection', (ws) => {
  console.log('WebSocket client connected');

  // Listen for messages from the client
  ws.on('message', (message) => {
    console.log(`Received: ${message}`);

    // Send a response back to the client
    ws.send(`Server received: ${message}`);
  });
});

server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
