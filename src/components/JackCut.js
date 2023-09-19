import GameState from '../gameLogic/gameState';
import './JackCut.css';

export default function JackCut(props) {
    const gameState = props.gameState;
    let visiblity = 'none';
    let lcoord = '77vw';
    if (gameState.cutCard.order === 11 && gameState.currentState === GameState.PEGGING && gameState.humanHand.cards.length === 4) {
        visiblity = 'inline-block';
        if (gameState.humanCrib) {
            lcoord = '15vw';
        }
        else {
            lcoord = '77vw';
        }
    }


    return (
        <div className="jack-cut-container" style={{display: visiblity, left: lcoord}}>
            <p style={{fontSize: '3vw', marginTop: '0%', marginBottom: '6%'}}>+2</p>
            <h2 style={{fontSize: "1.5vw", marginTop: '0%', marginBottom: '9%'}}>FOR JACK CUT!</h2>
        </div>
    );
}