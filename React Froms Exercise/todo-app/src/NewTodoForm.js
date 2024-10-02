import React, { useState } from "react";
import { v4 as uuid } from "uuid";

function NewTodoForm({ addTodo }) {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    addTodo({ id: uuid(), task, isCompleted: false });
    setTask(""); // clear input
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="task">New Todo:</label>
      <input
        type="text"
        id="task"
        value={task}
        onChange={(e) => setTask(e.target.value)}
      />
      <button>Add Todo</button>
    </form>
  );
}

export default NewTodoForm;
