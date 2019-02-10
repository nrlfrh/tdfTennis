class tennis {
  constructor(playerOne, playerTwo) {
    this.playerOneName = playerOne;
    this.playerTwoName = playerTwo;
    this.playerOneScore = 0;
    this.playerTwoScore = 0;
    this.scoreNames = ["Love", "Fifteen", "Thirty", "Forty"];
  }

  //assign the player and scores
  playerScore(playerNumber) {
    if (playerNumber !== 1 && playerNumber !== 2) {
      return `Choose a player number: 1 or 2`;
    }
    if (playerNumber === 1) {
      this.playerOneScore++;
    } else {
      this.playerTwoScore++;
    }
  }

  // deuce (check if both players score 40)
  deuce() {
    if (this.playerOneScore === this.playerTwoScore >= 3) {
      return true;
    }
    return false;
  }

  //check if the player is in advantage
  hasAdvantage() {
    if (
      this.playerOneScore >= 3 &&
      this.playerTwoScore >= 3 &&
      Math.abs(this.playerOneScore - this.playerTwoScore) === 1
    ) {
      return true;
    }
    return false;
  }

  //game is over
  //player scored 4 or more and 2 more points than the opponent
  gameOver() {
    if (
      (this.playerOneScore >= 4 || this.playerTwoScore >= 4) &&
      Math.abs(this.playerOneScore - this.playerTwoScore) >= 2
    ) {
      return true;
    }
    return false;
  }

  // highest scoring player
  leadScorePlayer() {
    if (this.playerOneScore > this.playerTwoScore) {
      return this.playerOneName;
    } else {
      return this.playerTwoName;
    }
  }
  //Scoring system
  getScore() {
    if (this.gameOver()) {
      return `${this.leadScorePlayer()} wins the game`;
    }
    if (this.deuce()) {
      return `Deuce`;
    }
    if (this.hasAdvantage()) {
        return `${this.leadScorePlayer()} has an advantage`;
    }
    return `The score is ${this.getScore[this.playerOneScore]} - ${this.getScore[this.playerTwoScore]}`;
  }
}

module.exports = tennis;