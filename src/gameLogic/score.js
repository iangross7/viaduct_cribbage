class Score {
    // use for four cards
    static handScore(hand) {
        let points = 0;

        return points;
    }

    static calculateFifteenPoints(handVals) {
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

    static calculateRunPoints(handOrder) {
        const sortedHand = [...handOrder].sort();
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

    static calculateSuitPoints(handSuits) {
        const sortedSuits = [...handSuits].sort();

        for (let i = 0; i < sortedSuits.length - 3; i++) {
            if (sortedSuits[i] === sortedSuits[i+1] && sortedSuits[i] === sortedSuits[i+2] && sortedSuits[i] === sortedSuits[i+3]) {
                if (sortedSuits.length >= 5 && sortedSuits[i] === sortedSuits[i+4]) return 5;
                else return 4;
            }
        }
        return 0;
    }

    static calculatePairPoints(handVals) {
        const sortedHand = [...handVals].sort();
        let pairPoints = 0;

        for (let i = 0; i < sortedHand.length - 1; i++) {
            for (let j = i + 1; j < sortedHand.length; j++) {
                if (sortedHand[i] === sortedHand[j]) pairPoints += 2;
            }
        }

        return pairPoints;
    }
}