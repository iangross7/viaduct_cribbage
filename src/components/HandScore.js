import GameState from '../gameLogic/gameState';
import './HandScore.css'

export default function HandScore(props) {
    const gameState = props.gameState;
    let header = 'bleh';
    let body = 'bleh1'
    if (gameState.currentState === GameState.SCORING) {
        header = gameState.generateScoreHeader();
        body = gameState.generateScoreBody();
    }

    return (
        <div className="hand-score">
            <h3 style={{textAlign: 'center'}}>{header}</h3>
            <p style={{whiteSpace: 'pre-line'}}>{body}</p>
        </div>
    );
}