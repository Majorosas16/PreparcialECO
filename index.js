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
const roles = ["Marco", "Polo", "Special Polo"];
let availableRoles = [...roles];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/join-game", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Ops, data missing" });
  }

  if (availableRoles.length === 0) {
    return res.status(400).json({ message: "No more players, There are 3 players now" });
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

  res.status(201).json({ message: "Usuario registrado", player: user, 
  numberOfPlayers: users.length }); 

});

app.post("/start-game", (req, res) => {

  const { text} = req.body;

  if (!text) {
    return res.status(400).json({ message: "Ops, data missing" });
  }

  console.log(text);
  
  res.status(200).json({ message: "Juego iniciado"}); 

  io.emit("startGame"); // Ahora enviamos un objeto con `role`
});

// io.on("connection", (socket) => {
//   users.forEach((user) => {
//     const userEmit = {
//       name: user.name,
//       rol: user.rol,
//     }
//     io.emit("startGame", userEmit);
//   });
// })


httpServer.listen(5051);
console.log("Server on: http://localhost:5051");
