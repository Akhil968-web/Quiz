
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: process.env.PORT || 8080 });
let clients = [];

wss.on('connection', (ws) => {
  console.log('New client connected');
  clients.push(ws);

  ws.on('message', (message) => {
    clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(message);
      }
    });
  });

  ws.on('close', () => {
    clients = clients.filter(c => c !== ws);
    console.log('Client disconnected');
  });
});

console.log('WebSocket server running');
