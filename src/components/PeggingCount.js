import './PeggingCount.css';
import GameState from '../gameLogic/gameState';

export default function PeggingCount(props) {
    const peggingCount = props.gameState.pegScore;
    let visibility = 'none';
    const isPegging = props.gameState.currentState === GameState.PEGGING;
    if (isPegging) visibility = 'inline-block';

    return (
        <div className="count" style={{display: visibility}}>
            Pegging Count: {peggingCount}
        </div>
    );
}