import Score from './score.js';
import Hand from './hand.js';
import Peg from './peg.js';

export default class Bot {
    // use for 6 card hand of bot decision making, returns the two card IDs to discard.
    // logically places the two cards that grant it the most 4-card in-hand points into the crib. 
    // does not have a tie-breaker.
    static botCribDiscard(hand) {
        let bestScore = 0;
        let bestDiscard = [];

        for (let i = 0; i < hand.cards.length - 1; i++) {
            for (let j = i + 1; j < hand.cards.length; j++) {
              const discardedCards = [hand.cards[i], hand.cards[j]];
              const remainingHandArr = hand.cards.filter(card => !discardedCards.includes(card));
              const remainingHand = new Hand();
              remainingHandArr.forEach(element => remainingHand.addCard(element));
              
              const score = Score.handScore(remainingHand); // Calculate score for remaining hand
        
              if (score > bestScore) {
                bestScore = score;
                bestDiscard = discardedCards;
              }
            }
          }
        
          return bestDiscard.map(c => c.id);
    }

    // Returns the OBJECT of the best card for the bot to peg
    // Logically picks the card yielding highest points, and if that's zero, the card with the highest numerical value
    static botPeg(hand, pegHand, pegScore) {
      if (Peg.goCheck(hand, pegScore)) return null;

      let bestScore = 0;
      let highestVal = 0;
      let bestCard = hand.cards[0];

      for (let i = 0; i < hand.cards.length; i++) {
        if (Peg.canCardBePlayed(hand.cards[i], pegScore)) {
          if (Peg.pegPoints(hand.cards[i], pegHand, pegScore) > bestScore) { 
            bestCard = hand.cards[i];
            bestScore = Peg.pegPoints(hand.cards[i], pegHand, pegScore);
          }
          else if (bestScore <= 0 && hand.cards[i].value > highestVal)  {
            bestCard = hand.cards[i];
            highestVal = hand.cards[i].value;
          }
        }
      }

      return bestCard;
    }
}