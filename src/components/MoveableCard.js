import { motion } from 'framer-motion';
import { useState, useEffect, useCallback } from 'react';
import cardSVGs from './cardSVGs.js';

export default function MoveableCard(props) {
  const cardID = props.cardID;
  const cardDisplay = props.cardDisplay;
  const dropZoneRef = props.dropZone; // ref for dropZone

  // Card Logic
  const canMove = props.canMove === 'true';
  const CardSVG = cardSVGs[cardDisplay] || null;

  // Handler for dragging of cards
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

    // If the card falls within the dropZone, activate card played sequence
    if (percentageInsideDropZone >= percentageThreshold && distance <= distanceThreshold) {
      // Trigger the action to play the card
      props.onCardPlayed(cardID);
    }
  };

  // Plays card (assuming draggable) when double clicked
  const handleDoubleClick = () => {
    if (canMove) {
      props.onCardPlayed(cardID);
    }
  };

  // Functions for responsive scaling, updated @78
  const findSideScale = useCallback(() => {
    // Scaling the space to the right and left of the cards
    const vw = window.innerWidth;
    const exponentialFactorMargins = 0.935; // Exponent for screen growth
    const maxMargin = -30; // The initial margin for larger screens (2560px)
    const minMargin = -120; // The minimum margin for smaller screens

    let marginScaleFactor = Math.pow((vw / 2560), exponentialFactorMargins);
    return minMargin + (maxMargin - minMargin) * marginScaleFactor; // Difference in min from max times factor
  }, []);

  // Functions for responsive scaling, updated @78
  const findTopScale = useCallback(() => {
    // Scaling the space to the top and bottom of the cards
    const vw = window.innerWidth;
    const exponentialFactorTop = 1.4;
    const maxBottomMargin = 0; // The initial margin for larger screens (2560px)
    const minBottomMargin = -150; // The minimum margin for smaller screens

    let bottomMarginScaleFactor = Math.pow((vw / 2560), exponentialFactorTop); 
    return minBottomMargin + (maxBottomMargin - minBottomMargin) * bottomMarginScaleFactor; // Difference in min from max times factor
  }, []);

  // Responsive Implementation. Setting what they should be upon first render: 
  const vw = window.innerWidth;
  const [scaleVal, setScaleVal] = useState((0.72 / 2560) * vw);

  const [sideMargin, setSideMargin] = useState(findSideScale());
  const [bottomMargin, setBottomMargin] = useState(findTopScale());

  // Updating scale for different screensizes, dynamically
  const updateScale = useCallback(() => {

    // Scaling the cards themselves
    const vw = window.innerWidth;
    setScaleVal((0.72 / 2560) * vw);

    // Sets side margins to value computed from function
    setSideMargin(findSideScale());

    // Sets top/bottom margins to value computed from function
    setBottomMargin(findTopScale());
  }, [findSideScale, findTopScale]);

  // Handles when window size changes
  useEffect(() => {
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => {
      window.removeEventListener('resize', updateScale);
    };
  }, [updateScale]);

  return (
      <motion.div 
        drag={canMove} 
        dragSnapToOrigin="true" // Returns card to original position
        onDragEnd={handleDragEnd} // Handler for when the drag completes
        onDoubleClick={handleDoubleClick} // Handler for double click
        style = {{scale: scaleVal, marginRight: sideMargin, marginLeft: sideMargin, marginBottom: bottomMargin, marginTop: bottomMargin}}>
          {CardSVG && <CardSVG />}
      </motion.div>
    );
}