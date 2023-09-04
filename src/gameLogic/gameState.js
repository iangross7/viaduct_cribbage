import Card from './card.js'
import Deck from './deck.js';
import Hand from './hand.js';
import Bot from './bot.js';
import Score from './score.js';

export default class GameState {
    static START = "start";
    static CRIBBING = "cribbing";
    static PEGGING = "pegging";

    constructor({deck = new Deck(), humanHand = new Hand(), aiHand = new Hand(), cribHand = new Hand(), cutCard = new Card('Back', 'S', 0),
        playerScore = 0, aiScore = 0, cribPlayer = 0, currentState = GameState.START, gameFlow = 1} = {}) {

        this.deck = deck;

        this.humanHand = humanHand;
        this.aiHand = aiHand;
        this.cribHand = cribHand;

        this.cutCard = cutCard;

        this.playerScore = playerScore;
        this.aiScore = aiScore;
        this.cribPlayer = cribPlayer; // 0 for user, 1 for ai's crib

        this.currentState = currentState;
        this.gameFlow = gameFlow; // 0 for STOP, 1 for GO

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
        if (this.gameFlow === 1) {
            
        // Cribbing State
        if (this.currentState === GameState.CRIBBING) {
            if (this.cribHand.cards.length < 2) this.cribHand.addCard(this.humanHand.removeCard(cardID));
            if (this.cribHand.cards.length === 2) {
                const discardCards = Bot.botCribDiscard(this.aiHand);
                discardCards.forEach(element => {
                    this.cribHand.addCard(this.aiHand.removeCard(element));
                });
                this.currentState = GameState.PEGGING;
                this.cut();
            }
        }

        // Pegging State

        }

    }
}