export default class Peg {
    // Returns true for a go needed, false otherwise
    static goCheck(hand, pegScore) {
        let isGo = true;
        hand.cards.forEach(e => {
            if (e.value + pegScore <= 31) isGo = false;
        });
        return isGo;
    }
}