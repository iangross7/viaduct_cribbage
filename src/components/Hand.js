import MoveableCard from './MoveableCard.js'

import './Hand.css'

export default function Hand() {
    return (
        <div className='hand-container'>
            <MoveableCard cardType='S5' canMove='true'/>
            <MoveableCard cardType='D5' canMove='true'/>
            <MoveableCard cardType='C5' canMove='true'/>
            <MoveableCard cardType='H5' canMove='true'/>
            <MoveableCard cardType='DJ' canMove='true'/>
            <MoveableCard cardType='SJ' canMove='true'/>
        </div>
    );
}