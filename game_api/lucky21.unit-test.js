const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');
const randomConstructor = require('./random.js');

const newGame = (deck) => {
  const random = randomConstructor();
  const dealerDependencies = {
    'random': (context) => random,
  };
  const dealer = dealerConstructor((name) => dealerDependencies[name]);
  dealer.shuffle = (deck) => { };

  const dependencies = {
    'deck': () => deck || deckConstructor(),
    'dealer': () => dealer,
  };
  return lucky21Constructor((name) => dependencies[name]);
};

describe('game - context construction', () => {
  test('should construct a new game', () => {
    const context = require('./context.js').newContext();

    const gameConstructor = context('lucky21');

    const game = gameConstructor(context);

    expect(game).not.toEqual(50);
  });
});

const game = newGame(['09S', '10H']);
// checking if player has two cards initally,
// the dealer should set the first two cards as the last two cards in the unshuffled deck
test('The player should have the last two cards initally', () => {
  console.log(game.state);
  expect(game.state.cards[0]).toEqual('10H');
  expect(game.state.cards[1]).toEqual('09S');
});

test('The function getCards should return the correct cards', () => {
  expect(game.getCards(game)).toEqual(game.state.cards);
});

test('The function getCardsValue should be less than or equal 21', () => {
  expect(game.getCardsValue(game)).not.toBeGreaterThanOrEqual(21);
});

test('The function convertCard should convert the player card to a number', () => {
  expect(game.convertCard('8S')).toEqual(8);
});

test('The function getCardValue should get be undefined as there is no player card', () => {
  expect(game.getCardValue(game)).not.toBeDefined();
});

// checking if conertCards converts the cards into its number
describe('The function convertCards should convert the players cards to numbers', () => {
  const convertgame = newGame(['09S', '10H']);
  convertgame.convertCards(convertgame);

  test('All of the cards should be a number', () => {
    expect(convertgame.state.playerCardsNumbers).toEqual([10, 9]);
  });
});

test('The Jack, Queen and King should worth 10 points each', () => {
  ;
  game.state.cards = ['8S', '11D', '12H', '13D'];
  game.convertCards(game);
  game.getTotal(game);

  expect(game.state.total).toEqual(38);
});

// Checking if getTotal works as expected
describe('The function getTotal should get total value should return the total value of the players card', () => {
  test('getTotal value should return the players cards total value', () => {
    // New playerCardNumbers as it's rather hard to test it if it's always changing
    game.state.cards = ['10S', '9D', '10C', '5S', '3D'];
    game.getTotal(game);
    console.log(game.state.card);
    expect(game.state.total).toEqual(37);
    // Reset total
    game.state.total = 0;
  });
});

describe('The function guessOver21 should draw the final card', () => {
  const gameOver21CheckAces = newGame(['1S', '5S', '1D']);
  gameOver21CheckAces.state.cards.push('1D');
  test('card should be defined', () => {
    gameOver21CheckAces.guessOver21(gameOver21CheckAces);
    expect(gameOver21CheckAces.state.card).toBeDefined();
  });

  test('aces should be only be 11 in game.state.playerCardsNumbers', () => {
    expect(gameOver21CheckAces.state.playerCardsNumbers.sort()).toEqual([11, 5, 11].sort());
  });

  describe('isGameOver should be true if less than or equal 21', () => {
    const gameOver21 = newGame(['03D', '08H']);
    gameOver21.state.cards.push('10D');

    gameOver21.guessOver21(gameOver21);
    const cardState = gameOver21.state.card;

    test('The function getCardValue should get be the players card as a number as there is a player card', () => {
      gameOver21.state.card = '5S';
      console.log(gameOver21.state);
      expect(gameOver21.getCardValue(gameOver21)).toEqual(5);
    });
    gameOver21.state.card = cardState;

    test('card should be defined and should be a string', () => {
      expect(gameOver21.state.card).toBeDefined();
      expect(typeof gameOver21.state.card).toEqual('string');
    });

    test('isGameOver should be true if card is defined', () => {
      const gameOver21CheckDefinedGameOver = newGame(['08D', '8H', '5S']);

      gameOver21CheckDefinedGameOver.guessOver21(gameOver21CheckDefinedGameOver);
      console.log(gameOver21CheckDefinedGameOver.state.card);
      expect(gameOver21CheckDefinedGameOver.state.card).toBeDefined();
    });

    test('isGameOver should be true if total cards are 21', () => {
      const gameOver21CheckGameOver = newGame(['08D', '8H']);
      gameOver21CheckGameOver.state.cards.push('5S');

      console.log(gameOver21CheckGameOver.state.playerCardsNumbers);
      gameOver21CheckGameOver.guessOver21(gameOver21CheckGameOver);

      expect(gameOver21CheckGameOver.state.total).toEqual(21);
    });


    test('card should be defined and should be a string', () => {
      expect(gameOver21.state.card).toBeDefined();
      expect(typeof gameOver21.state.card).toEqual('string');
    });

    test('getCard should return the card', () => {
      const gameCheckgetCard = newGame(['03D', '08H']);
      expect(gameCheckgetCard.getCard(gameCheckgetCard)).toEqual(gameCheckgetCard.state.card);
    });

    // Testing less than 21
    test('isGameOver should be true if total cards are less than 21 and card is defined', () => {
      const gameOver21Less = newGame(['10S', '03D', '07H']);
      gameOver21Less.guessOver21(gameOver21Less);
      expect(gameOver21Less.state.total).toBeLessThan(21);
      expect(gameOver21Less.isGameOver(gameOver21Less)).toBeTruthy();
      expect(gameOver21Less.state.card).toBeDefined();
    });
  });

  describe('playerWon should be true if over 21', () => {
    const gameWin21 = newGame(['9D', '10H', '10S']);
    gameWin21.state.cards.push('9D');
    console.log(gameWin21.state.cards);

    gameWin21.guessOver21(gameWin21);
    console.log(gameWin21.state.total);

    test('getCardValue should return the card', () => {
      expect(gameWin21.getCard(gameWin21)).toEqual(gameWin21.state.card);
    });

    test('playerWon should be true if card is defined', () => {
      // gameWin21.guessOver21(gameWin21);
      expect(gameWin21.state.card).toBeDefined();
      // const gameWin21Truth = newGame(['10S', '9D']);


      console.log(gameWin21.state.total);
      console.log(game.state.card);
      expect(gameWin21.playerWon(gameWin21)).toBeTruthy();
    });
  });
});

// Testing the guess21OrUnder
describe('The function guess21OrUnder should draw the next card', () => {
  // Act

  const gameUnder21CheckAces = newGame(['5S', '1D']);
  gameUnder21CheckAces.state.cards.push('1H');
  gameUnder21CheckAces.benefitAces21OrUnder(gameUnder21CheckAces);
  gameUnder21CheckAces.guess21OrUnder(gameUnder21CheckAces);

  test('card should be undefined', () => {
    expect(gameUnder21CheckAces.state.card).not.toBeDefined();
  });

  describe('An Ace is worth 1 or 11 points depending on which is most beneficial to the player' +
    '(under21Selected)', () => {
      test('One ace should change to 11 if total + 11 is less than 21', () => {
        expect(gameUnder21CheckAces.state.total).toEqual(17);
      });

      const gameUnder21CheckAcesOver21 = newGame(['10S', '1S']);

      gameUnder21CheckAcesOver21.state.cards.push('10S');
      gameUnder21CheckAcesOver21.state.cards.push('10D');
      gameUnder21CheckAcesOver21.state.cards.push('1D');

      gameUnder21CheckAcesOver21.guess21OrUnder(gameUnder21CheckAcesOver21);

      test('Total should stay the same if total + 11 is greater than 21', () => {
        expect(gameUnder21CheckAcesOver21.state.total).toEqual(32);
      });

      test('game.state.playerCardsNumbers should not contain 11 if total 11 is greater than 21', () => {
        expect(gameUnder21CheckAcesOver21.state.playerCardsNumbers.sort()).toEqual([10, 1, 10, 10, 1].sort());
      });
    });

  test('getCardValue should return the card', () => {
    const cardvalueGame = newGame(['09S', '10H']);
    expect(cardvalueGame.getCard(cardvalueGame)).not.toBeDefined();
  });

  // Add the new card if the game is not over
  describe('The game should continue if there is no win or no gameover', () => {
    const gameContinue = newGame(['10S', '03D', '05H']);
    const oldLength = gameContinue.state.cards.length; // Initial length
    console.log(oldLength);

    gameContinue.guess21OrUnder(gameContinue);

    // Tests for continue
    test('guess21OrUnder should add a new card in game', () => {
      expect(gameContinue.state.cards.length).toBeGreaterThan(oldLength);
    });

    test('playerWon should be false as there should not be any win', () => {
      expect(gameContinue.playerWon(gameContinue)).toBeFalsy();
    });

    test('isGameOver should be false as there should not be any win or game over', () => {
      expect(gameContinue.isGameOver(gameContinue)).toBeFalsy();
    });
    // Tests for continue - end

    // Tests for playerWon
    // Simulate a win for guess21OrUnder function
    const gameWin = newGame(['10S', '03D']);
    gameWin.state.cards.push('08H');
    const old = gameWin.state.cards.length; // Initial length
    gameWin.guess21OrUnder(gameWin);

    test('isGameOver should be false as there should be win', () => {
      expect(gameWin.isGameOver(gameWin)).toBeFalsy();
    });
    test('playerWon should be true as there should be win', () => {
      expect(gameWin.playerWon(gameWin)).toBeTruthy();
    });

    test('guess21OrUnder should not add a new card in game.state.cards', () => {
      expect(gameWin.state.cards.length).toEqual(old);
    });
  });

  // Testing gameOver from guess21OrUnder (if guess is 21 or under)
  describe('guess21OrUnder should produce a game over if total is over 21', () => {
    const gameGameOver = newGame(['10D', '10H']);
    gameGameOver.state.cards.push('10S');

    gameGameOver.guess21OrUnder(gameGameOver);

    test('isGameOver should return true (guess21OrUnder)', () => {
      expect(gameGameOver.isGameOver(gameGameOver)).toBeTruthy();
    });
  });
  // Testing the guess21OrUnder - end

  // Testing the playerWon function
  describe('The function playerWon should return false if the card total is NOT equal to 21' +
    'but true if it is equal to 21', () => {
      const gameplayerWon = newGame(['10S', '03D', '05H']);
      gameplayerWon.convertCards(gameplayerWon);
      gameplayerWon.getTotal(gameplayerWon);
      test('The total should NOT be equal to 21, because the player has not won the game', () => {
        expect(gameplayerWon.state.total).not.toEqual(21);
      });

      test('The function playerWon should return false, because the player has NOT won the game', () => {
        expect(gameplayerWon.playerWon(gameplayerWon)).toBeFalsy();
      });

      describe('The function playerWon should return true if the card total is equal to 21' +
        'but false if it is NOT equal to 21', () => {
          const gameplayerWon = newGame(['10S', '2S', '9C']);
          gameplayerWon.state.cards.push('10S');

          gameplayerWon.getTotal(gameplayerWon);

          test('The function getTotal should return 21 because there is a winner', () => {
            expect(gameplayerWon.state.total).toEqual(21);
          });

          test('The function playerWon should return true, because the player has won the game', () => {
            expect(gameplayerWon.playerWon(gameplayerWon)).toBeTruthy();
          });
        });

      // Testing the isGameOver function
      describe('The isGameOver function should return true ONLY if the card total is above 21', () => {
        const game = newGame(['10S', '03D', '05H', '10S', '11S']);
        game.state.cards.push('05H');
        game.state.cards.push('03D');
        game.state.cards.push('10S');
        game.getTotal(game);

        // Testing game over
        test('Total should be higher than 21', () => {
          expect(game.state.total).toBeGreaterThan(21);
        });

        test('The function playerWon should be falsy, because total should be higher than 21', () => {
          expect(game.playerWon(game)).toBeFalsy();
        });
        test('The function isGameOver should be truthy, because total should be higher than 21', () => {
          expect(game.isGameOver(game)).toBeTruthy();
        });
        // Card is NOT undefined if game over
        test('card in gamestate should be undefined', () => {
          expect(game.state.card).not.toBeDefined();
        });
      });

      // Testing when it's not game over
      describe('isGameOver should return false if number is less than 21', () => {
        // Simulating not game over
        const gameLess = newGame(['10S', '9D', '1H']);
        gameLess.convertCards(game);
        gameLess.getTotal(game);

        test('Total should be lower than 21', () => {
          expect(gameLess.state.total).toBeLessThan(21);
        });

        // Card is undefined if NOT game over
        test('card in gamestate should be undefined', () => {
          expect(gameLess.state.card).toEqual(undefined);
        });

        test('The function isGameOver should be falsy, because total should be lower than 21', () => {
          expect(gameLess.isGameOver(gameLess)).toBeFalsy();
        });
        // Testing game over - end
      });
    });
});
