import GameState from '../gameLogic/gameState';
import './InformationText.css'

export default function InformationText(props) {
    const gameState = props.gameState;
    let text = '';
    if (gameState.currentState === GameState.CRIBBING) {
        if (gameState.humanCrib) {
            text = 'It\'s your crib. Place two cards in the center.'
        }
        else {
            text = 'It\'s the AI\'s Crib. Place two cards in the center.'
        }
        if (gameState.aiScore === 0 && gameState.playerScore === 0) {
            text += ' First to 120 points wins. Good luck!'
        }
    }
    else if (gameState.currentState === GameState.PEGGING) {
        text = "Place your card in the center to play for peg. AI is so smart it will instantly play back."
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
            <p>{text}</p>
        </div>
    );
}