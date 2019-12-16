const helper = require('./server.lib-test.js');

const timeout = 30000;

// The done parameter is a callback to check if the game is over.
// It takes the done function and checks if it produces
// an error when it reaches the playGame function.
// This test provides the done parameter and finally when done()
// is called it passes, otherwise it does not pass and times out.
// The done function never runs unless its game over.
// It just says, I'am done, you can continue.
// Jest expects that, if done() is never called, that the test fails.
test('play a game', function(done) {
  helper.playGame(process.env.API_URL, done);
}, timeout);
