
const cardBtn = document.getElementById('card-btn')
const drawBtn = document.getElementById('draw-btn')
const deckImg1 = document.getElementById('deck-img-1')
const deckImg2 = document.getElementById('deck-img-2')
const remainingCards = document.getElementById('remaining-cards')
let deckId;
let card1;
let card2;
let playerScore = 0;
let computerScore = 0;

cardBtn.addEventListener('click',function(){
    fetch('https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/')
  .then((response) => response.json())
  .then((data) => { 
    console.log(data.deck_id)
    deckId = data.deck_id
    remainingCards.innerHTML = `Remaing cards: ${data.remaining}`
});
})

drawBtn.addEventListener('click',function(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(data => {
            console.log(data.remaining)
            deckImg1.innerHTML = `<img src="${data.cards[0].image}" class="card"/>`
            deckImg2.innerHTML = `<img src="${data.cards[1].image}" class="card"/>`
            card1 = data.cards[0];
            card2 = data.cards[1]
            document.getElementById('winner').innerHTML = determineCardWinner(card1,card2)
            remainingCards.innerHTML = `<p>Remaining cards: ${data.remaining}`
            if(data.remaining === 0){
                drawBtn.disabled =true;
                drawBtn.classList.add('disabled')
                if (computerScore > playerScore) {
                    // display "The computer won the game!"
                    document.getElementById('winner').textContent = "The computer won the game!"
                } else if (playerScore > computerScore) {
                    // display "You won the game!"
                    document.getElementById('winner').textContent = "You won the game!"
                } else {
                    // display "It's a tie game!"
                    document.getElementById('winner').textContent = "It's a tie game!"
                }
            }
        })
        
       
})


function determineCardWinner(some1, some2) {
    const valueOptions = ["2", "3", "4", "5", "6", "7", "8", "9", 
    "10", "JACK", "QUEEN", "KING", "ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)
    console.log("card 1:", card1ValueIndex)
    console.log("card 2:", card2ValueIndex)
    let winner;
    if (card1ValueIndex > card2ValueIndex) {
        playerScore++
        document.getElementById('playerScore').innerHTML = `Player Score: ${playerScore}`
        winner = 'You win!'
    } else if (card1ValueIndex < card2ValueIndex) {
        computerScore++
        document.getElementById('computerScore').innerHTML = `Computer Score: ${computerScore}`
        winner = 'computer wins!'
    } else {
       winner = 'war'
    }
   
    return winner
}


