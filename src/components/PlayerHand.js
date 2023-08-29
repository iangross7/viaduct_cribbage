import MoveableCard from './MoveableCard.js'

import './PlayerHand.css'

export default function Hand(props) {
    const playerHand = props.gameState.playerHand.cards;

    return (
        <div className='player-hand-container'>
            { playerHand.map((card, index) => (
                <MoveableCard
                    key={index}
                    cardID={card.id}
                    cardDisplay={card.id}

                    canMove = 'true'
                />
            ))}
        </div>
    );
}