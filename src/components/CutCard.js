import MoveableCard from "./MoveableCard";

//TODO: add actual implementation

export default function CutCard(props) {
    const cutCard = props.gameState.cutCard;

    return <MoveableCard 
        cardDisplay={cutCard.id} 
        canMove='false'
    />
}