import Hand from "./components/Hand.js"
import GameState from "./gameLogic/gameState.js";

import './App.css';

function App() {
  const gameState = new GameState();
  gameState.deck.dealCard();
  console.log(gameState.deck.cardsDealt);

  return (
    <>
    <Hand />
    </>
  ); 
}

export default App;
