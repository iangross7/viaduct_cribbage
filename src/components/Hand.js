import MoveableCard from './MoveableCard.js'

import './Hand.css'

export default function Hand() {
    return (
        <div className='hand-container'>
            <MoveableCard cardType='S5'/>
            <MoveableCard cardType='D5'/>
            <MoveableCard cardType='C5' />
            <MoveableCard cardType='H5'/>
            <MoveableCard cardType='DJ'/>
            <MoveableCard cardType='SJ'/>
        </div>
    );
}