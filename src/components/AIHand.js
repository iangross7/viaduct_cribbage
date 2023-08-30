import MoveableCard from './MoveableCard.js'

import './AIHand.css'

export default function AIHand(props) {
    const aiHand = props.gameState.aiHand.cards;

    return (
        <div className='ai-hand-container'>
            { aiHand.map((card, index) => (
                <MoveableCard
                    key={index}
                    cardID={card.id}
                    cardDisplay={'Back'}

                    canMove = 'false'
                />
            ))}
        </div>
    );
}