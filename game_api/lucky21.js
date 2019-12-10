module.exports = (context) => {
  const deckConstructor = context('deck');
  const deck = deckConstructor(context);

  const dealerConstructor = context('dealer');
  const dealer = dealerConstructor(context);

  dealer.shuffle(deck);
  const card0 = dealer.draw(deck);
  const card1 = dealer.draw(deck);
  const state = {
    deck: deck,
    dealer: dealer,
    cards: [
      card0,
      card1,
    ],
    // The card that the player thinks will exceed 21.
    card: undefined,
    playerCardsNumbers: [],
    total: 0,
  };
  return {
    state: state,
    // Is the game over (true or false).
    isGameOver: (game) => {
      if ((game.state.total > 21 && game.state.card == undefined) ||
        (game.state.total < 21 && game.state.card != undefined)) {
        return true;
      }

      return false;
    },
    // Has the player won (true or false).
    playerWon: (game) => {
      if ((state.total == 21 && game.state.card == undefined) ||
        (game.state.total > 21 && game.state.card != undefined)) {
        return true;
      }
      return false;
    },
    // The highest score the cards can yield without going over 21 (integer).
    getCardsValue: (game) => {
      let cardsValue = 0;

      // count everything and treat all aces as 1.
      for (let i = 0; i < game.state.cards.length; i++) {
        const cardValue = parseInt(game.state.cards[i].substring(0, 2));
        cardsValue += Math.min(cardValue, 10);
      }

      // foreach ace check if we can add 10.
      for (let i = 0; i < game.state.cards.length; i++) {
        const cardValue = parseInt(game.state.cards[i].substring(0, 2));
        if (cardValue == 1) {
          if (cardsValue + 10 <= 21) {
            cardsValue += 10;
          }
        }
      }

      return cardsValue;
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

    // converting the player cards to numbers
    convertCards: (game) => {
      game.state.playerCardsNumbers = [];
      for (let i = 0; i < game.state.cards.length; i++) {
        let convertedCard = game.state.cards[i].slice(0, -1);

        if (convertedCard == 11 || convertedCard == 12 || convertedCard == 13) {
          convertedCard = 10;
        }

        game.state.playerCardsNumbers.push(parseInt(convertedCard));
      }
      return game.state.playerCardsNumbers;
    },

    getTotal: (game) => {
      game.state.total = game.getCardsValue(game) + (game.getCardValue(game) || 0);
      return game.state.total;
    },
    // The player's cards (array of strings).
    getCards: (game) => {
      return game.state.cards;
    },
    // The player's card (string or undefined).
    getCard: (game) => {
      return game.state.card;
    },

    // Should return only ones
    OnlyAces: (value) => {
      return value === 1;
    },

    // Benifits the aces for the user
    benefitAces21OrUnder: (game) => {
      game.state.playerCardsNumbers = [];
      game.convertCards(game);
      game.getTotal(game);
      // Let's see if total is > 21 if one ace is 11
      game.state.total += 11;

      // Switching out one ace if total is < 21 if one ace should be 11
      if (game.state.total < 21) {
        for (let i = 0; i < game.state.playerCardsNumbers.length; i++) {
          if (game.state.playerCardsNumbers[i] == 1) {
            game.state.playerCardsNumbers[i] = 11;
            break;
          }
        }
      } else {
        game.state.total -= 11;
        console.log(game.state.playerCardsNumbers);
      }
      console.log(game.state.playerCardsNumbers);
    },

    benefitAces21OrOver: (game) => {
      console.log(game.state.cards);
      console.log(game.state.playerCardsNumbers);
      console.log(game.state.playerCardsNumbers);

      console.log(game.state.playerCardsNumbers);
      // Set all aces to 11
      for (let i = 0; i < game.state.playerCardsNumbers.length; i++) {
        if (game.state.playerCardsNumbers[i] == 1) {
          game.state.playerCardsNumbers[i] = 11;
        }
      }
      console.log(game.state.playerCardsNumbers);
    },

    // Player action (void).
    guess21OrUnder: (game) => {
      /*const deck = deckConstructor();
      const dealer = dealerConstructor();*/
      game.state.deck = deck;
      game.state.dealer = dealer;
      game.benefitAces21OrUnder(game);
      game.getTotal(game);

      // Continue the game if no win or no loose
      if (game.playerWon(game) == false && game.isGameOver(game) == false) {
        game.state.cards.push(dealer.draw(deck));
      }
    },
    // Player action (void).
    guessOver21: (game) => {
      game.convertCards(game);
      game.benefitAces21OrOver(game);
      game.getTotal(game);
      const nextCard = dealer.draw(game.state.deck);
      game.state.card = nextCard;
      // game.playerWon(game);
      console.log(game.state.cards);
      console.log(game.state.playerCardsNumbers);
      console.log(game.state.card);
    },
    getState: (game) => {
      return {
        cards: game.state.cards,
        cardsValue: game.getCardsValue(game),
        card: game.state.card,
        cardValue: game.getCardValue(game),
        total: game.getTotal(game),
        gameOver: game.isGameOver(game),
        playerWon: game.playerWon(game),
      };
    },
  };
};
