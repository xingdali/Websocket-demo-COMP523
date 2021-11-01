const WebSocket = require("ws");

const wss = new WebSocket.Server({ port: 8000 });

wss.on("connection", async (ws) => {
  console.log("New client connected");
  await new Promise(r => setTimeout(r, 500));
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