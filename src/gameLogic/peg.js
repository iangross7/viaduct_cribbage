import Hand from './hand.js';

export default class Peg {
    // Returns true for a go needed, false otherwise
    static goCheck(hand, pegScore) {
        let isGo = true;
        hand.cards.forEach(e => {
            if (e.value + pegScore <= 31) isGo = false;
        });
        return isGo;
    }

    // Sees if there's any points to be made from the card being played
    static pegPoints(card, pegHand, pegScore) {
        let points = 0;
        points += this.calculateFifteenPoints(card, pegScore);
        points += this.calculateRunPoints(card, pegHand);
        points += this.calculatePairPoints(card, pegHand);
        return points;
    }

    // Sees if any card is allowed to be played
    static canCardBePlayed(card, pegScore) {
        return (card.value + pegScore <= 31);
    }

    // Finds points found for fifteens
    static calculateFifteenPoints(card, pegScore) {
        if (card.value + pegScore === 15) return 2;
        else return 0;
    }

    // Finds points found for runs
    static calculateRunPoints(card, pegHand) {
        let newHand = new Hand({...pegHand});
        newHand.addCard(card);

        let orderArray = newHand.cards.map(e => e.order);
        let orderSize = orderArray.length;
        let runSize = 0;

        if (orderSize >= 3) {
            let threeArray = [...orderArray.slice(orderSize - 3)].sort((a, b) => a - b);
            if (threeArray[0] + 1 === threeArray[1] && threeArray[0] + 2 === threeArray[2]) runSize = 3;
            if (orderSize >= 4 && runSize != 0) {
                let fourArray = [...orderArray.slice(orderSize - 4)].sort((a, b) => a - b);
                if (fourArray[0] + 1 === fourArray[1] && fourArray[0] + 2 === fourArray[2] && fourArray[0] + 3 === fourArray[3]) runSize = 4;
            }
        }
        
       return runSize;
    }

    // Finds points via pairs
    static calculatePairPoints(card, pegHand) {
        let newHand = new Hand({...pegHand});
        newHand.addCard(card);

        let pairCount = 0;

        for (let i = newHand.cards.length - 1; i > 0; i--) {
            // console.log(i);
            // console.log(newHand.cards[i].order);
            // console.log(newHand.cards[i-1].order);
            if (i === newHand.cards.length - 1) {
                if (newHand.cards[i].order === newHand.cards[i - 1].order) pairCount += 2;
            }
            else if (newHand.cards[i].order === newHand.cards[i - 1].order) pairCount++;
            else break;
        }

        if (pairCount === 2) return 2;
        else if (pairCount === 3) return 6;
        else if (pairCount === 4) return 12;
        else return 0;
    }
}