import Card from './card.js';

const IDS = [
    'C2',
    'C3',
    'C4',
    'C5',
    'C6',
    'C7',
    'C8',
    'C9',
    'CJ',
    'CQ',
    'CK',
    'CA',
    'S2',
    'S3',
    'S4',
    'S5',
    'S6',
    'S7',
    'S8',
    'S9',
    'SJ',
    'SQ',
    'SK',
    'SA',
    'H2',
    'H3',
    'H4',
    'H5',
    'H6',
    'H7',
    'H8',
    'H9',
    'HJ',
    'HQ',
    'HK',
    'HA',
    'D2',
    'D3',
    'D4',
    'D5',
    'D6',
    'D7',
    'D8',
    'D9',
    'DJ',
    'DQ',
    'DK',
    'DA',
    'C10',
    'S10',
    'H10',
    'D10'
];

export default class Deck {
    constructor(cards = createDeck()) {
        this.cards = cards;
    }

    shuffle() {
        this.cards = createDeck();
        for (let i = this.cards.length - 1; i > 0; i--) {
            var newIndex = Math.floor(Math.random() * i);
            var oldCard = this.cards[newIndex];
            this.cards[newIndex] = this.cards[i];
            this.cards[i] = oldCard;
        }
    }

    dealCard() {
        return this.cards.pop();
    }
}

function createDeck() {
    return IDS.map(id => {
        return new Card(id, id.charAt(0), id.substring(1))
    })
}