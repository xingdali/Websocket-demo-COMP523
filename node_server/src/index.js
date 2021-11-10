const WebSocket = require("ws");

// Create a Server instance on port 8000
const wss = new WebSocket.Server({ port: 8000 });

// Add a listener function to the listener array for the event name "connection".
wss.on("connection", async (ws) => {
  console.log("New client connected");
  // Wait for 0.5s
  await new Promise(r => setTimeout(r, 500));
  // Send message "20% of the files are processed" to the client side.
  ws.send(20)
  await new Promise(r => setTimeout(r, 1000));
  ws.send(40)
  await new Promise(r => setTimeout(r, 1000));
  ws.send(60)
  await new Promise(r => setTimeout(r, 1000));
  ws.send(80)
  await new Promise(r => setTimeout(r, 1000));
  ws.send(100)
});