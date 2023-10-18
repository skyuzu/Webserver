const WebSocket = require('ws');
const http = require('http');
const express = require('express');
const path = require('path');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));

wss.on('connection', (ws) => {
  // Function to send random robot data to the client every 2000ms
  function sendRandomRobotData() {
    const robotData = generateRandomRobotData();
    ws.send(JSON.stringify(robotData));
  }

  // Send initial data to the client when connected
  sendRandomRobotData();

  // Set up the interval to send updates
  const updateInterval = setInterval(sendRandomRobotData, 2000);

  // Handle client disconnect
  ws.on('close', () => {
    clearInterval(updateInterval);
  });
});

// Function to generate random robot data
function generateRandomRobotData() {
  const robotColors = ['red', 'blue', 'yellow', 'green'];
  const randomRobotData = [];

  for (let i = 0; i < 4; i++) {
    const x = Math.floor(Math.random() * 10);
    const y = Math.floor(Math.random() * 10);
    const direction = ['North', 'East', 'South', 'West'][Math.floor(Math.random() * 4)];
    const color = robotColors[i];
    randomRobotData.push({ x, y, direction, color });
  }

  return randomRobotData;
}

server.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
