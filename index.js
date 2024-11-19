//-----------------------
//-----DEFINING VARIABLES
//-----------------------
const gridContainer = document.querySelector(".grid-container");
let cards = [];
let firstCard, secondCard;
let lockBoard = false;
let score = 0;
document.querySelector(".score").textContent = score;

//-----------------------
//-----FETCH CARD DATA
//-----------------------
fetch("./data/cards.json")
  .then((res) => res.json())
  .then((data) => {
    cards = [...data, ...data];
    shuffleCards();
    generateCards();
  });

//-----------------------
//-----SHUFFLE CARDS
//-----------------------
function shuffleCards() {
  let currentIndex = cards.length,
    randomIndex,
    temporaryValue;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
}

//-----------------------
//-----GENERATE CARDS
//-----------------------
function generateCards() {
  for (let card of cards) {
    const cardElement = document.createElement("div");
    cardElement.classList.add("card");
    cardElement.setAttribute("data-name", card.name);
    cardElement.innerHTML = `
      <div class="front">
        <img class="front-image" src=${card.image} />
      </div>
      <div class="back"></div>
    `;
    gridContainer.appendChild(cardElement);
    cardElement.addEventListener("click", flipCard);
  }
}

//-----------------------
//-----FLIP CARD
//-----------------------
function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flipped");

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  
  lockBoard = true;

  checkForMatch();
}

//-----------------------
//-----CHECK FOR MATCH
//-----------------------
function checkForMatch() {
  let isMatch = firstCard.dataset.name === secondCard.dataset.name;

  isMatch ? disableCards() : unflipCards();
}

//-----------------------
//-----DISABLE CARDS (IF MATCHED) & INCREASES SCORE
//-----------------------
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  
  //----------INCREASES SCORE :D
  score++;
  document.querySelector(".score").textContent = score;
  
  resetBoard();

  //----if score is 9, displays winning alert
  if(score == 9){
    alert("YOU WIN!");
  }
}

//-----------------------
//-----UNFLIP CARDS
//-----------------------
function unflipCards() {
  setTimeout(() => {
    firstCard.classList.remove("flipped");
    secondCard.classList.remove("flipped");
    resetBoard();
  }, 1000);
}

//-----------------------
//-----RESET BOARD
//-----------------------
function resetBoard() {
  firstCard = null;
  secondCard = null;
  lockBoard = false;
}

//-----------------------
//-----RESTART GAME
//-----------------------
function restart() {
  resetBoard();
  shuffleCards();
  score = 0;
  document.querySelector(".score").textContent = score;
  gridContainer.innerHTML = "";
  generateCards();
}


//-----------------------
//-----WIN SCREEN POPUP
//-----------------------


