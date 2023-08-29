import { useState, useRef } from 'react';
import PlayerHand from "./components/PlayerHand.js"
import AiHand from "./components/AIHand.js";
import GameState from "./gameLogic/gameState.js";
import Hand from './gameLogic/hand.js';


import './App.css';

function App() {
  const[gameState, setGameState] = useState(new GameState());
  const dropZoneRef = useRef(null);

  // Handling when a player plays a card
  const handleCardPlayedPlayer = (cardID) => {
    const updatedGameState = new GameState({...gameState});
    updatedGameState.playerHand.removeCard(cardID);
    console.log(updatedGameState.playerHand.cards);
    setGameState(updatedGameState);
  }

  return (
    <div className='app-container'>
      <div className='hand-container'>
        <AiHand gameState={gameState}/>
        <PlayerHand 
          gameState={gameState} 
          onCardPlayed={handleCardPlayedPlayer}
          dropZone={dropZoneRef}
        />
      </div>
      <div className='drop-zone' ref={dropZoneRef}></div>
      <div className='cut-container'></div>
      <div className='player-score-container'></div>
      <div className='ai-score-container'></div>
    </div>
  ); 
}

export default App;
