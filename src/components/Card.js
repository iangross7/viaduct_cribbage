import { motion } from 'framer-motion';
import { ReactComponent as Aos } from '../assets/aceofspades.svg'

import "./Card.css"

export default function Card() {
    return (
        <div className="test-card">
          <motion.div 
          drag 
          dragSnapToOrigin="true"
          />
        </div>
      );
}

{/* <div className="test-card">
          <motion.div 
          drag 
          dragSnapToOrigin="true"
          />
        </div> */}