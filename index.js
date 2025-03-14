const express = require("express");
const path = require("path");
const { Server } = require("socket.io");
const { createServer } = require("http");

const app = express();

const httpServer = createServer(app);

const io = new Server(httpServer, {
  // westa es una instancia de Socket.io en nuestro servidor
  path: "/rea-time",
  cors: {
    origin: "*",
  },
});

app.use(express.json());
app.use("/app1", express.static(path.join(__dirname, "app1")));
app.use("/app2", express.static(path.join(__dirname, "app2")));

let users = [];
let roles = ["marco", "polo", "polo-especial"];

app.get("/users", (req, res) => {
  res.send(users);
});

app.post("/user-register", (req, res) => {

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: "Ops, faltan datos" });
  }

  assingRole = () => {
    let rol = roles[Math.floor(Math.random() * roles.length)];
    if (users.some((user) => user.rol === rol)){
      //Que vaya eliminando los elementos del arreglo
    }
    return rol;
   }

  const user  = {
    id: users.length + 1,
    name,
    rol: assingRole(),
  };

  users.push(user);

 
  console.log("Super el registro:", users);

  res.json({ message: "Usuario registrado" });
});



io.on("connection", (socket) => {
  socket.on("coordenadas", (data) => {
    console.log(data);
    io.emit("coordenadas", data);
  });
  socket.on("notificar-a-todos", (data) => {});
});

httpServer.listen(5051);
