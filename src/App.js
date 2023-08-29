import { useState } from 'react';
import { useEffect } from 'react';
import PlayerHand from "./components/PlayerHand.js"
import AiHand from "./components/AIHand.js";
import GameState from "./gameLogic/gameState.js";


import './App.css';

function App() {
  const[gameState, setGameState] = useState(new GameState());
  // console.log(gameState.deck);
  // console.log(gameState.playerHand.cards);
  // console.log(gameState.aiHand.cards);

  const handleCardPlayedPlayer = (cardID) => {
    gameState.playerHand.removeCard(cardID);
    setGameState(gameState);
  }

  return (
    <div className='app-container'>
      <div className='hand-container'>
        <AiHand gameState = {gameState}/>
        <PlayerHand gameState = {gameState}/>
      </div>
      <div className='play-zone'></div>
      <div className='cut-container'></div>
      <div className='player-score-container'></div>
      <div className='ai-score-container'></div>
    </div>
  ); 
}

export default App;
