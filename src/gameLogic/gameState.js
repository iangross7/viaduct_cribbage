import Deck from './deck.js';
import Hand from './hand.js';

export default class GameState {
    constructor({deck = new Deck(), playerHand = new Hand(), aiHand = new Hand(), 
        playerScore = 0, aiScore = 0, cribPlayer = 0, notStarted = true} = {}) {

        this.deck = deck;

        this.playerHand = playerHand;
        this.aiHand = aiHand;

        this.playerScore = playerScore;
        this.aiScore = aiScore;
        this.cribPlayer = cribPlayer; // 0 for user, 1 for ai's crib

        this.notStarted = notStarted;

        if (this.notStarted) this.startGame();
    }

    startGame() {
        this.playerScore = 0;
        this.aiScore = 0;
        this.notStarted = false;
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