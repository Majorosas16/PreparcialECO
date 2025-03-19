const socket = io("http://localhost:5051", { path: "/real-time" });

const btn = document.getElementById("joinBtn")
btn.addEventListener("click", registerUser);
const register = document.getElementById("register");
const start = document.getElementById("start");
const nameInput = document.getElementById("nameInput");

const nickname = document.getElementById("nickname");
const role = document.getElementById("role");
const wait = document.getElementById("wait");

let playerRole = "";
let idPlayer = 0;

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
    
      idPlayer = data.player.id;
      const name = data.player.name;
      playerRole = data.player.rol;
      const players = data.numberOfPlayers;
      
      start.style.display = "block";

      nickname.innerHTML = name;
      role.innerHTML = `Tú eres ${playerRole}`;

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
        console.log("Socket on running. Player role:", playerRole);
      
        if (playerRole === "Marco") {  
          wait.style.display = "none";
          const btnScreamMarco = document.createElement("button");
          btnScreamMarco.innerHTML = "Gritar MARCO";
          btnScreamMarco.addEventListener("click", notifyMarco)
          start.appendChild(btnScreamMarco);
        
        } else  { 
          wait.innerHTML = "Espera a que Marco grite";
          const btnScreamPolo = document.createElement("button");
          btnScreamPolo.innerHTML = "Gritar POLO";
          btnScreamPolo.id="btnScreamPolo"
          btnScreamPolo.disabled = true;
          start.appendChild(btnScreamPolo);
        }
      });

      function notifyMarco() {
        console.log("llegaste a notifyMarco");
        
              fetch("http://localhost:5051/notify-marco", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idPlayer }),
            })
                .then((response) => response.json())
                .then((data) => {
                  alert(data.message);
                  console.log("player de la data:" + data.idPlayer); //aqui si lo muestra bien
                  socket.emit("notify-marco", data.idPlayer);
                })
                .catch((error) => console.error("Error:", error));
            }
        
            socket.on("notification", (data) => {
              console.log("Marco scream!");
              console.log(data.message); // bien
              console.log(data.userId); // bien
            
              if (playerRole === "Polo" || playerRole === "Polo Especial") {  
                console.log("esperando cambios en el DOM"); // Ahora sí lo muestra
                
                wait.innerHTML = `<h2>Marco ha gritado: ${data.message}</h2>`;
            
                // Espera un momento antes de buscar el botón para asegurarte de que ya se creó en el DOM
                setTimeout(() => {
                  const btnScreamPolo = document.getElementById("btnScreamPolo");
                  if (btnScreamPolo) {
                    btnScreamPolo.disabled = false;  
                  }
                }, 100); // Espera 100ms antes de buscar el botón
              }
            });
            
      
const sendCoordenates = () => {
  socket.emit("coordenadas", { x: 123, y: 432 });
};

// document.getElementById("event-btn").addEventListener("click", sendCoordenates);
