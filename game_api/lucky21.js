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
        // The card that the player thinks will exceed 21
        card: undefined,
        playerCardsNumbers: [],
        total: 0
    };
    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {

            // game.getTotal(game);
            console.log(game.state.total);
            console.log(game.state.card);
            if ((game.state.total > 21 && game.state.card == undefined) || (game.state.total < 21 && game.state.card != undefined)) {
                return true;
            }

            return false;
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            if ((state.total == 21 && game.state.card == undefined) || (game.state.total > 21 && game.state.card != undefined)) {
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

            if (game.state.card != undefined) {
                return game.convertCard(game.state.card);
            }
        },

        convertCard: (card) => {
            return Number(card.slice(0, -1));
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
            return game.state.cards;
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            return game.state.card;
        },
        // Player action (void).
        guess21OrUnder: (game) => {

            let deck = deckConstructor();
            let dealer = dealerConstructor();
            game.state.deck = deck;
            game.state.dealer = dealer;
            game.convertCards(game);
            game.getTotal(game);

            //Continue the game if no win or no loose
            if (game.playerWon(game) == false && game.isGameOver(game) == false) {
                game.state.cards.push(dealer.draw(deck));
                console.log(game.state.total);
            }
        },
        // Player action (void).
        guessOver21: (game) => {
            let deck = deckConstructor();
            let dealer = dealerConstructor();
            game.state.total = 0;

            game.state.deck = deck;
            game.state.dealer = dealer;
            game.convertCards(game);
            game.getTotal(game);
            game.state.cards.push(dealer.draw(deck));
            game.state.card = dealer.draw(deck);

            game.isGameOver(game);
            game.playerWon(game);
        },
    };
};