import React, { useState } from 'react';
import './App.css';

function App() {
  const [todo, setTodo] = useState([]);

  const addTodo = text => {
    const newTodos = [...todo, { text }];
    setTodo(newTodos);
  };

  const completeTodo = index => {
    const newTodos = [...todo];
    newTodos[index].isCompleted = true;
    setTodo(newTodos);
  };
  
  return (
    <div className="App">
      <div className="todoList">
        {todo.map((todo, index) => {
          return(
            <Todo
              key={index}
              index={index}
              todo={todo}
              completeTodo={completeTodo}
            />
          )
        })}
        <TodoForm addTodo={addTodo} />
      </div>
    </div>
  );
}

export default App;


const Todo = ({ todo, index, completeTodo }) => {
  return(
    <div className='todo' style={{ textDecoration: todo.isCompleted ? "line-through" : "" }}>
      {todo.text}
      <div>
        <button onClick={() => completeTodo(index)}>Complete</button>
      </div>
    </div>
  )
}

const TodoForm = ({ addTodo }) => {
  const [value, setValue] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    if (!value) return;
    addTodo(value);
    setValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        className="input"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
    </form>
  );
}
