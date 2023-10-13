const WebSocket = require('ws');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws) => {
  // WebSocket connection established
  ws.on('message', (message) => {
    // Handle WebSocket messages from the client
    console.log(`Received: ${message}`);

    // Broadcast the received data to all connected clients
    wss.clients.forEach((client) => {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });
});