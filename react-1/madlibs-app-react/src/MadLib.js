import React, { useState } from 'react';
import './style.css';

function MadLib({ selectedStory }) {
  const [inputs, setInputs] = useState({});
  const [story, setStory] = useState(null);

  // Handle input changes and trim the input values
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value.trim() // Trim the input value
    });
  };

  // Check if all fields are filled
  const allFieldsFilled = selectedStory.prompts.every((prompt) => inputs[prompt]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Replace placeholders in the template string
    let filledStory = selectedStory.template;

    // For each prompt, replace the placeholder in the template
    Object.keys(inputs).forEach((key) => {
      const placeholder = new RegExp(`\\$\\{inputs\\['${key}'\\]\\}`, 'g'); // Create dynamic regex for replacement
      filledStory = filledStory.replace(placeholder, inputs[key]);
    });
    
    setStory(filledStory);
  };

  const handleRestart = () => {
    setInputs({});
    setStory(null);
  };

  return (
    <div className="content">
      {!story ? (
        <form onSubmit={handleSubmit}>
          <h3>{selectedStory.title}</h3>
          {selectedStory.prompts.map((prompt, index) => (
            <div key={index}>
              <label htmlFor={prompt}>{prompt}:</label>
              <input
                type="text"
                id={prompt}
                name={prompt}
                value={inputs[prompt] || ""}
                onChange={handleChange}
                required
              />
            </div>
          ))}
          <input type="submit" value="Submit" disabled={!allFieldsFilled} />
        </form>
      ) : (
        <div>
          <p className="story-text">{story}</p>
          <button onClick={handleRestart}>Restart</button>
        </div>
      )}
    </div>
  );
}

export default MadLib;
