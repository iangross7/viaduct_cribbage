export default class Card {
    constructor(id, suit, value) {
        this.id = id;
        this.suit = suit;
        this.symbol = value;
        if (value === "J" || value === "Q" || value === "K") this.value = 10;
        else if (value ==="A") this.value = 1;
        else this.value = Number(value);
    }
}