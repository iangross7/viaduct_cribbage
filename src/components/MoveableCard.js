import { motion } from 'framer-motion';
import cardSVGs from './cardSVGs.js';


import './MoveableCard.css' // Commented out for time being 

export default function MoveableCard(props) {
  const cardID = props.cardID;

  const canMove = props.canMove === 'true';
  const CardSVG = cardSVGs[cardID] || null;

  return (
    <div className='card-wrapper'>
      <motion.div drag={canMove} dragSnapToOrigin="true" style = {{scale: 0.5}}>
        {CardSVG && <CardSVG />}
      </motion.div>
    </div>
    );
}