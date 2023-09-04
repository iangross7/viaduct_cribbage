import MoveableCard from './MoveableCard.js'

import './PeggingDisplay.css'

export default function PeggingDisplay(props) {
    const peggingHand = props.gameState.peggingHand.cards;

    return (
        <div className='pegging-display-container'>
            { peggingHand.map((card) => (
                <MoveableCard
                    key={card.id}
                    cardID={card.id}
                    cardDisplay={card.id}
                    cardLocation='center-card'
                    canMove = 'false'
                />
            ))}
        </div>
    );
}