import { motion } from 'framer-motion';
import cardSVGs from './cardSVGs.js';


import './MoveableCard.css';

export default function MoveableCard(props) {
  const cardID = props.cardID;
  const cardDisplay = props.cardDisplay;
  const dropZoneRef = props.dropZone; // ref for dropZone

  const canMove = props.canMove === 'true';
  const CardSVG = cardSVGs[cardDisplay] || null;

  const handleDragEnd = (event) => {
    const dropZoneRect = dropZoneRef.current.getBoundingClientRect(); // Get drop zone's bounding rectangle
    const cardRect = event.target.getBoundingClientRect(); // Get card's bounding rectangle

    // Calculate the intersection area between the card and drop zone
    const intersectionArea = (
      Math.min(cardRect.right, dropZoneRect.right) -
      Math.max(cardRect.left, dropZoneRect.left)
    ) * (
      Math.min(cardRect.bottom, dropZoneRect.bottom) -
      Math.max(cardRect.top, dropZoneRect.top)
    );

    // Calculate the percentage of the card's area inside the drop zone
    const cardArea = (cardRect.right - cardRect.left) * (cardRect.bottom - cardRect.top);
    const percentageInsideDropZone = (intersectionArea / cardArea) * 100;

    // Adjust this threshold as needed (e.g., 50% for a majority)
    const threshold = 50;

    if (percentageInsideDropZone >= threshold) {
      // Trigger the action to play the card
      props.onCardPlayed(cardID);
    }
  };

  return (
      <motion.div 
        className='card-wrapper' 
        drag={canMove} 
        dragSnapToOrigin="true" // Returns card to original position
        onDragEnd={handleDragEnd} // Handler for when the drag completes
        style = {{scale: 0.5}}>
          {CardSVG && <CardSVG />}
      </motion.div>
    );
}