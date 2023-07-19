// JavaScript for Dice Game
const game = {
    playerScore: 0,
    computerScore: 0,
    round: 0,
    rollDice: function() {
        return Math.floor(Math.random() * 6) + 1;
    },
    calculateScore: function(dice1, dice2) {
        if (dice1 === 1 || dice2 === 1) {
            return 0;
        } else if (dice1 === dice2) {
            return (dice1 + dice2) * 2;
        } else {
            return dice1 + dice2;
        }
    },
    updateScores: function() {
        document.getElementById('player-score').textContent = "Player Score: " + this.playerScore;
        document.getElementById('computer-score').textContent = "Computer Score: " + this.computerScore;
        document.getElementById('round').textContent = "Round: " + this.round;
    },
    rollDiceForPlayerAndComputer: function() {
        if (this.round < 3) {
            let playerDice1, playerDice2, computerDice1, computerDice2;
            let intervalId = setInterval(() => {
                playerDice1 = this.rollDice();
                playerDice2 = this.rollDice();
                computerDice1 = this.rollDice();
                computerDice2 = this.rollDice();
    
                // Update the dice images
                document.getElementById('player-dice1').src = "images/dice" + playerDice1 + ".png";
                document.getElementById('player-dice2').src = "images/dice" + playerDice2 + ".png";
                document.getElementById('computer-dice1').src = "images/dice" + computerDice1 + ".png";
                document.getElementById('computer-dice2').src = "images/dice" + computerDice2 + ".png";
            }, 100);
    
            setTimeout(() => {
                clearInterval(intervalId);
    
                this.playerScore += this.calculateScore(playerDice1, playerDice2);
                this.computerScore += this.calculateScore(computerDice1, computerDice2);
    
                this.round++;
                this.updateScores();
    
                if (this.round === 3) {
                    document.getElementById('roll-dice').classList.add('hidden');
                    document.getElementById('reset-game').classList.remove('hidden');
    
                    setTimeout(() => {
                        let winnerMessage = "";
                        if (this.playerScore > this.computerScore) {
                            winnerMessage = "Player wins!";
                        } else if (this.computerScore > this.playerScore) {
                            winnerMessage = "Computer wins!";
                        } else {
                            winnerMessage = "It's a tie!";
                        }
                        document.getElementById('winner-message').textContent = winnerMessage;
                        document.getElementById('winner-popup').classList.remove('hidden');
                    }, 500);
                }
            }, 1000);
        }
    },
    resetGame: function() {
        this.playerScore = 0;
        this.computerScore = 0;
        this.round = 0;
    
        this.updateScores();
        document.getElementById('roll-dice').classList.remove('hidden');
        document.getElementById('winner-popup').classList.add('hidden');
    }    
};

document.getElementById('roll-dice').addEventListener('click', function() { game.rollDiceForPlayerAndComputer(); });
document.getElementById('reset-game').addEventListener('click', function() { game.resetGame(); });
document.getElementById('close-popup').addEventListener('click', function() {
    document.getElementById('winner-popup').classList.add('hidden');
});

 // Get the modal
 var modal = document.getElementById("instructions-modal");

 // Get the button that opens the modal
 var btn = document.getElementById("instructions-button");

 // Get the <span> element that closes the modal
 var span = document.getElementsByClassName("close")[0];

 // When the user clicks the button, open the modal 
 btn.onclick = function() {
     modal.style.display = "block";
 }

 // When the user clicks on <span> (x), close the modal
 span.onclick = function() {
     modal.style.display = "none";
 }

 // When the user clicks anywhere outside of the modal, close it
 window.onclick = function(event) {
     if (event.target == modal) {
         modal.style.display = "none";
     }
 }
