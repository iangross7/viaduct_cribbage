import GameState from '../gameLogic/gameState';
import './HandContinue.css'

export default function HandContinue(props) {
    const gameState = props.gameState;
    const gameFlowing = props.gameState.gameFlowing;
    const goStop = props.gameState.goStop;

    let visibility = 'inline-block';
    let text = 'Continue';
    let bMarg = '5%';

    if (gameFlowing) visibility = 'none';
    if (gameState.currentState === GameState.PEGGING) {
        if (goStop) {
            text = 'Go';
        }
        else {
            text = 'AI\'s Go';
        }
    }
    if (gameState.currentState === GameState.GAMEOVER) text = 'New Game';
    if (window.innerWidth <= 768) {
        bMarg = gameState.humanHand.cards.length === 0 ? '12vw' : '-3%';
        if (gameState.currentState === GameState.GAMEOVER) bMarg = '20%';
    }
    else {
        bMarg = gameState.humanHand.cards.length === 0 ? '14.58vw' : '5%';
    }

    return (
        <button 
            className='hand-button'
            onClick = {props.onClick}
            style = {{display: visibility, marginBottom: bMarg}}
            >{text}</button>
    );
}