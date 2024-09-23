// Bootstrap Alert Component
function Alert({ type, message }) {
    return <div className={`alert alert-${type}`}>{message}</div>;
  }
  
  // Bootstrap Button Component
  function Button({ type, label }) {
    return <button className={`btn btn-${type}`}>{label}</button>;
  }
  
  // Person Component (same as before)
  function Person({ name, age, hobbies }) {
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
  
  // App Component now renders both Person components and Bootstrap components
  function App() {
    return (
      <div>
        {/* Bootstrap Alerts */}
        <Alert type="success" message="This is a success alert!" />
        <Alert type="danger" message="This is a danger alert!" />
  
        {/* Bootstrap Buttons */}
        <Button type="primary" label="Primary Button" />
        <Button type="secondary" label="Secondary Button" />
  
        {/* Person Components */}
        <Person name="Alexander" age={21} hobbies={['Reading', 'Gaming', 'Coding']} />
        <Person name="John" age={16} hobbies={['Basketball', 'Movies']} />
        <Person name="Emily" age={25} hobbies={['Painting', 'Traveling']} />
      </div>
    );
  }
  