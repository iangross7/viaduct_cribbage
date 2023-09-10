import GameState from '../gameLogic/gameState';
import './GameOver.css';

export default function GameOver(props) {
    const gameState = props.gameState;
    let visibility = 'none';
    let header = '';
    let body = '';
    if (gameState.currentState === GameState.GAMEOVER) {
        visibility = 'inline-block';
        header = gameState.generateGameOverHeader();
        body = gameState.generateGameOverBody();
    }

    return (
        <div className='game-over' style={{display: visibility}}>
            <h2>{header}</h2>
            <br></br>
            <h3>{body}</h3>
        </div>
    );
}