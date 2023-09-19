import { useState, useRef } from 'react';

import HumanHand from "./components/HumanHand.js"
import AiHand from "./components/AIHand.js";

import PeggingDisplay from './components/PeggingDisplay.js';
import PeggingCount from './components/PeggingCount.js';

import CutCard from './components/CutCard.js';
import ScoreBoard from "./components/ScoreBoard.js"
import JackCut from './components/JackCut.js';

import InformationText from './components/InformationText.js';
import HandContinue from './components/HandContinue.js';
import HandScore from './components/HandScore.js';

import GameOver from './components/GameOver.js';

import SplashScreen from './components/SplashScreen.js';

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

  // Handling when continue button is pressed
  const handleContinuePressed = () => {
    const updatedGameState = new GameState({...gameState});
    updatedGameState.continue();
    setGameState(updatedGameState);
  }

  return (
    <div className='app-container'>
      <div className='drop-zone' ref={dropZoneRef}>
        <PeggingDisplay gameState={gameState}/>
      </div>
      <GameOver gameState={gameState}/>
      <div className='upper-hand-container'>
        <AiHand gameState={gameState}/>
      </div>
      <div className='cut-container'>
        <CutCard gameState={gameState}/>
        <PeggingCount gameState={gameState}/>
      </div>
      <div className='lower-hand-container'>
      <HandContinue onClick={handleContinuePressed} gameState={gameState}/>
      <HumanHand 
          gameState={gameState} 
          onCardPlayed={handleCardPlayedHuman}
          dropZone={dropZoneRef}
        />
      </div>
      <InformationText gameState={gameState}/>
      <div className='human-score-container'>
        <ScoreBoard player='Your' score={gameState.playerScore}/>
      </div>
      <div className='ai-score-container'>
        <ScoreBoard player='AI' score={gameState.aiScore}/>
      </div>
      <div className='hand-score-container'>
        <HandScore gameState={gameState}/>
      </div>
      <JackCut gameState={gameState}/>
      <SplashScreen />
    </div>
  ); 
}

export default App;
