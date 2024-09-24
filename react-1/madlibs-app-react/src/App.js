import React, { useState } from 'react';
import MadLib from './MadLib';
import './style.css'; // Import your styles

function App() {
  const [selectedStory, setSelectedStory] = useState(null);
  const [error, setError] = useState('');

  // Story options
  const stories = {
    knights: {
      title: "Knights and Dragons",
      prompts: ["hero's name", "weapon", "adjective"],
      template: "${inputs['hero\'s name']} slew the dragon with a ${inputs['weapon']}, proving to be the most ${inputs['adjective']} knight in all the land.",
      image: "/images/knights.webp",
    },
    cowboys: {
      title: "Wild West Adventure",
      prompts: ["cowboy's name", "town", "adjective"],
      template: "${inputs['cowboy\'s name']} rode into ${inputs['town']}, a ${inputs['adjective']} figure against the dusty horizon, ready for a showdown.",
      image: "/images/cowboy.webp",
    },
    pirates: {
      title: "Pirate Quest",
      prompts: ["pirate name", "ship name", "treasure"],
      template: "Captain ${inputs['pirate name']} of the ${inputs['ship name']} set sail in search of ${inputs['treasure']}, navigating treacherous seas.",
      image: "/images/pirates.webp",
    },
  };
  

  // Handle when the user hasn't selected a story
  const handleStart = () => {
    if (!selectedStory) {
      setError('Please select a story to proceed.');
    } else {
      setError('');
    }
  };

  return (
    <div className="App">
      {/* Circular logo */}
      <img src="/images/logo.webp" alt="MadLib Creator Logo" className="logo-circle" />
      
      <h1>Choose Your Adventure</h1>

      {/* Story Selection */}
      <div className="story-options">
        {Object.keys(stories).map((key, index) => (
          <div key={index}
               className={`story-option ${selectedStory === stories[key] ? 'selected' : ''}`}
               onClick={() => setSelectedStory(stories[key])}>
            <img src={stories[key].image} alt={`${stories[key].title} logo`} className="story-image" />
            <h2>{stories[key].title}</h2>
          </div>
        ))}
      </div>

      {/* Error Message if no story is selected */}
      {error && <p className="error">{error}</p>}

      {/* Start the MadLib Game */}
      <button onClick={handleStart} className="start-button">
        Start MadLiB Game
      </button>

      {/* If a story is selected, display the MadLib component */}
      {selectedStory && !error && <MadLib selectedStory={selectedStory} />}
    </div>
  );
}

export default App;
