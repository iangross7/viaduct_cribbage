import MoveableCard from './MoveableCard.js'

import './HumanHand.css'

export default function HumanHand(props) {
    const playerHand = props.gameState.playerHand.cards;

    return (
        <div className='human-hand-container'>
            { playerHand.map((card) => (
                <MoveableCard
                    key={card.id}
                    cardID={card.id}
                    cardDisplay={card.id}

                    onCardPlayed={props.onCardPlayed}
                    dropZone={props.dropZone}
                    canMove = 'true'
                />
            ))}
        </div>
    );
}