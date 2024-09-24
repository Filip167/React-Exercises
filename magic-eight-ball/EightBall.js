function EightBall({ answers }) {
    const initialMessage = "Think of a Question";
    const initialColor = "black";
  
    const [message, setMessage] = React.useState(initialMessage);
    const [color, setColor] = React.useState(initialColor);
    const [greenCount, setGreenCount] = React.useState(0);
    const [goldenrodCount, setGoldenrodCount] = React.useState(0);
    const [redCount, setRedCount] = React.useState(0);
  
    const handleClick = () => {
      const randomIndex = Math.floor(Math.random() * answers.length);
      const randomAnswer = answers[randomIndex];
      setMessage(randomAnswer.msg);
      setColor(randomAnswer.color);
  
      // Update color count
      if (randomAnswer.color === "green") setGreenCount(greenCount + 1);
      else if (randomAnswer.color === "goldenrod") setGoldenrodCount(goldenrodCount + 1);
      else if (randomAnswer.color === "red") setRedCount(redCount + 1);
    };
  
    const handleReset = () => {
      setMessage(initialMessage);
      setColor(initialColor);
      setGreenCount(0);
      setGoldenrodCount(0);
      setRedCount(0);
    };
  
    return (
      <div>
        <div className="eight-ball" style={{ backgroundColor: color }} onClick={handleClick}>
          <p>{message}</p>
        </div>
        <button onClick={handleReset}>Reset</button>
        <div className="color-counts">
          <p>Green: {greenCount}</p>
          <p>Goldenrod: {goldenrodCount}</p>
          <p>Red: {redCount}</p>
        </div>
      </div>
    );
  }
  