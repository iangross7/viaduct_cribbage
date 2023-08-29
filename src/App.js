import Hand from "./components/Hand.js"
import { useState } from 'react';
import GameState from "./gameLogic/gameState.js";

import './App.css';

function App() {
  const[gameState, setGameState] = useState(new GameState());
  console.log(gameState.deck);
  console.log(gameState.playerHand.cards);
  console.log(gameState.aiHand.cards);

  return (
    <>
    <Hand gameState = {gameState}/>
    </>
  ); 
}

export default App;
