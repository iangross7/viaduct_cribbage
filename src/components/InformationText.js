import GameState from '../gameLogic/gameState';
import './InformationText.css'

export default function InformationText(props) {
    const gameState = props.gameState;
    let text = '';
    if (gameState.currentState === GameState.CRIBBING) {
        if (gameState.humanCrib) {
            text = (
              <span>
                It's <strong style={{color: 'red'}}>your crib</strong>. Place two cards in the center.
              </span>
            );
          } else {
            text = (
              <span>
                It's the <strong style={{color: 'red'}}>AI's crib</strong>. Place two cards in the center.
              </span>
            );
          }
          if (gameState.aiScore === 0 && gameState.playerScore === 0) {
            text = (
              <span>
                {text} First to 121 points wins. Good luck!
              </span>
            );
          }
    }
    else if (gameState.currentState === GameState.PEGGING) {
        text = "Play your card in the center."
        if (gameState.aiScore === 0 && gameState.playerScore === 0) {
          text += " AI is smart and will instantly play back. Pegging points automatically tallied."
        }
        if (gameState.gameFlowing === false && gameState.goStop === true) {
          text = "Press go to give your go."
        }
        else if (gameState.gameFlowing === false && gameState.goStop === false) {
          text = "Press go to recieve AI's go."
        }
    }
    else if (gameState.currentState === GameState.SCORING && gameState.aiHand.cards.length === 0 && gameState.humanHand.cards.length === 0) {
        text = "Now entering the hand scoring phase. Press continue to begin."
    }
    else if (gameState.currentState === GameState.SCORING) {
        text = "Breakdown of the scoring is to the right. Press continue to move on and tally the score."
    }
    else if (gameState.currentState === GameState.ROUNDOVER) {
        text = "Hand scores have been tallied. Press continue to deal the next round."
    }

    return (
        <div className="information-text">
            <p style={{whiteSpace: 'pre-line'}}>{text}</p>
        </div>
    );
}