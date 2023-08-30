import Card from "./card.js";

export default class Hand {
    constructor({ cards = [], numCards = 0 } = {}) {
        this.cards = cards.map(card => new Card(card.id, card.suit, card.symbol));
        this.numCards = numCards;
    }

    addCard(card) {
        this.cards.push(card);
        this.numCards++;
    }

    // Returns card object that was removed
    removeCard(cardID) {
        var index = this.cards.map(e => e.id).indexOf(cardID);
        if (index > -1) {
            var card = this.cards[index];

            this.cards.splice(index, 1);
            this.numCards--;

            return card;
        }
    }
}