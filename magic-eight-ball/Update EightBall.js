function EightBall({ answers }) {
    const initialMessage = "Think of a Question";
    const initialColor = "black";
  
    const [message, setMessage] = React.useState(initialMessage);
    const [color, setColor] = React.useState(initialColor);
  
    const handleClick = () => {
      const randomIndex = Math.floor(Math.random() * answers.length);
      const randomAnswer = answers[randomIndex];
      setMessage(randomAnswer.msg);
      setColor(randomAnswer.color);
    };
  
    const handleReset = () => {
      setMessage(initialMessage);
      setColor(initialColor);
    };
  
    return (
      <div>
        <div className="eight-ball" style={{ backgroundColor: color }} onClick={handleClick}>
          <p>{message}</p>
        </div>
        <button onClick={handleReset}>Reset</button>
      </div>
    );
  }
  