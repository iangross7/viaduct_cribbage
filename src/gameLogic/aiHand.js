export default class AiHand {
    constructor() {
        this.cards = [];
        this.numCards = 0;
    }

    addCard(card) {
        this.cards.push(card);
        this.numCards++;
    }

    removeCard(card) {
        var index = this.cards.indexOf(card.id);
        if (index > -1) {
            this.cards.splice(index, 1);
        }
        this.numCards--;
    }
}