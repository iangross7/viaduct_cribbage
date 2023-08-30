export default class Card {
    // id is how i've been sorting cards, is C5 is 5 of clubs, suit is suit, symbol is alphanumeric, value is cribbage pegging value
    // order is in which order the cards come in for runs
    constructor(id, suit, symbol) {
        this.id = id;
        this.suit = suit;
        this.symbol = symbol;
        if (symbol === "J") {
            this.value = 10;
            this.order = 11;
        }
        else if (symbol === "Q") {
            this.value = 10;
            this.order = 12;
        }
        else if (symbol === "K") { 
            this.value = 10;
            this.order = 13;
        }
        else if (symbol ==="A"){
            this.value = 1;
            this.order = 1
        }
        else { 
            this.value = Number(symbol);
            this.order = Number(symbol);
        }
    }
}