import Deck from './deck.js';
import Hand from './hand.js';
import Bot from './bot.js';
import Score from './score.js';

export default class GameState {
    static START = "start";
    static CRIBBING = "cribbing";
    static PEGGING = "pegging";

    constructor({deck = new Deck(), humanHand = new Hand(), aiHand = new Hand(), cribHand = new Hand(),
        playerScore = 0, aiScore = 0, cribPlayer = 0, currentState = GameState.START} = {}) {

        this.deck = deck;

        this.humanHand = humanHand;
        this.aiHand = aiHand;
        this.cribHand = cribHand;

        this.playerScore = playerScore;
        this.aiScore = aiScore;
        this.cribPlayer = cribPlayer; // 0 for user, 1 for ai's crib

        this.currentState = currentState;

        if (currentState === GameState.START) this.startGame();
    }

    // Begins Game 
    startGame() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.newDeal(this.cribPlayer);
    }

    // Reshuffles deck, cleras old hands, grants players new cards
    newDeal(cribPlayer) {
        this.deck.shuffle();
        this.aiHand.cards = [];
        this.humanHand.cards = [];
        this.cribHand.cards = [];

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

    humanPlayCard(cardID) {
        if (this.currentState === GameState.CRIBBING) {
            if (this.cribHand.cards.length < 2) this.cribHand.addCard(this.humanHand.removeCard(cardID));
            if (this.cribHand.cards.length === 2) {
                const discardCards = Bot.botCribDiscard(this.aiHand);
                discardCards.forEach(element => {
                    this.cribHand.addCard(this.aiHand.removeCard(element));
                });
                this.currentState = GameState.PEGGING;
            }
        }
    }
}