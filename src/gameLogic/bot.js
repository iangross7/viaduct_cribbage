import Score from './score.js';
import Hand from './hand.js';

export default class Bot {
    // use for 6 card hand of bot decision making, returns the two card IDs to discard.
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

    // TODO: implement
    static botPeg(aiHand, pegHand, pegScore) {
      return null;
    }
}