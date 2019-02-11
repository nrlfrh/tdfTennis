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
        scoring(2,0);
        tennisGame.playerScore(1);
        expect(tennisGame.playerOneScore).to.equal(3);
    })
    it('Player two scores', () =>{
        scoring(0,3);
        tennisGame.playerScore(2);
        expect(tennisGame.playerTwoScore).to.equal(4);
    })
})

describe('Leading player has the highest score', () => {
    it('player one leads the game', () => {
        scoring(4, 2);
        expect(tennisGame.leadScorePlayer()).to.equal('Amy');
    });
    it('player two leads the game', () => {
        scoring(3, 4);
        expect(tennisGame.leadScorePlayer()).to.equal('Ashton');        
    });
});

describe('Check for deuce', () => {
    it('same score but too low for deuce', () => {
        scoring(2, 2);
        expect(tennisGame.deuce()).to.equal(false);
    });
    it('same score and minimum for deuce', () => {
        scoring(3, 3);
        expect(tennisGame.deuce()).to.equal(true);
    });
    it('same score and greater than minimum for deuce', () => {
        scoring(6, 6);
        expect(tennisGame.deuce()).to.equal(true);
    });
    it('different scores', () => {
        scoring(2, 3);
        expect(tennisGame.deuce()).to.equal(false);
    });
});

describe('End of the match', () => {
    it('player one wins', () => {
        scoring(5, 3);
        expect(tennisGame.gameOver()).to.equal(true);        
    });
    it('player two wins', () => {
        scoring(2, 4);
        expect(tennisGame.gameOver()).to.equal(true);        
    });
    it('game is not over', () => {
        scoring(2, 3);
        expect(tennisGame.gameOver()).to.equal(false);   
    });
});

describe('Advantage of one player over the other one', () => {
    it('same score does not allow advantage', () => {
        scoring(4, 4);
        expect(tennisGame.hasAdvantage()).to.equal(false);
    });
    it('one player in advantage of one point but the other score is too low', () => {
        scoring(3, 2);
        expect(tennisGame.hasAdvantage()).to.equal(false);
    });
    it('one player in advantage of one point and the scores are enough for advantage', () => {
        scoring(4, 3);
        expect(tennisGame.hasAdvantage()).to.equal(true);
    });
    it('one player in advantage of more than one point', () => {
        scoring(5, 3);
        expect(tennisGame.hasAdvantage()).to.equal(false);
    });
});

describe('Print score string', () => {
    it('0 - 15 is love - fifteen', () => {
        scoring(0, 1);
        expect(tennisGame.getScore()).to.equal('Score is love - fifteen');
    });
    it('40 - 30 is forty - thirty', () => {
        scoring(3, 2);
        expect(tennisGame.getScore()).to.equal('Score is forty - thirty');
    });
    it('40 - 40 is deuce', () => {
        scoring(3, 3);
        expect(tennisGame.getScore()).to.equal('Deuce');
    });
    it('player two has the advantage', () => {
        scoring(4, 5);
        expect(tennisGame.getScore()).to.equal('Ashton has the advantage');
    });
    it('player one wins the game', () => {
        scoring(4, 2);
        expect(tennisGame.getScore()).to.equal('Amy wins the game');
    });
});