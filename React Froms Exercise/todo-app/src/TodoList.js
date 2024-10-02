import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import NewTodoForm from "./NewTodoForm";

function TodoList() {
  const [todos, setTodos] = useState(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id, updatedTask) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, task: updatedTask } : todo
    ));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  };

  return (
    <div>
      <NewTodoForm addTodo={addTodo} />
      <ul className="TodoList">
        {todos.map((todo) => (
          <Todo
            key={todo.id}
            id={todo.id}
            task={todo.task}
            removeTodo={removeTodo}
            updateTodo={updateTodo}
            toggleComplete={toggleComplete}
            isCompleted={todo.isCompleted}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
