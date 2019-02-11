const expect = require('chai').expect;
const tennis = require('../tennis');

let tennisGame = new tennis('Amy','Ashton');

describe('Player names are correct', () =>{
    it('name of player one is Amy', () => {
        expect(tennisGame.playerOneName).to.equal('Amy');
    });
    it('name of player two is Ashton', () => {
        expect(tennisGame.playerTwoName).to.equal('Ashton');
    });
})

function scoring(playerOneScore, playerTwoScore){
    tennisGame.playerOneScore = playerOneScore;
    tennisGame.playerTwoScore = playerTwoScore;
}

describe('Player score increases', () =>{
    it('Player one scores', () =>{
        updateScore(2,0);
        tennisGame.playerScore(1);
        expect(tennisGame.playerOneScore).to.equal(3);
    })
    it('Player two scores', () =>{
        updateScore(0,3);
        tennisGame.playerScore(2);
        expect(tennisGame.playerTwoScore).to.equal(4);
    })
})

describe('Check for deuce', () => {
    it('same score but too low for deuce', () => {
        updateScore(2, 2);
        expect(tennisGame.deuce()).to.equal(false);
    });
    it('same score and minimum for deuce', () => {
        updateScore(3, 3);
        expect(tennisGame.deuce()).to.equal(true);
    });
    it('same score and greater than minimum for deuce', () => {
        updateScore(6, 6);
        expect(tennisGame.deuce()).to.equal(true);
    });
    it('different scores', () => {
        updateScore(2, 3);
        expect(tennisGame.deuce()).to.equal(false);
    });
});

describe('End of the match', () => {
    it('player one wins', () => {
        updateScore(5, 3);
        expect(tennisGame.gameOver()).to.equal(true);        
    });
    it('player two wins', () => {
        updateScore(2, 4);
        expect(tennisGame.gameOver()).to.equal(true);        
    });
    it('game is not over', () => {
        updateScore(2, 3);
        expect(tennisGame.gameOver()).to.equal(false);   
    });
});

describe('Print score string', () => {
    it('0 - 15 is love - fifteen', () => {
        updateScore(0, 1);
        expect(tennisGame.getScore()).to.equal('Score is love - fifteen');
    });
    it('40 - 30 is forty - thirty', () => {
        updateScore(3, 2);
        expect(tennisGame.getScore()).to.equal('Score is forty - thirty');
    });
    it('40 - 40 is deuce', () => {
        updateScore(3, 3);
        expect(tennisGame.getScore()).to.equal('Deuce');
    });
    it('player two has the advantage', () => {
        updateScore(4, 5);
        expect(tennisGame.getScore()).to.equal('Ashton has the advantage');
    });
    it('player one wins the game', () => {
        updateScore(4, 2);
        expect(tennisGame.getScore()).to.equal('Amy wins the game');
    });
});