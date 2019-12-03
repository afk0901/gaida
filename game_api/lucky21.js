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
        // The card that the player thinks will exceed 21.
        card: undefined,
        playerCardsNumbers: []
    };
    return {
        state: state,
        // Is the game over (true or false).
        isGameOver: (game) => {
            // TODO
            return false;
        },
        // Has the player won (true or false).
        playerWon: (game) => {
            // TODO
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
        convertCard: (game) => {
            // TODO
            var firstConvertedToNumber = game.state.cards[0].slice(0, -1);
            var secondConvertedToNumber = game.state.cards[1].slice(0, -1);
            
            var firstCardNumber = Number(firstConvertedToNumber);
            var secondCardNumber = Number(secondConvertedToNumber);

            game.state.playerCardsNumbers.push(firstCardNumber);
            game.state.playerCardsNumbers.push(secondCardNumber);
        },

        getTotal: (game) => {
            return  game.state.playerCardsNumbers[0] + game.state.playerCardsNumbers[1];
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
            // TODO
            game.state.card = "05C";
        },
        // Player action (void).
        guessOver21: (game) => {
            // TODO
            
        },
    };
};