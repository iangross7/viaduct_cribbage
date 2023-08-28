import { motion } from 'framer-motion';
import cardSVGs from './cardSVGs.js';


import './MoveableCard.css'

//TODO: Fix Hitbox
export default function MoveableCard(props) {
  const cardType = props.cardType;
  const CardSVG = cardSVGs[cardType] || null;

  return (
    <div className='card-wrapper'>
      <motion.div drag dragSnapToOrigin="true">
        {CardSVG && <CardSVG style={{transform: 'scale(0.5)'}}/>}
      </motion.div>
    </div>
    );
}