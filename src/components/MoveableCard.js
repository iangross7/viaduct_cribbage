import { motion } from 'framer-motion';
import cardSVGs from './cardSVGs.js';


import './MoveableCard.css';

export default function MoveableCard(props) {
  const cardID = props.cardID;
  const cardDisplay = props.cardDisplay;
  const dropZoneRef = props.dropZone;

  const canMove = props.canMove === 'true';
  const CardSVG = cardSVGs[cardDisplay] || null;

  const handleDragEnd = (event) => {
    const dropZoneRect = dropZoneRef.current.getBoundingClientRect(); // Get drop zone's bounding rectangle
    const cardRect = event.target.getBoundingClientRect(); // Get card's bounding rectangle

    if (
      cardRect.left >= dropZoneRect.left &&
      cardRect.right <= dropZoneRect.right &&
      cardRect.top >= dropZoneRect.top &&
      cardRect.bottom <= dropZoneRect.bottom
    ) {
      // Trigger some action, like calling a function to play the card
      props.onCardPlayed(cardID);
    }
  };

  return (
      <motion.div 
        className='card-wrapper' 
        drag={canMove} 
        dragSnapToOrigin="true"
        onDragEnd={handleDragEnd} 
        style = {{scale: 0.5}}>
          {CardSVG && <CardSVG />}
      </motion.div>
    );
}