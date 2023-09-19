import GameState from '../gameLogic/gameState';
import './HandScore.css'

export default function HandScore(props) {
    const gameState = props.gameState;
    let header = '';
    let body = '';
    let footer = '';
    let visibility = 'none';
    if (gameState.currentState === GameState.SCORING && (gameState.aiHand.cards.length !== 0 || gameState.humanHand.cards.length !== 0)) {
        visibility = 'inline-block';
        header = gameState.generateScoreHeader();
        body = gameState.generateScoreBody();
        footer = gameState.generateScoreFooter();
    }

    return (
        <div className="hand-score" style={{display: visibility}}>
            <h2 style={{textAlign: 'center', marginBottom: '0.1%', fontSize: '2vw'}}>{header}</h2>
            <p className = 'score-body'>{body}<strong className='score-footer'>{footer}</strong></p>
        </div>
    );
}