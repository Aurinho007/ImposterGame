let players = []
let currentPlayerIndex = 0;
let impostorIndex = 0;
// const words = ["mesa", "cadeira", "livro", "caneta", "computador", "janela", "bicicleta", "moto", "carro", "caracol", "chave", "geladeira", "blusa/camisa", "maçã", "caveira", "livro", "bússola"];
const words = ["Colegio Militar", "apartamento", "rodoviaria", "bar so bora", "Aeroporto", "loja de moto", "patio brasil", "casa da Amanda", "chapada"];
let chosenWord = "";

const savedPLayersKey = "@PLAYERS"
const savedPLayers = sessionStorage.getItem(savedPLayersKey)

if (savedPLayers) {
  players = JSON.parse(savedPLayers);

  document.getElementById("players-list").innerHTML += players.map(item => `<p>${item}</p>`).join('');
}


function addPlayer() {
  const playerName = document.getElementById("player-name").value;
  if (playerName) {
    players.push(playerName);
    document.getElementById("players-list").innerHTML += `<p>${playerName}</p>`;
    document.getElementById("player-name").value = "";
  }

}

function startGame() {
  if (players.length < 3) {
    alert("Adicione pelo menos 3 jogadores.");
    return;
  }

  sessionStorage.setItem(savedPLayersKey, JSON.stringify(players));

  impostorIndex = Math.floor(Math.random() * players.length);
  chosenWord = words[Math.floor(Math.random() * words.length)];
  document.getElementById("player-form").classList.add("hidden");
  document.getElementById("start-game-btn").classList.add("hidden");
  document.getElementById("game-area").classList.remove("hidden");

  showNextPlayer();
}

function showNextPlayer() {
  document.getElementById("current-player").textContent = `Jogador: ${players[currentPlayerIndex]}`;
  document.getElementById("display-word").classList.add("hidden");
  document.getElementById("reveal-word-btn").classList.remove("hidden");
  document.getElementById("next-player-btn").classList.add("hidden");
}


function revealWord() {
  const wordToDisplay = currentPlayerIndex === impostorIndex ? "Impostor" : chosenWord;
  document.getElementById("display-word").textContent = wordToDisplay;
  document.getElementById("display-word").classList.remove("hidden");
  document.getElementById("reveal-word-btn").classList.add("hidden");
  document.getElementById("next-player-btn").classList.remove("hidden");
}

function nextPlayer() {
  currentPlayerIndex++;
  if (currentPlayerIndex < players.length) {
    showNextPlayer();
  } else {
    document.getElementById("display-word").classList.add("hidden");
    document.getElementById("next-player-btn").classList.add("hidden");
    document.getElementById("current-player").classList.add("hidden");


    document.getElementById("restart-btn").classList.remove("hidden");
    alert("Todos os jogadores visualizaram a palavra. Agora, descubra o impostor!");
  }
}

function reset() {
  location.reload();
}


document.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addPlayer()
  }
});
