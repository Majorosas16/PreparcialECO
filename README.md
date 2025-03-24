function removePlayer(idPlayer) {
  console.log("Eliminando jugador:", idPlayer);

  fetch(`http://localhost:5051/remove-player/${idPlayer}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" }
  })
    .then((response) => response.json())
    .then((data) => {
      alert(data.message);
      console.log("Jugador eliminado:", data);
    })
    .catch((error) => console.error("Error:", error));
}
