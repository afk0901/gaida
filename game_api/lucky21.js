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
            let cards = game.state.cards;
            let sum = 0;

            for (var i = 0; i < cards.length; i++) {
                if (sum <= 21) {
                    sum += game.convertCard(cards[i]);
                }
            }
            return sum;
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

            for (var i = 0; i < game.state.cards.length; i++) {

                var convertedCard = game.state.cards[i].slice(0, -1);
                state.playerCardsNumbers.push(parseInt(convertedCard, 10));
            }
            return game.state.playerCardsNumbers;
        },

        getTotal: (game) => {

            for (var i = 0; i < game.state.playerCardsNumbers.length; i++) {
                if (game.state.playerCardsNumbers[i] == 11 || game.state.playerCardsNumbers[i] == 12 || game.state.playerCardsNumbers[i] == 13) {
                    game.state.playerCardsNumbers[i] = 10;
                }

                //Ace when higher than 21 is selected
                if (game.state.playerCardsNumbers[i] == 1) {
                    game.state.playerCardsNumbers[i] = 11;
                }
            }
            const sum = (card1, card2) => card1 + card2;
            game.state.total = game.state.playerCardsNumbers.reduce(sum);
        },
        // The player's cards (array of strings).
        getCards: (game) => {
            return game.state.cards;
        },
        // The player's card (string or undefined).
        getCard: (game) => {
            return game.state.card;
        },

        //Should return only ones
        OnlyAces: (value) => {
            return value === 1;
        },

        benefitAces: (game) => {
            game.convertCards(game);
            let aces = game.state.playerCardsNumbers.filter(game.OnlyAces);

            aces[aces.length - 1] = 11;
            game.getTotal(game);

            if (game.state.total > 21) {
                aces[aces.length - 1] = 1;
                return aces;
            }
            return aces;
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