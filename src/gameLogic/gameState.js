import Deck from './deck.js';
import Hand from './hand.js';

export default class GameState {
    constructor() {
        this.deck = new Deck();

        this.playerHand = new Hand();
        this.aiHand = new Hand();

        this.playerScore = 0;
        this.aiScore = 0;
        this.cribPlayer = 0; // 0 for user, 1 for ai's crib
        this.startGame();
    }

    startGame() {
        this.playerScore = 0;
        this.aiScore = 0;
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
}