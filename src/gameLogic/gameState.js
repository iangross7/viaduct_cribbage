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

    constructor({deck = new Deck(), humanHand = new Hand(), aiHand = new Hand(), cribHand = new Hand(), 
        cutCard = new Card('Back', 'S', 0), peggingHand = new Hand(), pegScore = 0, goStop = false,
        playerScore = 0, aiScore = 0, cribPlayer = 0, currentState = GameState.START, gameFlowing = true} = {}) {

        this.deck = deck; // deck object

        this.humanHand = humanHand; // hands keeping track of crib, ai, and human cards
        this.aiHand = aiHand;
        this.cribHand = cribHand;

        this.pegScore = pegScore; // pegging infromation
        this.peggingHand = peggingHand;

        this.cutCard = cutCard;

        this.playerScore = playerScore;
        this.aiScore = aiScore;
        this.cribPlayer = cribPlayer; // 0 for user, 1 for ai's crib

        this.currentState = currentState; // state of the game
        this.gameFlowing = gameFlowing; // true for go, false for stopped
        this.goStop = goStop; // true for goStop, false for noGoStop

        if (currentState === GameState.START) this.startGame();
    }

    // Begins Game 
    startGame() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.newDeal(this.cribPlayer);
    }

    // Reshuffles deck, clears old hands, grants players new cards
    newDeal(cribPlayer) {
        this.deck.shuffle();
        this.aiHand.clearHand();
        this.humanHand.clearHand();
        this.cribHand.clearHand();
        this.peggingHand.clearHand();

        this.cutCard = new Card('Back', 'S', 0);

        if (cribPlayer === 0) {
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
            if (this.cribPlayer === 0) this.playerScore += 2;
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
                this.currentState = GameState.PEGGING;
                this.cut();
            }
        }
        // Pegging State 
        else if (this.currentState === GameState.PEGGING) {
            // Doesn't work yet, need AI implementation
            if (!Peg.goCheck(this.humanHand, this.pegScore)) {
                const playedCard = this.humanHand.playCard(cardID);
                console.log(Peg.pegPoints(playedCard, this.peggingHand, this.pegScore));
                this.peggingHand.addCard(playedCard);
                this.pegScore += playedCard.value;            
            }
            else {
                this.goStop = true;
            }
        }
        }
    }

    continue() {
        this.gameFlowing = true;
    }
}