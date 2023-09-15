import { motion } from 'framer-motion';
import cardSVGs from './cardSVGs.js';


import './MoveableCard.css';

export default function MoveableCard(props) {
  const cardID = props.cardID;
  const cardDisplay = props.cardDisplay;
  const dropZoneRef = props.dropZone; // ref for dropZone

  const canMove = props.canMove === 'true';
  const CardSVG = cardSVGs[cardDisplay] || null;
  const cardLocation = props.cardLocation || 'hand-card';

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

    // Thresh for percentage of card needed to be in drop zone
    const percentageThreshold = 50;

    // Calculate the center of the card and drop zone
    const cardCenterX = (cardRect.left + cardRect.right) / 2;
    const cardCenterY = (cardRect.top + cardRect.bottom) / 2;
    const dropZoneCenterX = (dropZoneRect.left + dropZoneRect.right) / 2;
    const dropZoneCenterY = (dropZoneRect.top + dropZoneRect.bottom) / 2;

    // Calculate the distance between the card's center and the drop zone's center
    const distance = Math.sqrt(
      Math.pow(cardCenterX - dropZoneCenterX, 2) + Math.pow(cardCenterY - dropZoneCenterY, 2)
    );

    // Thresh for furtherest card can be from DZ (needed for bug issues)
    const distanceThreshold = 250;

    if (percentageInsideDropZone >= percentageThreshold && distance <= distanceThreshold) {
      // Trigger the action to play the card
      props.onCardPlayed(cardID);
    }
  };

  return (
      <motion.div 
        className={cardLocation}
        drag={canMove} 
        dragSnapToOrigin="true" // Returns card to original position
        onDragEnd={handleDragEnd} // Handler for when the drag completes
        style = {{transform: 'scale(2vw)'}}>
          {CardSVG && <CardSVG />}
      </motion.div>
    );
}