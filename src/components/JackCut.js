import GameState from '../gameLogic/gameState';
import './JackCut.css';

export default function JackCut(props) {
    const gameState = props.gameState;
    let visiblity = 'none';
    let lcoord = '0%';
    if (gameState.cutCard.order === 11 && gameState.currentState === GameState.PEGGING && gameState.humanHand.cards.length === 4) {
        visiblity = 'inline-block';
        if (gameState.humanCrib) {
            lcoord = '15%';
        }
        else {
            lcoord = '78%';
        }
    }


    return (
        <div className="jack-cut-container" style={{display: visiblity, left: lcoord}}>
            <p style={{fontSize: '250%', marginTop: '8%', marginBottom: '6%'}}>+2</p>
            <h2 style={{fontSize: "100%", marginTop: '0%'}}>FOR JACK CUT!</h2>
        </div>
    );
}