let deckId = ""
const cardsContainer = document.getElementById("cards")
const newDeckBtn = document.getElementById("new-deck")
const drawCardsBtn = document.getElementById("draw__cards")
const header = document.getElementById("header")
const remainingCards = document.getElementById("remaining_cards")
let computerScore = 0
let myScore = 0
const computerScoreText = document.getElementById("computer_score")
const myScoreText = document.getElementById("my_score")

let firstPlayerCardSlots = document.getElementsByClassName("card-slot-first")
let secondPlayerCardSlots = document.getElementsByClassName("card-slot-second")
let firstPlayerCardSlotsArr = [...firstPlayerCardSlots]
let secondPlayerCardSlotsArr = [...secondPlayerCardSlots]

async function handleClick() {
  const res = await fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
  const data = await res.json()
  deckId = data.deck_id
  remainingCards.textContent = `Cards left: ${data.remaining}`
  drawCardsBtn.disabled = false 
  drawCardsBtn.classList.remove("disabled")
  computerScore = 0
  myScore = 0  
  computerScoreText.textContent = `Computer score: ${computerScore}`
  myScoreText.textContent = `Me: ${myScore}`
  header.textContent = `Game of War!`
}

newDeckBtn.addEventListener("click", handleClick)

async function drawCards() {
  const res = await fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=4`)
  const data = await res.json()
  const firstPlayerCards = data.cards.slice(0, 2)
  const secondPlayerCards = data.cards.slice(2)
   
  for(let i=0; i <= firstPlayerCardSlotsArr.length; i++ ) {
    
    if(firstPlayerCardSlotsArr[i] && firstPlayerCards[i])
    firstPlayerCardSlotsArr[i].innerHTML = `<img src= ${firstPlayerCards[i].image} class="card" />`
   
    if(secondPlayerCardSlotsArr[i]  && secondPlayerCards[i])
    secondPlayerCardSlotsArr[i].innerHTML = `<img src= ${secondPlayerCards[i].image} class="card" />`    
  }
 
 const textContent = determineCardWinner(firstPlayerCards, secondPlayerCards)

 newDeckBtn.disabled = true
 newDeckBtn.classList.add("disabled")

  header.textContent = textContent
  remainingCards.textContent = `Cards left: ${data.remaining}`
  if(data.remaining === 0) {      
    drawCardsBtn.disabled = true
    drawCardsBtn.classList.add("disabled")

    newDeckBtn.disabled = false
    newDeckBtn.classList.remove("disabled")

    if(computerScore > myScore) {
      header.textContent = "The Computer Won the Game!"
    } else if(computerScore < myScore) {
      header.textContent = "You Won the Game!"
    } else {
      header.textContent = "It's a Tie Game!"
    }
  } 
  computerScoreText.textContent = `Computer score: ${computerScore}`
  myScoreText.textContent = `Me: ${myScore}`
}

drawCardsBtn.addEventListener("click", drawCards)


function determineCardWinner(cardsArr1, cardsArr2) {
  const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
  "10", "JACK", "QUEEN", "KING", "ACE"]
  
  const firstPlayerValues = cardsArr1.reduce((total, currentEl) => {
    return valueOptions.indexOf(total.value)  + valueOptions.indexOf(currentEl.value)
  })

  const secondPlayerValues = cardsArr2.reduce((total, currentEl) => {
    return valueOptions.indexOf(total.value)  + valueOptions.indexOf(currentEl.value)
  })
 
  console.log("card 1:", firstPlayerValues)
  console.log("card 2:", secondPlayerValues)
  
  if (firstPlayerValues > secondPlayerValues) {
     computerScore ++
     computerScoreText.textContent = `Computer score: ${computerScore}`
     return "Computer wins!"
  } else if (firstPlayerValues < secondPlayerValues) {
     myScore++
     myScoreText.textContent = `Me: ${myScore}`
     return "You win!"
  } else {
      return "War!"
  }
}






