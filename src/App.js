import React, { useState } from 'react';
import './App.css';

function App() {
  // empty state to render items when added
  const [todo, setTodo] = useState([]);

  const addTodo = text => {
    // func to add items
    const found = todo.some(el => el.text === text)
    if (!found){
      const newTodos = [...todo, { text }];
      setTodo(newTodos);
    } else {
      alert('Already Exist !')
    }
  };

  const removeTodo = index => {
    // func to remove items
    const newTodos = [...todo];
    newTodos.splice(index, 1);
    setTodo(newTodos);
  };

  return (
    <section className="container">
      <div className="heading">
        <img alt='image_alternate' className="heading__img" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/756881/laptop.svg" />
        <h1 className="heading__title">To-Do List</h1>
      </div>
      {/* todo form to add items */}
      <TodoForm addTodo={addTodo} />
      <div>
        <ul className="toDoList">
        {/* todo items to render */}
          {todo && todo.map((todo, index) => {
            return (
              <Todo
                key={index}
                index={index}
                todo={todo}
                removeTodo={removeTodo}
              />
            )
          })}
        </ul>
      </div>
    </section>
  );
}

export default App;


const Todo = ({ todo, index, removeTodo }) => {
  return(
    <li>
      <div className='todo'>
        {todo.text}
        <div>
          <button className='button removebutton' onClick={() => removeTodo(index)}>Remove</button>
        </div>
      </div>
    </li>
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
    <form onSubmit={handleSubmit} className="form">
        <div>
          <label className="form__label" htmlFor="todo">~ Today I need to ~</label>
          <input className="form__input"
              type="text" 
              id="todo" 
              name="to-do"
              size="30"
              value={value}
              onChange={e => setValue(e.target.value)}
              required />
          <button className="button"><span>Submit</span></button>
        </div>
      </form>
  );
}
