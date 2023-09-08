import MoveableCard from './MoveableCard.js'
import GameState from '../gameLogic/gameState.js';

import './AIHand.css'

export default function AIHand(props) {
    const aiHand = props.gameState.aiHand.cards;
    if (props.gameState.currentState === GameState.SCORING) {
        return (
            <div className='ai-hand-container'>
                { aiHand.map((card) => (
                    <MoveableCard
                        key={card.id}
                        cardID={card.id}
                        cardDisplay={card.id}
    
                        canMove = 'false'
                    />
                ))}
            </div>
        );
    }
    return (
        <div className='ai-hand-container'>
            { aiHand.map((card) => (
                <MoveableCard
                    key={card.id}
                    cardID={card.id}
                    cardDisplay={'Back'}

                    canMove = 'false'
                />
            ))}
        </div>
    );
}