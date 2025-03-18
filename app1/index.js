const socket = io("http://localhost:5051", { path: "/real-time" });

const btn = document.getElementById("joinBtn")
btn.addEventListener("click", registerUser);
const register = document.getElementById("register");
const start = document.getElementById("start");
const nameInput = document.getElementById("nameInput");

const nickname = document.getElementById("nickname");
const role = document.getElementById("role");
const wait = document.getElementById("wait");

let myRole = ""; // Variable para guardar el rol del jugador

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
    
      const id = data.player.id;
      const name = data.player.name;
      myRole = data.player.rol;  // Guardamos el rol del jugador actual
      const players = data.numberOfPlayers;
      
      start.style.display = "block";

      nickname.innerHTML = name;
      role.innerHTML = `Tú eres ${myRole}`;

      nameInput.style.display = "none";
      btn.style.display = "none";
      
      if (players === 3) {
        startGame()
      }
    })
    .catch((error) => console.error("Error:", error));
}

function startGame() {
  console.log("llegaste a StartGame!");
  
        fetch("http://localhost:5051/start-game", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: "The Game Starts!",
          }),
      })
          .then((response) => response.json())
          .then((data) => {
            alert(data.message);
          })
          .catch((error) => console.error("Error:", error));
      }
      
      socket.on("startGame", () => { 
        console.log("Recibido del servidor:",);
      
        if (myRole === "Marco") { // Ahora esto funcionará
          console.log("Eres Marco");
      
          wait.style.display = "none";
          const btnStart = document.createElement("button");
          btnStart.innerHTML = "Gritar MARCO";
          start.appendChild(btnStart);

        } else {
          console.log("Eres Polo");
          wait.style.display = "none";
          wait.innerHTML = "Espera a que Marco grite";
        }
      });
      

const sendCoordenates = () => {
  socket.emit("coordenadas", { x: 123, y: 432 });
};

// document.getElementById("event-btn").addEventListener("click", sendCoordenates);
