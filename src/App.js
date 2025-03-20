import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./styles.css"; // Importing CSS for styling

const API_URL = "https://jsonplaceholder.typicode.com/todos?_limit=5"; // Mock API

function Home() {
  return <h2 className="home">Welcome to the To-Do List App</h2>;
}

function Todos() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editingText, setEditingText] = useState("");

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const addTodo = () => {
    if (!newTodo) return;
    const newTask = { id: todos.length + 1, title: newTodo };
    setTodos([...todos, newTask]);
    setNewTodo("");
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const startEditing = (id, title) => {
    setEditingId(id);
    setEditingText(title);
  };

  const saveEdit = (id) => {
    setTodos(todos.map(todo => todo.id === id ? { ...todo, title: editingText } : todo));
    setEditingId(null);
    setEditingText("");
  };

  return (
    <div className="todo-container">
      <h2 className="title">To-Do List</h2>
      <div className="input-container">
        <input
          type="text"
          className="todo-input"
          placeholder="New Task"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
        />
        <button onClick={addTodo} className="add-btn">Add</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  className="edit-input"
                  value={editingText}
                  onChange={(e) => setEditingText(e.target.value)}
                />
                <button onClick={() => saveEdit(todo.id)} className="save-btn">Save</button>
              </>
            ) : (
              <>
                <span className="todo-text">{todo.title}</span>
                <button onClick={() => startEditing(todo.id, todo.title)} className="edit-btn">Edit</button>
                <button onClick={() => deleteTodo(todo.id)} className="delete-btn">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/todos" className="nav-link">To-Do List</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </Router>
  );
}

export default App;