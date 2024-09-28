import React, { useState } from "react";
import Coin from "./Coin";
import "./CoinFlipCounter.css";  // Import the CSS file

function CoinFlipCounter() {
  const [flips, setFlips] = useState(0);
  const [headsCount, setHeadsCount] = useState(0);
  const [tailsCount, setTailsCount] = useState(0);
  const [side, setSide] = useState(null);

  function flipCoin() {
    const newSide = Math.random() > 0.5 ? "heads" : "tails";
    setSide(newSide);
    setFlips(flips + 1);
    if (newSide === "heads") {
      setHeadsCount(headsCount + 1);
    } else {
      setTailsCount(tailsCount + 1);
    }
  }

  return (
    <div className="CoinFlipCounter">
      <h1>Let's flip a coin!</h1>
      <Coin side={side} />
      <button onClick={flipCoin}>Flip Coin</button>
      <p>
        Out of {flips} flips, there have been {headsCount} heads and {tailsCount} tails.
      </p>
    </div>
  );
}

export default CoinFlipCounter;
