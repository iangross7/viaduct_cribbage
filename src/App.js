import Hand from "./components/Hand.js"
import Deck from './gameLogic/deck.js'

import './App.css';

function App() {
  const deck = new Deck();
  console.log(deck.cards);

  return (
    <>
    <Hand />
    </>
  ); 
}

export default App;
