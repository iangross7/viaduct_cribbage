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

    constructor({deck = new Deck(), humanHand = new Hand(), aiHand = new Hand(), cribHand = new Hand(), 
        cutCard = new Card('Back', 'S', 0), peggingHand = new Hand(), pegScore = 0, goStop = false,
        playerScore = 0, aiScore = 0, humanCrib = true, currentState = GameState.START, gameFlowing = true} = {}) {

        this.deck = deck; // deck object

        this.humanHand = humanHand; // hands keeping track of crib, ai, and human cards
        this.aiHand = aiHand;
        this.cribHand = cribHand;

        this.pegScore = pegScore; // pegging infromation
        this.peggingHand = peggingHand;

        this.cutCard = cutCard;

        this.playerScore = playerScore;
        this.aiScore = aiScore;
        this.humanCrib = humanCrib; // true if user crib, false if ai crib

        this.currentState = currentState; // state of the game
        this.gameFlowing = gameFlowing; // true for go, false for stopped
        this.goStop = goStop; // true for goStop, false for noGoStop (player's go)

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
            if (this.humanCrib) this.playerScore += 2;
            else this.aiScore += 2;
        }
    }

    // Handles when a card is played
    humanPlayCard(cardID) {
        // If game is not not at a pause
        if (this.gameFlowing) {

            // Cribbing State
            if (this.currentState === GameState.CRIBBING) {
                if (this.cribHand.cards.length < 2) this.cribHand.addCard(this.humanHand.fullPlayCard(cardID));
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
                    this.playerScore += Peg.pegPoints(playedCard, this.peggingHand, this.pegScore);
                    this.peggingHand.addCard(playedCard);
                    this.pegScore += playedCard.value;  

                    // If the bot can peg back, it shall
                    if (this.canBotPeg()) {
                        this.botPeg();
                        // And it will continue pegging while it can and the human can't
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
                
                }
            }
        }
    }

    continue() {
        if (this.currentState !== GameState.SCORING) this.gameFlowing = true;

        // Crib continue
        if (this.currentState === GameState.CRIBBING) {
            this.currentState = GameState.PEGGING;
            this.cut();
            console.log(this.aiHand);
            if (this.humanCrib) {
                this.botPeg();
            }
        }

        // Peg continue
        else if (this.currentState === GameState.PEGGING) {
            // Reset the pegging hand for a clear go
            this.peggingHand.clearHand();
            this.pegScore = 0;
            // If no cards are left to be pegged, pegging concludes
            if (!(this.canHumanPeg()) && !(this.canBotPeg())) {
                if (this.goStop) this.aiScore++;
                else this.playerScore++;
                this.currentState = GameState.SCORING;
                return;
            }
            // If it was a go because of the human, it's a point for the bot and human now plays
            if (this.goStop) {
                this.aiScore++;
                this.goStop = false;
            } 
            // Otherwise, a go for the human and the bot shall play next
            else {
                this.playerScore++;
                this.botPeg();
                if (!this.canHumanPeg()) {
                    while (this.canBotPeg()) {
                        this.botPeg();
                    }
                    if (!(this.canHumanPeg()) && !(this.canBotPeg())) {
                        this.goStop = true;
                        this.gameFlowing = false;
                    }
                }
            }
        }
    }

    // Handles when a bot is supposed to peg
    botPeg() {
        let aiCard = Bot.botPeg(this.aiHand, this.peggingHand, this.pegScore);
        if (aiCard === null) return;
        this.aiScore += Peg.pegPoints(aiCard, this.peggingHand, this.pegScore);
        this.peggingHand.addCard(this.aiHand.playCard(aiCard.id));
        this.pegScore += aiCard.value;
    }

    // Returns true if a human is able to peg, false otherwise
    canHumanPeg() {
        return (!(Peg.goCheck(this.humanHand, this.pegScore)) && this.humanHand.cards.length !== 0);
    }

    // Returns true if the bot is able to peg, false otherwise
    canBotPeg() {
        return (!(Peg.goCheck(this.aiHand, this.pegScore)) && this.aiHand.cards.length !== 0);
    }
}