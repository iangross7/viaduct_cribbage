import { motion } from 'framer-motion';
import cardSVGs from './cardSVGs.js';


import './MoveableCard.css'

//TODO: Fix Hitbox
export default function MoveableCard(props) {
  const cardID = props.cardID;

  const canMove = props.canMove === 'true';
  const CardSVG = cardSVGs[cardID] || null;

  return (
    <div className='card-wrapper'>
      <motion.div drag={canMove} dragSnapToOrigin="true">
        {CardSVG && <CardSVG style={{transform: 'scale(0.5)'}}/>}
      </motion.div>
    </div>
    );
}