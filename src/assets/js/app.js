/* eslint-disable */
import "bootstrap";
import "../css/style.css";

const observer = new MutationObserver((mutations, observer) => {
  console.log(mutations, observer);
});

observer.observe(document, {
  subtree: true,
  attributes: true
});

// Card varaibles
const arr1 = ["A", 2, 3, 4, 5, 6, 7, 8, 9, 10, "J", "Q", "K"];
const arr2 = ["♦", "♥", "♠", "♣"];

//Generate Deck
const deck = arr1.flatMap(d => arr2.map(v => [d, v]));

// Shuffle Deck Function
const shuffle = array => {
  let currentIndex = array.length,
    randomIndex;
  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex]
    ];
  }
  return array;
};

// Print Card
const makeCard = arr => {
  if (deck[0][1] == "♦" || deck[0][1] == "♥") {
    return `<div class="card mx-5"><div class="card-header text-start"><span style="color: red">${arr[1]}</span> ${arr[0]}</div><div class="card-body"><p class="card-text align-middle">${arr[0]}</p> </div><div class="card-footer text-end">${arr[0]} <span style="color: red">${arr[1]}</span</div></div>`;
  } else
    return `<div class="card mx-5 "><div class="card-header text-start"><span>${arr[1]}</span> ${arr[0]}</div><div class="card-body"><p class="card-text align-middle">${arr[0]}</p> </div><div class="card-footer text-end">${arr[0]} <span>${arr[1]}</span</div></div>`;
};

// Delete card from Deck
const drawCard = array => {
  array.shift();
  return array;
};

const ask = document.getElementById("ask");
const stay = document.getElementById("stay");
const player = document.getElementById("player");
const dealer = document.getElementById("dealer");
let dealerCount = document.getElementById("dealerCount");
let playerCount = document.getElementById("playerCount");
let innerPlayerCount = 0;
let innerDealerCount = 0;
let acePlayer = false;
let aceDealer = false;

const updatePlayerCount = () => {
  if (deck[0][0] == "J" || deck[0][0] == "Q" || deck[0][0] == "K") {
    innerPlayerCount += 10;
  } else if (deck[0][0] == "A") {
    innerPlayerCount += 11;
    acePlayer = true;
  } else {
    innerPlayerCount += deck[0][0];
  }

  if (innerPlayerCount > 21 && acePlayer == true) {
    innerPlayerCount -= 10;
    acePlayer = false;
  }
  playerCount.innerHTML = innerPlayerCount;
  return innerPlayerCount;
};

const updateDealerCount = () => {
  if (deck[0][0] == "J" || deck[0][0] == "Q" || deck[0][0] == "K") {
    innerDealerCount += 10;
  } else if (deck[0][0] == "A") {
    innerDealerCount += 11;
    aceDealer = true;
  } else {
    innerDealerCount += deck[0][0];
  }

  if (innerDealerCount > 21 && aceDealer == true) {
    innerDealerCount -= 10;
    aceDealer = false;
  }

  dealerCount.innerHTML = innerDealerCount;
  return innerDealerCount;
};

const result = () => {
  const winnerCount = 21;

  const winCases =
    innerPlayerCount === winnerCount || innerDealerCount > winnerCount;

  const loseCases =
    innerPlayerCount > winnerCount ||
    (innerDealerCount <= winnerCount && innerDealerCount > innerPlayerCount);

  if (winCases) {
    if (confirm("You win!! Play Again!")) {
      return window.location.reload();
    }
  }

  if (loseCases) {
    showDealerCard();
    if (confirm("You lose, try again")) {
      return window.location.reload();
    }
  }
};

const resultPlayer = () => {
  const winnerCount = 21;

  const winCases = innerPlayerCount === winnerCount;

  const loseCases = innerPlayerCount > winnerCount;

  if (winCases) {
    if (confirm("You win!! Play Again!")) {
      return window.location.reload();
    }
  }

  if (loseCases) {
    if (confirm("You lose, try again")) {
      return window.location.reload();
    }
  }
};

const showDealerCard = () => {
  document.querySelector("#dealer-c1 .card").style.backgroundColor = "white";
  document.querySelector("#dealer-c1 .card-header").style.visibility =
    "visible";
  document.querySelector("#dealer-c1 .card-body").style.visibility = "visible";
  document.querySelector("#dealer-c1 .card-footer").style.visibility =
    "visible";
  document.querySelector("#dealerCount").style.visibility = "visible";
};

window.onload = function() {
  // Shuffle Deck
  shuffle(deck);
  document.getElementById("dealer-c1").innerHTML = makeCard(deck[0]);
  updateDealerCount();
  drawCard(deck);
  document.getElementById("player-c1").innerHTML = makeCard(deck[0]);
  updatePlayerCount();
  drawCard(deck);
  document.getElementById("dealer-c2").innerHTML = makeCard(deck[0]);
  updateDealerCount();
  drawCard(deck);
  document.getElementById("player-c2").innerHTML = makeCard(deck[0]);
  updatePlayerCount();
  drawCard(deck);
};

ask.addEventListener("click", function() {
  let newCard = document.createElement("div");
  newCard.classList.add("mt-5");
  player.appendChild(newCard);
  newCard.innerHTML = makeCard(deck[0]);
  updatePlayerCount();
  drawCard(deck);
  setTimeout(() => {
    resultPlayer();
  }, 1000);
});

stay.addEventListener("click", async function() {
  showDealerCard();
  setTimeout(() => {
    while (innerDealerCount <= innerPlayerCount) {
      let newCard = document.createElement("div");
      newCard.classList.add("mt-5");
      newCard.innerHTML = makeCard(deck[0]);
      dealer.appendChild(newCard);
      updateDealerCount();
      drawCard(deck);
    }
    setTimeout(() => {
      result();
    }, 1000);
  }, 1000);
});

//Dispatch an event
