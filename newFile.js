const originalDeck = []; 
const dummyArray = [34, 3, 3,3, 43, 3,3, 4,4]
console.log(dummyArray)
fetch('https://www.deckofcardsapi.com/api/deck/new/draw/?count=52')
    .then(response => response.json())
    .then(data => /*originalDeck.push(data)*/{for(let counter = 0; counter < 52; counter++){
        originalDeck.push(data.cards[counter])
    }})
    //.then(originalDeck.code[0])
    .then(console.log(originalDeck))
    .then(console.log(originalDeck.cards))
    //switch  per game statement 
        //War, Solitaire, 

    //logic
        //storage arrays: player 1/2 hands, player 1/2 decks, player 1/2 field, player 1/2 discard pile, inPlay
        // Function inputs: for the functions will be:  # of cards, which player, (taken from and given too)) 
        // Functions://deckToHand(), handToDeck(), handToField(), fieldToHand(), fieldToDiscard(), discardToField(), shuffleCards(), 
        // discardToDeck(), deckToDiscard(), handToDiscard(),  discardToHand()

        // function sourceToDestination(cardNum, fromPlayer, toPlayer) {
            //for(const counter  = 0;  0 < cardNum; 0++){destinationToPlayer.push(sourceFromPlayer())} }