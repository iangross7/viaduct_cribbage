import './PeggingCount.css';
import GameState from '../gameLogic/gameState';

export default function PeggingCount(props) {
    const peggingCount = props.gameState.pegScore;
    let visibility = 'none';
    const isPegging = props.gameState.currentState === GameState.PEGGING;
    if (isPegging) visibility = 'inline-block';

    return (
        <div className="count" style={{display: visibility, textAlign: 'center'}}>
            <h2 style={{marginBottom: '0.5%', fontSize: '1.6vw', marginTop: '10%'}}>Play Count</h2>
            <p style={{fontSize: '4vw', margin: '0.1% 0'}}>{peggingCount}</p>
        </div>
    );
}