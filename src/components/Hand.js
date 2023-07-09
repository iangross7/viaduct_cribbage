import Card from './Card.js'

import './Hand.css'

export default function Hand() {
    return (
        <div className='hand-container'>
            <Card />
            <Card />
            <Card />
            <Card />
        </div>
    );
}