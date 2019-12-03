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

  test('The player should have two cards', () => {
    // Assert
    expect(game.state.cards.length).toEqual(2);
    expect(game.state.cards[2]).toBeUndefined();
  });

  describe('Should convert the players cards', () => {

    game.convertCard(game);

    test('The first player card should be a number', () => {
      expect(game.state.playerCardsNumbers[0]).toEqual(10);
      
    });

    test('The second player card should be a number', () => {
      expect(game.state.playerCardsNumbers[1]).toEqual(9);
    });

  });

  describe('Should get total value should return the total value of the players card', () => {

    test('getTotal value should return the players cards total value', () => {
      expect(game.getTotal(game)).toEqual(19);
    });

  });

  describe('guessAbove21 should draw the final card', () => {
    // Act
    test('The sum of the player cards should be greater than 21', () => {
      //expect(game.getTotal(game)).toBeGreaterThan(21);
    });

  });

  describe('guess21OrUnder should draw the next card', () => {

    test('The sum of the player cards should be less than or equal to 21', () => {
      expect(game.getTotal(game)).toBeLessThanOrEqual(21);
    });

    // Act
    game.guess21OrUnder(game);

    test('isGameOver should return false if the sum of the players cards is lower than or equal to 21', () => {
      expect(game.isGameOver(game)).toEqual(false);
    });
  });



});