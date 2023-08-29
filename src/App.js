import Hand from "./components/Hand.js"
import GameState from "./gameLogic/gameState.js";

import './App.css';

function App() {
  const gameState = new GameState();
  console.log(gameState.deck.dealCard());
  gameState.deck.shuffle();
  console.log(gameState.deck);

  return (
    <>
    <Hand />
    </>
  ); 
}

export default App;
