import { useState, useRef } from 'react';

import HumanHand from "./components/HumanHand.js"
import AiHand from "./components/AIHand.js";

import CutCard from './components/CutCard.js';
import ScoreBoard from "./components/ScoreBoard.js"

import GameState from "./gameLogic/gameState.js";

import './App.css';

function App() {
  const[gameState, setGameState] = useState(new GameState());
  const dropZoneRef = useRef(null);

  // Handling when a player plays a card
  const handleCardPlayedHuman = (cardID) => {
    const updatedGameState = new GameState({...gameState});
    updatedGameState.humanPlayCard(cardID);
    setGameState(updatedGameState);
  }

  return (
    <div className='app-container'>
      <div className='drop-zone' ref={dropZoneRef}></div>
      <div className='hand-container'>
        <AiHand gameState={gameState}/>
        <HumanHand 
          gameState={gameState} 
          onCardPlayed={handleCardPlayedHuman}
          dropZone={dropZoneRef}
        />
      </div>
      <div className='cut-container'>
        <CutCard gameState={gameState}/>
      </div>
      <div className='human-score-container'>
        <ScoreBoard player='Player' score={gameState.playerScore}/>
      </div>
      <div className='ai-score-container'>
        <ScoreBoard player='AI' score={gameState.aiScore}/>
      </div>
    </div>
  ); 
}

export default App;
