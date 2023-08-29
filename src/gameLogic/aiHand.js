export default class AiHand {
    constructor() {
        this.cards = [];
    }

    addCard(card) {
        this.cards.push(card);
    }

    removeCard(card) {
        var index = this.cards.indexOf(card.id);
        if (index > -1) {
            this.cards.splice(index, 1);
        }
    }
}