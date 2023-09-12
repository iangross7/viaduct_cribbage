// TODO: add knobs

export default class Score {
    // use for four or five cards
    static handScore(hand) {
        let points = 0;

        points += this.calculateFifteenPoints(hand);
        points += this.calculatePairPoints(hand);
        points += this.calculateRunPoints(hand);
        points += this.calculateSuitPoints(hand);

        return points;
    }

    // Finds total points from knobs
    static calculateKnobsPoints(hand, cutCard) {
        let points = 0;
        hand.cards.forEach(e => {
            if (e.suit === cutCard.suit && e.order === 11) points = 1;
        })
        return points;
    }

    // Finds total points from fifteens
    static calculateFifteenPoints(hand) {
        const handVals = hand.cards.map(c => c.value);

        const result = [];
    
        const combine = (start, current) => {
            if (current.length > 0 && current.reduce((sum, num) => sum + num, 0) === 15) {
                result.push(current.slice());
            }

            for (let i = start; i < handVals.length; i++) {
                current.push(handVals[i]);
                combine(i + 1, current);
                current.pop();
            }
        };

        combine(0, []);
        return result.length * 2;
    }

    // Finds total points from runs 
    static calculateRunPoints(hand) {
        const handOrder = hand.cards.map(c => c.order);
        const sortedHand = [...handOrder].sort((a, b) => a - b);
        const uniqueHand = [];
        sortedHand.forEach(element => {
            if (!uniqueHand.includes(element)) uniqueHand.push(element);
        });

        let runCount = 0;

        // Seeing the size of the run, without finding duplicates yet
        for (let i = 0; i < uniqueHand.length - 1 ; i++) {
            let currCount = 1;

            for (let j = i + 1; j < uniqueHand.length; j++) {
                if (uniqueHand[j] === uniqueHand[j - 1] + 1) currCount++;
                else break;
            }

            if (currCount >= 3) {
                runCount = currCount;
                break;
            }
        }

        // If no run exixsts, return 
        if (runCount < 3) return 0;

        let dupeFactor = 1;
        const dupeArray = [];

        // Now finding the duplicates for calculation. 
        // Double double results in 4 times the run size, single double results in 2 times, 3kind is 3 times
        for (let i = 0; i < sortedHand.length - 1; i++) {
            if (sortedHand[i] === sortedHand[i + 1]) {
                if (i < sortedHand.length - 2 && sortedHand[i] === sortedHand[i + 2]) {
                    dupeFactor = 3; 
                    break;
                }
                dupeArray.push(sortedHand[i]);
                dupeArray.push(sortedHand[i + 1]);
            }
        }

        if (dupeFactor === 1) dupeFactor = Math.max(dupeArray.length, 1);
        
        return runCount * dupeFactor;
    }

    // Finds total points from flush, need all 4 cards originally to count.
    static calculateSuitPoints(hand) {
        const handSuits = hand.cards.map(c => c.suit);

        if (handSuits.length >= 4) {
            if (handSuits[0] === handSuits[1] && handSuits[0] === handSuits[2] && handSuits[0] === handSuits[3]) {
                if (handSuits.length >= 5 && handSuits[0] === handSuits[4]) return 5;
                else return 4;
            }
        }

        return 0;
    }

    // Finds total points from pairs
    static calculatePairPoints(hand) {
        const handOrder = hand.cards.map(c => c.order);
        const sortedHand = [...handOrder].sort((a, b) => a - b);
        let pairPoints = 0;

        for (let i = 0; i < sortedHand.length - 1; i++) {
            for (let j = i + 1; j < sortedHand.length; j++) {
                if (sortedHand[i] === sortedHand[j]) pairPoints += 2;
            }
        }

        return pairPoints;
    }
}