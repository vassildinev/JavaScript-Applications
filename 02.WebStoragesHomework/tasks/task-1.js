var _ = require('underscore');

function solve() {
    var game = (function () {
        function getRandomFourDigitNumber() {
            var firstDigit = Math.floor(Math.random() * 9) + 1,
                secondDigit = Math.floor(Math.random() * 10),
                thirdDigit = Math.floor(Math.random() * 10),
                fourthDigit = Math.floor(Math.random() * 10);

            var randomFourDigitNumber =
                firstDigit * 1000 + secondDigit * 100 + thirdDigit * 10 + fourthDigit;

            return randomFourDigitNumber;
        }

        function getSheepForCurrentGuess(guess, target) {
            var result = 0;

            var numberOfDigits = 4;
            var matches = [];
            for (var i = 0; i < numberOfDigits; i += 1) {
                var guessCurrentDigit = Math.floor((guess / Math.pow(10, 3 - i)) % 10);
                for (var j = 0; j < numberOfDigits; j += 1) {
                    var targetCurrentDigit = Math.floor((target / Math.pow(10, 3 - j)) % 10);
                    if (guessCurrentDigit === targetCurrentDigit && i != j) {
                        if (!matches[j]) {
                            result += 1;
                            matches[j] = true;
                        }
                    }
                }
            }

            return result;
        }

        function getRamsForCurrentGuess(guess, target) {
            var result = 0;

            var numberOfDigits = 4;
            for (var i = 0; i < numberOfDigits; i += 1) {
                var guessCurrentDigit = Math.floor((guess / Math.pow(10, 3 - i)) % 10);
                var targetCurrentDigit = Math.floor((target / Math.pow(10, 3 - i)) % 10);

                if (guessCurrentDigit === targetCurrentDigit) {
                    result += 1;
                }
            }

            return result;
        }

        var highScores = [];

        var game = {};
        Object.defineProperties(game, {
            init: {
                value: function (playerName, endCallback) {
                    this.playerName = playerName;
                    this.endCallback = endCallback || function() {};
                    this.number = getRandomFourDigitNumber();
                    this.numberOfGuesses = 0;
                    this.playerHasWon = false;
                    this.initialized = true;

                    return this;
                }
            },

            guess: {
                value: function (number) {
                    if (!this.initialized) {
                        throw new Error('Game must be initailized before guessing');
                    }

                    if(this.playerHasWon) {
                        throw new Error('Game has ended. Please start a new game');
                    }

                    this.numberOfGuesses += 1;

                    var sheep = getSheepForCurrentGuess(number, this.number),
                        rams = getRamsForCurrentGuess(number, this.number);

                    // player has won
                    if (rams === 4) {
                        highScores.push({
                            name: this.playerName,
                            score: this.numberOfGuesses
                        });

                        // sort by least number of guesses
                        highScores = _.sortBy(highScores, function (item) {
                            return item.score;
                        });

                        this.playerHasWon = true;
                        this.endCallback();
                        return;
                    }

                    var guessResult = {
                        sheep: sheep,
                        rams: rams
                    };

                    return guessResult;
                }
            },

            getHighScore: {
                value: function (count) {
                    var numberOfPlayersInHighScore = highScores.length;
                    if(count > numberOfPlayersInHighScore) {
                        return numberOfPlayersInHighScore;
                    }

                    var firstCountPlayersInHighScore = _.first(highScores, count);
                    return firstCountPlayersInHighScore;
                }
            }
        });

        return game;
    }());

    return game;
}

var game = solve();

game.init('Gosho');
game.guess(8235);
game.guess(8235);
game.guess(8235);
game.guess(8235);
game.guess(8235);
game.guess(8235);
game.guess(8235);
game.guess(8136);

game.init('Pesho');
game.guess(8235);
game.guess(8235);
game.guess(8136);

console.log(game.getHighScore(2));


module.exports = solve;
