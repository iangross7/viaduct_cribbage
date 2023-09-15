import { useState } from 'react';
import heart from '../assets/heart-symbol.png';
import './SplashScreen.css'

export default function SplashScreen() {
    const [show, setShow] = useState(true);
    
    function startClick() {
        setShow(false);
    }

    return (
        <>
        {show && (
            <div className="start-screen-container">
                <div className='start-center-container'>
                    <div className='start-title-container'>
                        <h1 className='start-title'>Viaduct Cribbage</h1>
                        <img className='heart' src={heart} alt="Heart Icon" />
                    </div>
                    <button className='start-button' onClick={startClick}>START GAME</button>
                </div>
                <div className='rules-container'>
                    <p className='rules-blurb'>Don't know how to play?</p>
                    <button className='rules-button' onClick={() => window.open('https://bicyclecards.com/how-to-play/cribbage', '_blank')}>GAME RULES</button>
                </div>
                <div className='source-container'>
                    <p className='source-blurb'>Interested in the project?</p>
                    <button className='source-button' onClick={() => window.open('https://github.com/iangross7/viaduct_cribbage', '_blank')}>SOURCE CODE</button>
                </div>
            </div>
        )}
        </>
    );
}