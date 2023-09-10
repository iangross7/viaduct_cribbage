import GameState from '../gameLogic/gameState';
import './HandScore.css'

export default function HandScore(props) {
    const gameState = props.gameState;
    let header = '';
    let body = '';
    let visibility = 'none';
    if (gameState.currentState === GameState.SCORING) {
        visibility = 'inline-block';
        header = gameState.generateScoreHeader();
        body = gameState.generateScoreBody();
    }

    return (
        <div className="hand-score" style={{display: visibility}}>
            <h3 style={{textAlign: 'center'}}>{header}</h3>
            <p style={{whiteSpace: 'pre-line'}}>{body}</p>
        </div>
    );
}