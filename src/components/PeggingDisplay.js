import MoveableCard from './MoveableCard.js'

import './PeggingDisplay.css'

export default function PeggingDisplay(props) {
    return (
        <div className='pegging-display-container'>
            <MoveableCard cardDisplay={'Back'} canMove = 'false' cardLocation = 'center-card'/>
            <MoveableCard cardDisplay={'Back'} canMove = 'false' cardLocation = 'center-card'/>
            <MoveableCard cardDisplay={'Back'} canMove = 'false' cardLocation = 'center-card'/>
            <MoveableCard cardDisplay={'Back'} canMove = 'false' cardLocation = 'center-card'/>
        </div>
    );
}