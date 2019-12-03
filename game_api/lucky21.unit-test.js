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

  test('The player should have the last two cards', () => {
    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(game.state.cards[2]).toBeUndefined();
    expect(game.state.cards[0]).toEqual('10H');
    expect(game.state.cards[1]).toEqual('09S');
  });

  describe('The function convertCard should convert the players cards to numbers', () => {

    game.convertCard(game);

    test('The first player card should be a number', () => {
      expect(typeof game.state.playerCardsNumbers[0]).toBe('number');

    });

    test('The second player card should be a number', () => {
      expect(typeof game.state.playerCardsNumbers[1]).toBe('number');
    });

  });

  describe('The function getTotal should get total value should return the total value of the players card', () => {

    test('getTotal value should return the players cards total value', () => {
      game.getTotal(game);
      expect(game.state.total).toEqual(19);
    });

  });

  describe('The function guessAbove21 should draw the final card', () => {
    // Act
    test('The sum of the player cards should be greater than 21', () => {
      //expect(game.getTotal(game)).toBeGreaterThan(21);
    });

  });

  describe('The function guess21OrUnder should draw the next card', () => {

    test('The sum of the player cards should be less than or equal to 21', () => {
      game.getTotal(game);
      expect(game.state.total).toBeLessThanOrEqual(21);
    });

    // Act
    game.guess21OrUnder(game);

    test('The function isGameOver should return false if the sum of the players cards is lower than or equal to 21', () => {
      expect(game.isGameOver(game)).toEqual(false);
    });

    describe('The function guess21OrUnder should draw the next card', () => {


      describe('The function playerWon should return false if the card total is NOT equal to 21 but true if it is equal to 21', () => {

        test('The total should NOT be equal to 21, because the player has not won the game', () => {
          game = lucky21Constructor(deck, dealer);
          game.state.playerCardsNumbers[0] = 10;
          game.state.playerCardsNumbers[1] = 8;
          expect(game.state.total).not.toEqual(21);
        });

        test('The function playerWon should return false, because the player has NOT won the game', () => {
          expect(game.playerWon(game)).toBeFalsy();
        });

        test('The function getTotal should return 21 because there is a winner', () => {
          game = lucky21Constructor(deck, dealer);
          game.state.playerCardsNumbers[0] = 10;
          game.state.playerCardsNumbers[1] = 11;
          game.getTotal(game);
          expect(game.state.total).toEqual(21);
        });

        test('The function playerWon should return true, because the player has won the game', () => {
          expect(game.playerWon(game)).toBeTruthy();
        });

      });

      describe('The isGameOverFunction should return true ONLY if the card total is above 21', () => {
        var game = lucky21Constructor(deck, dealer);
        game.state.playerCardsNumbers[0] = 10;
        game.state.playerCardsNumbers[1] = 12;
        game.getTotal(game);

        test('Total should be higher than 21', () => {
          expect(game.state.total).toBeGreaterThan(21);
        });

        test('The function playerWon should be falsy, because total should be higher than 21', () => {
          expect(game.playerWon(game)).toBeFalsy();
        });
        test('The function isGameOver should be truthy, because total should be higher than 21', () => {
          expect(game.isGameOver(game)).toBeTruthy();
        });

        describe("isGameOver should return false if number is less than 21", () => {
          var game = lucky21Constructor(deck, dealer);
          game.state.playerCardsNumbers[0] = 10;
          game.state.playerCardsNumbers[1] = 9;
          game.getTotal(game);
          test('Total should be lower than 21', () => {

            expect(game.state.total).toBeLessThan(21);
          });

          test('The function isGameOver should be falsy, because total should be lower than 21', () => {
            expect(game.isGameOver(game)).toBeFalsy();
          });
        });
      });
    });
  });
});