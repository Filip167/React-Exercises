import React, { useState } from "react";

function Todo({ id, task, removeTodo, updateTodo, toggleComplete, isCompleted }) {
  const [isEditing, setIsEditing] = useState(false);
  const [updatedTask, setUpdatedTask] = useState(task);

  const handleEditSubmit = (e) => {
    e.preventDefault();
    updateTodo(id, updatedTask);
    setIsEditing(false);
  };

  const handleRemove = () => {
    document.getElementById(id).classList.add('removed');
    setTimeout(() => removeTodo(id), 500); // wait for the fade-out animation
  };

  return (
    <li id={id}>
      {isEditing ? (
        <form onSubmit={handleEditSubmit}>
          <input
            type="text"
            value={updatedTask}
            onChange={(e) => setUpdatedTask(e.target.value)}
          />
          <button>Save</button>
        </form>
      ) : (
        <>
          <span className={`task-text ${isCompleted ? "completed" : ""}`}>
            {task}
          </span>
          <div>
            <button onClick={() => setIsEditing(true)}>Edit</button>
            <button onClick={() => toggleComplete(id)}>
              {isCompleted ? "Unmark" : "Mark as completed"}
            </button>
            <button onClick={handleRemove}>X</button>
          </div>
        </>
      )}
    </li>
  );
}

export default Todo;
