import React from "react";
import "./Joke.css";

const Joke = ({ id, voteLike, voteDislike, likes, dislikes, text, isLocked, toggleLock }) => (
  <div className={`Joke ${isLocked ? "Joke-locked" : ""}`}>
    <div className="Joke-votearea">
      <button onClick={() => voteLike(id)} style={{ backgroundColor: 'blue', color: 'white' }}>
        <i className="fas fa-thumbs-up" />
      </button>
      {likes}

      <button onClick={() => voteDislike(id)} style={{ backgroundColor: 'red', color: 'white' }}>
        <i className="fas fa-thumbs-down" />
      </button>
      {dislikes}
    </div>

    <div className="Joke-text">{text}</div>
    
    <button onClick={() => toggleLock(id)} style={{ backgroundColor: isLocked ? 'green' : 'gray', color: 'white' }}>
      {isLocked ? "Unlock" : "Lock"}
    </button>
  </div>
);

export default Joke;
