const socket = io("http://localhost:5051", { path: "/rea-time" });

document.getElementById("joinBtn").addEventListener("click", registerUser);
const register = document.getElementById("register");
const start = document.getElementById("start");
const nameInput = document.getElementById("nameInput");

start.style.display = "none";

function registerUser() {
  fetch("http://localhost:5051/user-register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      name: nameInput.value
    }),
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      // start.style.display = "block";
    })
    .catch((error) => console.error("Error:", error));
}

const sendCoordenates = () => {
  socket.emit("coordenadas", { x: 123, y: 432 });
};

document.getElementById("event-btn").addEventListener("click", sendCoordenates);
