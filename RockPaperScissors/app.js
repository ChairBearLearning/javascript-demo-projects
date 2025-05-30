const game = function() {
    let pScore = 0;
    let cScore = 0;

    //Start Game
    const startGame = function() {
        const playBtn = document.querySelector(".intro button");
        const introScreen = document.querySelector(".intro");
        const match = document.querySelector(".match");

        playBtn.addEventListener("click", function(){
            introScreen.classList.add("fadeOut");
            match.classList.add("fadeIn");
        });
    };

    //Match 
    const play = function() {
        const options = document.querySelectorAll(".options button");
        const playerHand = document.querySelector(".playerHand");
        const computerHand = document.querySelector(".computerHand");
        const hands = document.querySelectorAll(".hands img");

        hands.forEach(
            function(hand) {
                hand.addEventListener("animationend", function(){
                    this.style.animation = "";
                });
            });

         //Computer Options
         const computerOptions = ["Rock","Paper","Scissors"];

         options.forEach(
             function(option){
                 option.addEventListener("click", function(){
                     //The computer's choice
                     const computerNum = Math.floor(Math.random()* 3);
                     const computerChoice = computerOptions[computerNum];

                   //debugging
                    console.log(this.textContent);
                    //

                     setTimeout(() => {
                               //debugging
                                console.log(this.textContent);
                                //
                             //Call compare hands method
                             compareHands(this.textContent, computerChoice);

                             //Update images for what was chosen
                            
                             computerHand.src = `assets/${computerChoice}.png`;
                             playerHand.src = `assets/${this.textContent}.png`;
                         }, 2000);

                     //Active Animation
                     playerHand.style.animation = "shakePlayer 2s ease";
                     computerHand.style.animation = "shakeComputer 2s ease";
                 });
             });
    };

    //Change score to match
    const updateScore = function() {
        const playerScore = document.querySelector(".playerscore p");
        const computerScore = document.querySelector(".computerscore p");
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;
    };

    //Game logic 
    const compareHands = function (playerChoice, compChoice){
        //Select "winner" banner to update text with match outcome
        const outcomeBanner = document.querySelector(".winner");

        //Check for tie
        if (playerChoice === compChoice) {
            outcomeBanner.textContent = "Tie!";
            return;
        }

        //Check for rock
        if (playerChoice === "Rock") {
            if (compChoice == "Scissors") {
                outcomeBanner.textContent = "You Win!";
                pScore++;
                updateScore();
                return;
            } else {
                outcomeBanner.textContent = "Computer Wins!";
                cScore++;
                updateScore();
                return;
            }
        }

        //Check for paper
        if (playerChoice === "Paper") {
            if (compChoice == "Rock") {
                outcomeBanner.textContent = "You Win!";
                pScore++;
                updateScore();
                return;
            } else {
                outcomeBanner.textContent = "Computer Wins!";
                cScore++;
                updateScore();
                return;
            }
        }

        //Check for scissors
        if (playerChoice === "Scissors") {
            if (compChoice == "Paper") {
                outcomeBanner.textContent = "You Win!";
                pScore++;
                updateScore();
                return;
            } else {
                outcomeBanner.textContent = "Computer Wins!";
                cScore++;
                updateScore();
                return;
            }
        }
    };

    //call inner functions
    startGame();
    play();
 };

 //start the game function
 game();