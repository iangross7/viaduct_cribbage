import Card from './card.js'
import Deck from './deck.js';
import Hand from './hand.js';
import Bot from './bot.js';
import Score from './score.js';
import Peg from './peg.js';

export default class GameState {
    static START = "start";
    static CRIBBING = "cribbing";
    static PEGGING = "pegging";
    static SCORING = "scoring";
    static ROUNDOVER = "roundover";
    static GAMEOVER = "gameover";

    constructor({deck = new Deck(), humanHand = new Hand(), aiHand = new Hand(), cribHand = new Hand(), 
        cutCard = new Card('Back', 'S', 0), peggingHand = new Hand(), pegScore = 0, goStop = false,
        playerScore = 0, aiScore = 0, humanCrib = true, currentState = GameState.START, gameFlowing = true} = {}) {

        this.deck = deck; // deck object

        this.humanHand = humanHand; // hands keeping track of crib, ai, and human cards
        this.aiHand = aiHand;
        this.cribHand = cribHand;

        this.pegScore = pegScore; // pegging infromation
        this.peggingHand = peggingHand;

        this.cutCard = cutCard; // cut card object

        this.playerScore = playerScore; // score information
        this.aiScore = aiScore;

        this.humanCrib = humanCrib; // true if user crib, false if ai crib

        this.currentState = currentState; // state of the game
        this.gameFlowing = gameFlowing; // true for go, false for stopped
        this.goStop = goStop; // true for go because of human, false for noGoStop (ai's go)

        if (currentState === GameState.START) this.startGame();
    }

    // Begins Game 
    startGame() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.newDeal(this.humanCrib);
    }

    // Reshuffles deck, clears old hands, grants players new cards
    newDeal(humanCrib) {
        this.deck.shuffle();
        this.aiHand.clearHand();
        this.humanHand.clearHand();
        this.cribHand.clearHand();
        this.peggingHand.clearHand();
        this.pegScore = 0;

        this.cutCard = new Card('Back', 'S', 0);

        if (humanCrib) {
            for (let i = 0; i < 6; i++) {
                this.aiHand.addCard(this.deck.dealCard());
                this.humanHand.addCard(this.deck.dealCard());
            }
        }
        else {
            for (let i = 0; i < 6; i++) {
                this.humanHand.addCard(this.deck.dealCard());
                this.aiHand.addCard(this.deck.dealCard());
            }
        }

        this.currentState = GameState.CRIBBING;
    }

    // Cut mechanic
    cut() {
        this.cutCard = this.deck.dealCard();
        if (this.cutCard.symbol === "J") {
            if (this.humanCrib) this.increasePlayerScore(2);
            else this.increaseAIScore(2);
        }
    }

    // Handles when a card is played
    humanPlayCard(cardID) {
        // If game is not not at a pause
        if (this.gameFlowing) {

            // Cribbing State
            if (this.currentState === GameState.CRIBBING) {
                let playedCard = this.humanHand.fullPlayCard(cardID);
                if (this.cribHand.cards.length < 2) this.cribHand.addCard(playedCard);
                this.peggingHand.addCard(playedCard);
                if (this.cribHand.cards.length === 2) {
                    const discardCards = Bot.botCribDiscard(this.aiHand);
                    discardCards.forEach(element => {
                        this.cribHand.addCard(this.aiHand.fullPlayCard(element));
                    });
                    this.gameFlowing = false;
                }
            }
            // Pegging State 
            else if (this.currentState === GameState.PEGGING) {
                // If the played card is legally able to be played
                if (Peg.canCardBePlayed(this.humanHand.findCardByID(cardID), this.pegScore)) {
                    // Play it and update values accordingly
                    const playedCard = this.humanHand.playCard(cardID);
                    this.increasePlayerScore(Peg.pegPoints(playedCard, this.peggingHand, this.pegScore))
                    this.peggingHand.addCard(playedCard);
                    this.pegScore += playedCard.value;  

                    // If the bot can peg back, it shall
                    if (this.canBotPeg()) {
                        this.botPeg();
                        // And it will continue pegging while it can and the human can't per cribbage rules
                        if (!this.canHumanPeg()) {
                            while (this.canBotPeg()) {
                                this.botPeg();
                            }
                            // And that would be a go in favor of the bot
                            this.gameFlowing = false;
                            this.goStop = true;
                        }
                    }
                    // If it can't peg back, it's now a go for the human if the human also can't play
                    else {
                        if (!this.canHumanPeg()) this.gameFlowing = false;
                    }
                    if (this.currentState === GameState.GAMEOVER) this.gameFlowing = false;
                }
            }
        }
    }

    continue() {
        this.gameFlowing = true; // continues the game

        // Crib continue into pegging
        if (this.currentState === GameState.CRIBBING) {
            this.peggingHand.clearHand();
            this.currentState = GameState.PEGGING;
            this.cut();
            if (this.humanCrib) {
                this.botPeg();
            }
            if (this.currentState === GameState.GAMEOVER) this.gameFlowing = false;
        }

        // Peg continue
        else if (this.currentState === GameState.PEGGING) {
            // Reset the pegging hand for a clear go
            this.peggingHand.clearHand();
            this.pegScore = 0;
            // If no cards are left to be pegged, pegging concludes
            if (!(this.canHumanPeg()) && !(this.canBotPeg())) {
                if (this.goStop) this.increaseAIScore(1);
                else this.increasePlayerScore(1);
                this.gameFlowing = false;
                this.goStop = false;
                if (this.currentState !== GameState.GAMEOVER) this.currentState = GameState.SCORING;
                return;
            }
            // If it was a go because of the human, it's a point for the bot and human now plays
            if (this.goStop) {
                this.increaseAIScore(1);
                this.goStop = false;
                if (!(this.canHumanPeg())) {
                    while (this.canBotPeg()) {
                        this.botPeg();
                    }
                    if (!(this.canHumanPeg()) && !(this.canBotPeg())) {
                        this.goStop = true;
                        this.gameFlowing = false;
                    }
                }
            } 
            // Otherwise, a go for the human and the bot shall play next
            else {
                this.increasePlayerScore(1);
                this.botPeg(); // i think this gets null caught @botPeg()
                if (!this.canHumanPeg()) {
                    while (this.canBotPeg()) {
                        this.botPeg();
                    }
                    if (!(this.canHumanPeg()) && !(this.canBotPeg())) {
                        this.goStop = true;
                        this.gameFlowing = false;
                    }
                }
                if (this.currentState === GameState.GAMEOVER) {
                    this.gameFlowing = false;
                }
            }
            if (this.currentState === GameState.GAMEOVER) this.gameFlowing = false;
        }

        // Scoring Continue
        else if (this.currentState === GameState.SCORING) {
            // When nobody has cards on screen, the opposite of crib should count first
            if (this.aiHand.cards.length === 0 && this.humanHand.cards.length === 0) {
                if (this.humanCrib) {
                    this.aiHand.cards = this.aiHand.cardsHidden;
                }
                else {
                    this.humanHand.cards = this.humanHand.cardsHidden;
                }
            }
            // Somebody has cards on screen, now we figure out whose it is, count it, and display the next hand
            else if (this.aiHand.cards.length !== 0 && !this.isCribCounting()) {
                const fullHand = new Hand({...this.aiHand});
                fullHand.addCard(this.cutCard);
                this.increaseAIScore(Score.handScore(fullHand) + Score.calculateKnobsPoints(this.aiHand, this.cutCard));
                this.aiHand.clearHand();
                this.humanHand.cards = this.humanHand.cardsHidden;
            }
            else if (!this.isCribCounting()) {
                const fullHand = new Hand({...this.humanHand});
                fullHand.addCard(this.cutCard);
                this.increasePlayerScore(Score.handScore(fullHand) + Score.calculateKnobsPoints(this.humanHand, this.cutCard));
                this.humanHand.clearHand();
                this.aiHand.cards = this.aiHand.cardsHidden;
            }
            // Once both hidden cards have been cleared due to clearHand(), we're now on the crib.
            if (this.isCribCounting()) {
                // If their hidden cards are gone, and they have cards, we count the crib (2nd pass)
                if (this.humanHand.cards.length !== 0 || this.aiHand.cards.length !== 0) {
                    if (this.humanCrib) {
                        const fullHand = new Hand({...this.humanHand});
                        fullHand.addCard(this.cutCard);
                        this.increasePlayerScore(Score.handScore(fullHand) + Score.calculateKnobsPoints(this.humanHand, this.cutCard));
                        this.humanHand.clearHand();
                    }
                    else {
                        const fullHand = new Hand({...this.aiHand});
                        fullHand.addCard(this.cutCard);
                        this.increaseAIScore(Score.handScore(fullHand) + Score.calculateKnobsPoints(this.aiHand, this.cutCard));
                        this.aiHand.clearHand();
                    }
                    // All counting has completed, we now move into a new round
                    if (this.currentState !== GameState.GAMEOVER) this.currentState = GameState.ROUNDOVER;
                }
                // Display the crib cards (1st pass)
                else {
                    if (this.humanCrib) {
                        this.humanHand.cards = this.cribHand.cards;
                    }
                    else {
                        this.aiHand.cards = this.cribHand.cards;
                    }
                } 
            }
            this.gameFlowing = false;
        }

        // If the round has ended, begin a new one with the correct crib
        else if (this.currentState === GameState.ROUNDOVER) {
            if (this.gameFlowing) {
                this.humanCrib = !this.humanCrib;
                this.newDeal(this.humanCrib);
            }
        }

        // If the game has concluded, and the continue button has been pressed, begin a new game
        else if (this.currentState === GameState.GAMEOVER) {
            if (this.playerScore > this.aiScore) this.humanCrib = false;
            else this.humanCrib = true; // loser gets crib on next start of game
            this.startGame();
        }
    }

    // Increases the player's score by the specified amount and checks for gameover
    increasePlayerScore(amount) {
        this.playerScore += amount;
        if (this.playerScore >= 121) this.currentState = GameState.GAMEOVER;
    }

    // Increases the AI's score by the specified amount and checks for gameover
    increaseAIScore(amount) {
        this.aiScore += amount;
        if (this.aiScore >= 121) this.currentState = GameState.GAMEOVER;
    }

    // Handles when a bot is supposed to peg
    botPeg() {
        let aiCard = Bot.botPeg(this.aiHand, this.peggingHand, this.pegScore);
        if (aiCard === null) return;
        this.increaseAIScore(Peg.pegPoints(aiCard, this.peggingHand, this.pegScore));
        this.peggingHand.addCard(this.aiHand.playCard(aiCard.id));
        this.pegScore += aiCard.value;
    }

    // To determine if the crib is currently being counted
    isCribCounting() {
        return ((this.aiHand.cardsHidden.length === 0) && (this.humanHand.cardsHidden.length === 0))
    }

    // Returns true if a human is able to peg, false otherwise
    canHumanPeg() {
        return (!(Peg.goCheck(this.humanHand, this.pegScore)) && this.humanHand.cards.length !== 0);
    }

    // Returns true if the bot is able to peg, false otherwise
    canBotPeg() {
        return (!(Peg.goCheck(this.aiHand, this.pegScore)) && this.aiHand.cards.length !== 0);
    }

    // Returns correct score header for state of the game
    generateScoreHeader() {
        if (this.isCribCounting()) {
            if (this.aiHand.cards.length !== 0) return "AI's Crib Score";
            else return "Player's Crib Score"
        }
        else {
            if (this.aiHand.cards.length !== 0) return "AI's Hand Score";
            else return "Player's Hand Score";
        }
    }

    // Returns correct score body for state of game
    generateScoreBody() {
        // If AI is counting:
        if (this.aiHand.cards.length !== 0) {
            const fullHand = new Hand({...this.aiHand});
            let returnString = "";
            fullHand.addCard(this.cutCard);
            if (Score.calculateFifteenPoints(fullHand) !== 0) {
                returnString = returnString + "\n Points from Fifteens: " +  Score.calculateFifteenPoints(fullHand);
            }
            if (Score.calculateRunPoints(fullHand) !== 0) {
                returnString = returnString + "\n Points from Runs: " +  Score.calculateRunPoints(fullHand);
            }
            if (Score.calculatePairPoints(fullHand) !== 0) {
                returnString = returnString + "\n Points from Pairs: " +  Score.calculatePairPoints(fullHand);
            }
            if (Score.calculateSuitPoints(fullHand) !== 0) {
                returnString = returnString + "\n Points from Flush: " +  Score.calculateSuitPoints(fullHand);
            }
            if (Score.calculateKnobsPoints(this.aiHand, this.cutCard) !== 0) {
                returnString = returnString + "\n Points from Knobs: " +  Score.calculateKnobsPoints(this.aiHand, this.cutCard);
            }
            return returnString;
        }
        else {
            const fullHand = new Hand({...this.humanHand});
            let returnString = "";
            fullHand.addCard(this.cutCard);
            if (Score.calculateFifteenPoints(fullHand) !== 0) {
                returnString = returnString + "\n Points from Fifteens: " +  Score.calculateFifteenPoints(fullHand);
            }
            if (Score.calculateRunPoints(fullHand) !== 0) {
                returnString = returnString + "\n Points from Runs: " +  Score.calculateRunPoints(fullHand);
            }
            if (Score.calculatePairPoints(fullHand) !== 0) {
                returnString = returnString + "\n Points from Pairs: " +  Score.calculatePairPoints(fullHand);
            }
            if (Score.calculateSuitPoints(fullHand) !== 0) {
                returnString = returnString + "\n Points from Flush: " +  Score.calculateSuitPoints(fullHand);
            }
            if (Score.calculateKnobsPoints(this.humanHand, this.cutCard) !== 0) {
                returnString = returnString + "\n Points from Knobs: " +  Score.calculateKnobsPoints(this.humanHand, this.cutCard);
            }
            return returnString;
        }
    }

    generateScoreFooter() {
        if (this.aiHand.cards.length !== 0) {
            const fullHand = new Hand({...this.aiHand});
            fullHand.addCard(this.cutCard);
            return "\n Total Points: " + (Score.handScore(fullHand) +  Score.calculateKnobsPoints(this.aiHand, this.cutCard));
        }
        else {
            const fullHand = new Hand({...this.humanHand});
            fullHand.addCard(this.cutCard);
            return "\n Total Points: " + (Score.handScore(fullHand) +  Score.calculateKnobsPoints(this.humanHand, this.cutCard));
        }
    }

    // Returns the header when game is over
    generateGameOverHeader() {
        if (this.aiScore >= this.playerScore) return "AI Wins!";
        else return "You Win!";
    }

    // Returns the body when game is over
    generateGameOverBody() {
        let returnString = ""
        if (this.aiScore >= this.playerScore) {
            returnString += "AI: " + this.aiScore + " - Player: " + this.playerScore;
        }
        else returnString += "Player: " + this.playerScore + " - AI: " + this.aiScore;
        return returnString;
    }
}