import GameState from '../gameLogic/gameState';
import './HandScore.css'

export default function HandScore(props) {
    const gameState = props.gameState;
    let header = '';
    let body = '';
    let visibility = 'none';
    if (gameState.currentState === GameState.SCORING && (gameState.aiHand.cards.length !== 0 || gameState.humanHand.cards.length !== 0)) {
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