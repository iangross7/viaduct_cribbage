import Deck from './deck.js'

export default class GameState {
    constructor() {
        this.deck = new Deck();
        this.deck.shuffle();
    }
}