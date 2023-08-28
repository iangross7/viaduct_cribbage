import { motion } from 'framer-motion';
import { ReactComponent as TestCard } from '../assets/deckofcards/10c.svg'

import './Card.css'

//TODO: Fix Hitbox
export default function Card() {
    return (
        <div className='card-wrapper'>
          <motion.div drag dragSnapToOrigin="true">
            <TestCard style={{transform: 'scale(0.5)'}} />
          </motion.div>
        </div>
      );
}