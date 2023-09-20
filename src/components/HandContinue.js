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
    if (gameState.humanHand.cards.length === 0) bMarg = '14.58vw';

    return (
        <button 
            className='hand-button'
            onClick = {props.onClick}
            style = {{display: visibility, marginBottom: bMarg}}
            >{text}</button>
    );
}