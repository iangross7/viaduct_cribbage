import { motion } from 'framer-motion';

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