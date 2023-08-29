export default class Hand {
    constructor() {
        this.cards = [];
        this.numCards = 0;
    }

    addCard(card) {
        this.cards.push(card);
        this.numCards++;
    }

    removeCard(cardID) {
        console.log(cardID);
        var index = this.cards.map(e => e.id).indexOf(cardID);
        console.log(index);
        if (index > -1) {
            this.cards.splice(index, 1);
            this.numCards--;
        }
    }
}