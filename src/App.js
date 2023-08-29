import Hand from "./components/Hand.js"
import GameState from "./gameLogic/gameState.js";

import './App.css';

function App() {
  const gameState = new GameState();
  console.log(gameState.deck);
  console.log(gameState.playerHand.cards);

  return (
    <>
    <Hand />
    </>
  ); 
}

export default App;
