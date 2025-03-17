const socket = io("http://localhost:5051", { path: "/real-time" });

const btn = document.getElementById("joinBtn")
btn.addEventListener("click", registerUser);
const register = document.getElementById("register");
const start = document.getElementById("start");
const nameInput = document.getElementById("nameInput");

const nickname = document.getElementById("nickname");
const role = document.getElementById("role");

start.style.display = "none";

function registerUser() {
  fetch("http://localhost:5051/join-game", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);

      console.log(data);
      
      const id = data.player.id;
      const name = data.player.name;
      const rol = data.player.rol;
      const players = data.numberofPlayers;

      start.style.display = "block";

      nickname.innerHTML = name;
      role.innerHTML = `Tú eres ${rol}`;

      nameInput.style.display = "none";
      btn.style.display = "none";

      btnStart= document.createElement("button");
      btnStart.innerHTML = "Iniciar";
      
    })
    .catch((error) => console.error("Error:", error));
}

const sendCoordenates = () => {
  socket.emit("coordenadas", { x: 123, y: 432 });
};

document.getElementById("event-btn").addEventListener("click", sendCoordenates);
