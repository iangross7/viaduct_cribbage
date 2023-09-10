import GameState from '../gameLogic/gameState';
import './HandContinue.css'

export default function HandContinue(props) {
    const gameState = props.gameState;
    const gameFlowing = props.gameState.gameFlowing;
    const goStop = props.gameState.goStop;

    let visibility = 'inline-block';
    let text = 'Continue';
    if (gameFlowing) visibility = 'none';
    if (goStop) text = 'Go';
    if (gameState.currentState === GameState.GAMEOVER) text = 'New Game';

    return (
        <button 
            className='hand-button'
            onClick = {props.onClick}
            style = {{display: visibility}}
            >{text}</button>
    );
}