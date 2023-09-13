import GameState from '../gameLogic/gameState';
import './GameOver.css';

export default function GameOver(props) {
    const gameState = props.gameState;
    let visibility = 'none'; // none
    let header = '';
    let body = '';
    if (gameState.currentState === GameState.GAMEOVER) {
        visibility = 'inline-block';
        header = gameState.generateGameOverHeader();
        header = header.toUpperCase();
        body = gameState.generateGameOverBody();
    }

    return (
        <div className='game-over' style={{display: visibility}}>
            <h2 className='over-header'>{header}</h2>
            <br></br>
            <p className='over-body'>{body}</p>
        </div>
    );
}