const deckConstructor = require('./deck.js');
const dealerConstructor = require('./dealer.js');
const lucky21Constructor = require('./lucky21.js');

describe('Game API', () => {
  // Arrange
  let deck = deckConstructor();
  deck = [
    '05C', '01D', '09S', '10H',
  ];

  let dealer = dealerConstructor();
  // Override the shuffle to do nothing.
  dealer.shuffle = (deck) => { };
  // Inject our dependencies

  let game = lucky21Constructor(deck, dealer);

  //checking if player has two cards initally, the dealer should set the first two cards as the last two cards in the unshuffled deck
  test('The player should have the last two cards initally', () => {
    // Assert
    expect(game.state.cards[0]).toEqual('10H');
    expect(game.state.cards[1]).toEqual('09S');
  });

  //checking if conertCards converts a card into its number
  describe('The function convertCard should convert the players cards to numbers', () => {

    game.convertCards(game);
    let expectedPlayerCardsNumbers = [10, 9];

    test('All of the cards should be a number', () => {
      expect(game.state.playerCardsNumbers).toEqual(expect.arrayContaining(expectedPlayerCardsNumbers));
    });
  });

  //Checking if getTotal works as expected
  describe('The function getTotal should get total value should return the total value of the players card', () => {

    test('getTotal value should return the players cards total value', () => {
      //New playerCardNumbers as it's rather hard to test it if it's always changing
      game.state.playerCardsNumbers = [10, 9, 10, 5, 3];
      game.getTotal(game);
      expect(game.state.total).toEqual(37);
      //Reset total
      game.state.total = 0;
    });

  });

  describe('The function guessAbove21 should draw the final card', () => {
    // Act
    test('The sum of the player cards should be greater than 21', () => {
      //expect(game.getTotal(game)).toBeGreaterThan(21);
    });
  });

  //Testing the guess21OrUnder
  describe('The function guess21OrUnder should draw the next card', () => {

    console.log(game.state.cards);

    //Add the new card if the game is not over
    describe("The game should continue if there is no win or no gameover", () => {

      let oldLength = game.state.cards.length; //Initial length
      console.log(oldLength);

      game.guess21OrUnder(game);

      //Tests for continue
      test('guess21OrUnder should add a new card in game.state.cards', () => {
        expect(game.state.cards.length).toBeGreaterThan(oldLength);
      });

      test('playerWon should be false as there should not be any win', () => {
        expect(game.playerWon(game)).toBeFalsy();
      });

      test('isGameOver should be false as there should not be any win or game over', () => {

        expect(game.isGameOver(game)).toBeFalsy();
      });

      //Tests for continue - end

      //Tests for playerWon
      //Simulate a win for guess21OrUnder function
      let gameWin = lucky21Constructor(deck, dealer);
      gameWin.state.cards = ['10S', '03D', '08H'];
      let old = game.state.cards.length; //Initial length
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

    //Testing gameOver from guess21OrUnder (if guess is 21 or under)
    describe("guess21OrUnder should produce a game over if total is over 21", () => {

      //Prevent collisions - mocking the cards array
      let gameGameOver = lucky21Constructor(deck, dealer);
      gameGameOver.state.cards = ['10S', '10D', '10H'];

      gameGameOver.guess21OrUnder(gameGameOver);

      test('isGameOver should return true (guess21OrUnder)', () => {
        expect(gameGameOver.isGameOver(gameGameOver)).toBeTruthy();
      });
    });

    //Testing the guess21OrUnder - end

    //Testing the playerWon function
    describe('The function playerWon should return false if the card total is NOT equal to 21 but true if it is equal to 21', () => {
      game.getTotal(game);
      test('The total should NOT be equal to 21, because the player has not won the game', () => {
        expect(game.state.total).not.toEqual(21);
      });

      test('The function playerWon should return false, because the player has NOT won the game', () => {
        expect(game.playerWon(game)).toBeFalsy();
      });

      describe('The function playerWon should return true if the card total is equal to 21 but false if it is NOT equal to 21', () => {
        //Simulating a win (under 21)
        deck.push('19S');
        deck.push('2S');
        let game = lucky21Constructor(deck, dealer);

        game.convertCards(game);
        game.getTotal(game);

        test('The function getTotal should return 21 because there is a winner', () => {
          expect(game.state.total).toEqual(21);
        });

        test('The function playerWon should return true, because the player has won the game', () => {
          expect(game.playerWon(game)).toBeTruthy();
        });

      });

      //Testing the isGameOver function
      describe('The isGameOver function should return true ONLY if the card total is above 21', () => {
        //Simulating a game over (under 21)
        deck.push('21S');
        deck.push('11S');
        let game = lucky21Constructor(deck, dealer);//Preventing a mess up
        game.convertCards(game);
        game.getTotal(game);

        //Testing game over
        test('Total should be higher than 21', () => {
          expect(game.state.total).toBeGreaterThan(21);
        });

        test('The function playerWon should be falsy, because total should be higher than 21', () => {
          expect(game.playerWon(game)).toBeFalsy();
        });
        test('The function isGameOver should be truthy, because total should be higher than 21', () => {
          expect(game.isGameOver(game)).toBeTruthy();
        });
        //Card is NOT undefined if game over
        /*test('card in gamestate should be undefined', () => {

          expect(game.state.card).not.toEqual(undefined);
        });*/


        //Testing when it's not game over
        describe("isGameOver should return false if number is less than 21", () => {
          //Simulating not game over
          deck.push('1S');
          deck.push('11S');
          var game = lucky21Constructor(deck, dealer);//Preventing mess up
          game.convertCards(game);
          game.getTotal(game);

          test('Total should be lower than 21', () => {

            expect(game.state.total).toBeLessThan(21);
          });

          //Card is undefined if NOT game over
          test('card in gamestate should be undefined', () => {

            expect(game.state.card).toEqual(undefined);
          });

          test('The function isGameOver should be falsy, because total should be lower than 21', () => {
            expect(game.isGameOver(game)).toBeFalsy();
          });
          //Testing game over - end
        });
      });
    });
  });
});