import Deck from './deck.js';
import Hand from './hand.js';

export default class GameState {
    static START = "start";
    static CRIBBING = "cribbing";
    static PEGGING = "pegging";

    constructor({deck = new Deck(), playerHand = new Hand(), aiHand = new Hand(), cribHand = new Hand(),
        playerScore = 0, aiScore = 0, cribPlayer = 0, currentState = GameState.START} = {}) {

        this.deck = deck;

        this.playerHand = playerHand;
        this.aiHand = aiHand;
        this.cribHand = cribHand;

        this.playerScore = playerScore;
        this.aiScore = aiScore;
        this.cribPlayer = cribPlayer; // 0 for user, 1 for ai's crib

        this.currentState = currentState;

        if (currentState === GameState.START) this.startGame();
    }

    startGame() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.currentState = GameState.CRIBBING;
        this.newDeal(this.cribPlayer);
    }

    newDeal(cribPlayer) {
        this.deck.shuffle();
        if (cribPlayer === 0) {
            for (let i = 0; i < 6; i++) {
                this.aiHand.addCard(this.deck.dealCard());
                this.playerHand.addCard(this.deck.dealCard());
            }
        }
        else {
            for (let i = 0; i < 6; i++) {
                this.playerHand.addCard(this.deck.dealCard());
                this.aiHand.addCard(this.deck.dealCard());
            }
        }
    }

    humanCribCard(cardID) {
        if (this.currentState === GameState.CRIBBING) {
            this.cribHand.addCard(this.playerHand.removeCard(cardID));
        }
    }
}