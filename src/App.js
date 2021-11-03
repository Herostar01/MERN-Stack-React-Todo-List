import React, { useState } from 'react';
import './App.css';


function App() {

  /* Below array destructure syntax is equivalent to:
  const newTodoStateArr =  useState("");
  const newTodo = newTodoStateArr[0];
  const setNewTodo = newTodoStateArr[1];
    */

  // This one line below is short for above

  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState([]);

  const handleNewTodoSubmit = (event) => {
    event.preventDefault();

    if (newTodo.length === 0) {
      return;
    }

    const todoItem = {
      text: newTodo,
      complete: false 
    }

    setTodos([...todos, todoItem]);
    setNewTodo("");
  }

  const handleTodoDelete = (delIdx) => {
    const filteredTodos = todos.filter((x, i) => { 
      return i !== delIdx; 
    });

    setTodos(filteredTodos);
  }

  const handleToggle = (idx) => {
    const updatedTodos = todos.map((todo, i) => {
      if (idx === i) {
        todo.complete = !todo.complete;
      }
      return todo;
    });

    setTodos(updatedTodos);

  }


  return (
    <div style={{ textAlign: "center" }}
    >

      <form onSubmit={(event) => {
        handleNewTodoSubmit(event);
      }} >

        <input onChange={(event) => {
          setNewTodo(event.target.value);
        }} type="text"
          value={newTodo}
        />

        <div>
          <button>Add</button>
        </div>


      </form>

      <br />

      {todos.map((todo, i) => {
        const todoClasses = ['bold', 'italic']; 

        if (todo.complete) {     
          todoClasses.push("line-through")
        }


        return (
          <div key={i} >
            <input onChange={(event) => {
              handleToggle(i)
            }} checked={todo.complete} type="checkbox" />

            <span className={todoClasses.join(" ")} > {todo.text} </span> 

            <button onClick={(event) => {
              handleTodoDelete(i);
            }}

            >
              Delete
            </button>


          </div>
        )
      })}

    </div>
  );
}

export default App;
