import Card from "./card.js";

export default class Hand {
    constructor({ cards = [], cardsHidden = [], numCards = 0 } = {}) {
        this.cards = cards.map(card => new Card(card.id, card.suit, card.symbol));
        this.cardsHidden = cardsHidden.map(card => new Card(card.id, card.suit, card.symbol));
        this.numCards = numCards;
    }

    addCard(card) {
        this.cards.push(card);
        this.cardsHidden.push(card);
        this.numCards++;
    }

    // Returns card object that was removed, removes from visible hand
    playCard(cardID) {
        var index = this.cards.map(e => e.id).indexOf(cardID);
        if (index > -1) {
            var card = this.cards[index];

            this.cards.splice(index, 1);
            this.numCards--;

            return card;
        }
    }

    // Returns card object, removed from actual hand
    removeCard(cardID) {
        var index = this.cardsHidden.map(e => e.id).indexOf(cardID);
        if (index > -1) {
            var card = this.cardsHidden[index];

            this.cardsHidden.splice(index, 1);

            return card;
        }
    }

    // Returns card object, removed from actual and hidden hand
    fullPlayCard(cardID) {
        this.playCard(cardID);
        return this.removeCard(cardID);
    }

    // Clears the hand entirely 
    clearHand() {
        this.cards = [];
        this.cardsHidden = [];
        this.numCards = 0;
    }
}