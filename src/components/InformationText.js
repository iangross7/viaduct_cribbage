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
            text = 'It\'s the AI\'s Crib. Place two cards in the center.    '
        }
    }

    return (
        <div className="information-text">
            <p>{text}</p>
        </div>
    );
}