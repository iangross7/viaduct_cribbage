import GameState from '../gameLogic/gameState';
import './HandContinue'

export default function BackButton(props) {
    const gameState = props.gameState;
    let bMarg = '5%';
    let rVal = '0';
    let visibility = 'none';
    
    if (window.innerWidth <= 768) {
        bMarg = gameState.humanHand.cards.length === 0 ? '12vw' : '-3%';
    }
    else {
        bMarg = gameState.humanHand.cards.length === 0 ? '14.58vw' : '5%';
    }
    if (gameState.currentState === GameState.CRIBBING && gameState.peggingHand.cards.length === 2) {
        visibility = 'inline-block';
        rVal = '2.6%';
    }
    if (gameState.currentState === GameState.GAMEOVER) visibility = 'none';

    
    return (
        <button 
            className='back-button'
            onClick = {props.onClick}
            style = {{display: visibility, marginBottom: bMarg, right: rVal}}
            >Back</button>
    );
}