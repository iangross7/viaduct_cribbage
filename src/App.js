import { useState } from 'react';
import PlayerHand from "./components/PlayerHand.js"
import AiHand from "./components/AIHand.js";
import GameState from "./gameLogic/gameState.js";


import './App.css';

function App() {
  const[gameState, setGameState] = useState(new GameState());
  console.log(gameState.deck);
  console.log(gameState.playerHand.cards);
  console.log(gameState.aiHand.cards);

  return (
    <div className='app-container'>
      <div className='hand-container'>
        <AiHand gameState = {gameState}/>
        <PlayerHand gameState = {gameState}/>
      </div>
    </div>
  ); 
}

export default App;
