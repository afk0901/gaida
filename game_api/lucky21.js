const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');

module.exports = (deck, dealer) => {
    dealer.shuffle(deck);
    let card0 = dealer.draw(deck);
    let card1 = dealer.draw(deck);
    let state = {
        deck: deck,
        dealer: dealer,
        cards: [
            card0,
            card1,
        ],
        // The card that the player thinks will exceed 21 - always undefined when less than 21
        card: undefined,
        playerCardsNumbers: [],
        total: 0
    };
    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {
            
           // game.getTotal(game);
            if ( game.state.total > 21) {
                return true;
            }
            return false;
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            // TODO
            if (state.total == 21) {
                return true;
            }
            return false;
        },
        // The highest score the cards can yield without going over 21 (integer).
        getCardsValue: (game) => {
            // TODO
        },
        // The value of the card that should exceed 21 if it exists (integer or undefined).
        getCardValue: (game) => {
            // TODO
        },
        //converting the player cards to numbers
        convertCards: (game) => {

            console.log(game.state.deck);
            for (var i = 0; i < game.state.cards.length; i++) {

                var convertedCard = game.state.cards[i].slice(0, -1);
                state.playerCardsNumbers.push(parseInt(convertedCard, 10));
            }
            return game.state.playerCardsNumbers;
        },

        getTotal: (game) => {

            const sum = (card1, card2) => card1 + card2;
            game.state.total = game.state.playerCardsNumbers.reduce(sum);
            console.log(game.state.total);
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            // TODO
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            // TODO
        },
        // Player action (void).
        guess21OrUnder: (game) => {
            var gameOn = true;
            let deck = deckConstructor();
            let dealer = dealerConstructor();
            
            game.state.deck = deck;
            game.state.dealer = dealer;
            game.getTotal(game);
            
          while (gameOn == true) { 
                console.log(game.state.total);

              if (game.isGameOver(game)) {
                    console.log(game.state.total);
                    console.log("GAMOVER TRUE");
                    gameOn = true;
                }
               if (game.playerWon(game)) {
                    gameOn = true;
                }
                //Continue the game
                else {
                    game.state.cards.push(dealer.draw(deck));
                    game.getTotal(game);
                    console.log(game.state.total);
                    gameOn = false;
                }
                }
        },
        // Player action (void).
        guessOver21: (game) => {
        },
    };
};