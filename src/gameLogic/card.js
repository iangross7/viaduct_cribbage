export default class Card {
    constructor(id, suit, symbol) {
        this.id = id;
        this.suit = suit;
        this.symbol = symbol;
        if (symbol === "J" || symbol === "Q" || symbol === "K") this.value = 10;
        else if (symbol ==="A") this.value = 1;
        else this.value = Number(symbol);
    }
}