function Person({ name, age, hobbies }) {
    // Truncate the name to the first 6 characters if it's longer than 8 characters
    const displayName = name.length > 8 ? name.slice(0, 6) : name;
  
    return (
      <div className="person">
        <p>Learn some information about this person:</p>
        <p>Name: {displayName}</p>
        <p>Age: {age}</p>
        <ul>
          {hobbies.map((hobby, index) => (
            <li key={index}>{hobby}</li>
          ))}
        </ul>
        {age >= 18 ? <h3>Please go vote!</h3> : <h3>You must be 18</h3>}
      </div>
    );
  }
  