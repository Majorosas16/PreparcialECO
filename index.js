const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();
const httpServer = createServer(app);

const io = new Server(httpServer, {
  path: "/real-time",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/app1", express.static(path.join(__dirname, "app1")));

let users = [];
const roles = ["marco", "polo", "polo-especial"];
let availableRoles = [...roles];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/join-game", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Ops, faltan datos" });
  }

  if (availableRoles.length === 0) {
    return res.status(400).json({ message: "No hay roles disponibles, solo 3 jugadores" });
  }

  const assignRole = () => {
    const i = Math.floor(Math.random() * availableRoles.length);
    return availableRoles.splice(i, 1)[0];
  };

  const user = {
    id: users.length + 1,
    name,
    rol: assignRole(),
  };

  users.push(user);

  console.log("Super el registro:", users);
  console.log(roles);

  res.status(201).json({ message: "Usuario registrado", player: user, 
  numberOfPlayers: users.length }); 

});

io.on("connection", (socket) => {
  socket.on("coordenadas", (data) => {
    console.log(data);
    io.emit("coordenadas", data);
  });
  socket.on("notificar-a-todos", (data) => {});
});

httpServer.listen(5051);
console.log("Server on: http://localhost:5051");
