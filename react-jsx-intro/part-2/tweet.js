// Tweet Component
function Tweet({ username, name, date, message }) {
    return (
      <div className="tweet">
        <h4>{name} (@{username})</h4>
        <small>{date}</small>
        <p>{message}</p>
      </div>
    );
  }
  