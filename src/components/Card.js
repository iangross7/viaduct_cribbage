import { motion } from 'framer-motion';
import { ReactComponent as TestCard } from '../assets/deckofcards/10c.svg'

import './Card.css'

export default function Card() {
    return (
        <div className='card-wrapper'>
          <motion.div drag dragSnapToOrigin="true">
            <TestCard />
          </motion.div>
        </div>
      );
}