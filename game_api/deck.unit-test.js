const deckConstructor = require('./deck.js');
const deck = deckConstructor();

test('Deck should contain 52 cards', () => {
    
    expect(deck.length).toEqual(52);
});

test('The first card in the deck should be 01H', () => {
    expect(deck[0]).toEqual('01H');
});

test('The last card in the deck should be 13S',() =>{
    expect(deck[deck.length-1]).toEqual('13S');
});

test('The first row should be hearts', () => {
    //First thirteen
    for(var i = 0; i < 13; i++)
    {
        expect(deck[i].substr(2,3)).toEqual('H');
    }
});

test('The second row should be clubs', () => {
    //First thirteen
    for(var i = 14; i < 26; i++)
    {
        expect(deck[i].substr(2,3)).toEqual('C');
    }
});

test('The third row should be Diamonds', () => {
    //First thirteen
    for(var i = 26; i < 39; i++)
    {
        expect(deck[i].substr(2,3)).toEqual('D');
    }
});

test('The fourth row should be Spades', () => {
    //First thirteen
    for(var i = 39; i < 52; i++)
    {
        expect(deck[i].substr(2,3)).toEqual('S');
    }
});

