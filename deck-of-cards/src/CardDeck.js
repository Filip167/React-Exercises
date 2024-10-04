import React, { useState, useEffect, useRef } from "react";
import './App.css'; // Ensure the CSS file is linked

function CardDeck() {
  const [deck, setDeck] = useState(null);
  const [cards, setCards] = useState([]);
  const [cardStyles, setCardStyles] = useState([]); // Array to hold random positions and rotations
  const [isShuffling, setIsShuffling] = useState(false);
  const [autoDraw, setAutoDraw] = useState(false);
  const timerRef = useRef(null);

  // Initialize the deck on component mount
  useEffect(() => {
    async function fetchDeck() {
      const res = await fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1');
      const data = await res.json();
      setDeck(data);
    }
    fetchDeck();
  }, []);

  // Effect to manage the interval for auto-drawing
  useEffect(() => {
    if (autoDraw && !timerRef.current) {
      timerRef.current = setInterval(() => {
        drawCard();
      }, 1000); // Draw one card every 1000ms (1 second)
    }

    // Clean up the interval when autoDraw is turned off or the component unmounts
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [autoDraw, deck]); // Re-run effect if autoDraw state changes or deck updates

  // Draw a card function
  async function drawCard() {
    if (deck && deck.remaining > 0) {
      const res = await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/draw/?count=1`);
      const data = await res.json();

      // Add new card to state and generate a random style for its position and rotation
      setCards((prevCards) => [...prevCards, ...data.cards]);

      // Generate random top, left, and rotation for the card
      const randomTop = Math.floor(Math.random() * 300);  // Random top position
      const randomLeft = Math.floor(Math.random() * 300); // Random left position
      const randomRotation = Math.floor(Math.random() * 30) - 15; // Random rotation between -15 and 15 degrees

      // Add the new style to the cardStyles array
      setCardStyles((prevStyles) => [
        ...prevStyles,
        { top: `${randomTop}px`, left: `${randomLeft}px`, transform: `rotate(${randomRotation}deg)` }
      ]);

      // Update deck to reflect remaining cards
      setDeck((prevDeck) => ({
        ...prevDeck,
        remaining: prevDeck.remaining - 1
      }));
    } else {
      alert("Error: no cards remaining!");
      setAutoDraw(false); // Stop the auto-drawing if no cards left
      clearInterval(timerRef.current); // Clear the interval
      timerRef.current = null;
    }
  }

  // Start or stop drawing cards every second
  function toggleAutoDraw() {
    if (autoDraw) {
      clearInterval(timerRef.current); // Ensure we clear the interval when stopping
      timerRef.current = null;
    }
    setAutoDraw((prevAutoDraw) => !prevAutoDraw);
  }

  // Shuffle the deck
  async function shuffleDeck() {
    if (deck) {
      setIsShuffling(true);
      await fetch(`https://deckofcardsapi.com/api/deck/${deck.deck_id}/shuffle/`);
      setCards([]); // Clear cards on screen
      setCardStyles([]); // Clear previous styles
      setDeck((prevDeck) => ({
        ...prevDeck,
        remaining: 52 // Reset remaining cards after shuffling
      }));
      setIsShuffling(false);
    }
  }

  return (
    <div className="App">
      <h1>Deck of Cards</h1>
      {deck && <p>Cards remaining: {deck.remaining}</p>}
      <button onClick={drawCard} disabled={deck?.remaining === 0}>Gimme a Card!</button>
      <button onClick={shuffleDeck} disabled={isShuffling}>Shuffle Deck</button>
      <button onClick={toggleAutoDraw}>
        {autoDraw ? "Stop Drawing" : "Start Drawing"}
      </button>

      {/* Card container, moved lower */}
      <div className="cards-container" style={{ marginTop: "100px", position: "relative" }}>
        {cards.map((card, index) => (
          <img 
            key={card.code} 
            src={card.image} 
            alt={card.code} 
            style={{
              position: 'absolute',
              top: cardStyles[index]?.top, // Use the generated top position
              left: cardStyles[index]?.left, // Use the generated left position
              transform: cardStyles[index]?.transform, // Use the generated rotation
              zIndex: index // Ensure cards stack properly
            }} 
          />
        ))}
      </div>
    </div>
  );
}

export default CardDeck;
