import MoveableCard from './MoveableCard.js'

import './Hand.css'

export default function Hand(props) {
    const playerHand = props.gameState.playerHand.cards;

    return (
        <div className='hand-container'>
            { playerHand.map((card, index) => (
                <MoveableCard
                    key={index}
                    cardID={card.id}

                    canMove = 'true'
                />
            ))}
        </div>
    );
}