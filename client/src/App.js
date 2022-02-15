import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("todo title");

  const [newTitle, setNewTitle] = useState("");

  const refreshTodoList = () => {
    Axios.get("http://localhost:3001/").then((response) => {
      setTodoList(response.data);
    });
  };

  useEffect(() => {
    refreshTodoList();
  });

  const addTodo = () => {
    Axios.post("http://localhost:3001/addTodo", {
      title,
      state: false,
    }).then((response) => {
      refreshTodoList();
    });
  };

  const updateTodo = (id) => {
    Axios.put("http://localhost:3001/updateTodo", {
      id,
      newTitle,
    });
  };

  const updateTodoState = (id, currentState) => {
    const todoState = !currentState;
    Axios.put("http://localhost:3001/updateTodoState", {
      id,
      todoState,
    });
  };

  const deleteTodo = (id) => {
    Axios.delete(`http://localhost:3001/deleteTodo/${id}`);
  };

  return (
    <div className="App">
      <div className="main">
        {todoList.map((todo) => {
          return (
            <div key={todo._id}>
              <h1 className={todo.state ? "completed" : "notcompleted"}>
                Title: {todo.title}
              </h1>
              <div>
                <input
                  type="text"
                  placeholder="update todo..."
                  onChange={(event) => {
                    setNewTitle(event.target.value);
                  }}
                />
                <button onClick={() => updateTodo(todo._id)}>UPDATE</button>
                <button onClick={() => updateTodoState(todo._id, todo.state)}>
                  {todo.state ? "UNCOMPLETE" : "COMPLETE"}
                </button>
                <button onClick={() => deleteTodo(todo._id)}>DELETE</button>
              </div>
            </div>
          );
        })}

        <br />
        <br />
        <br />

        <div>
          <input
            type="text"
            placeholder="add todo..."
            onChange={(event) => {
              setTitle(event.target.value);
            }}
          />
          <button onClick={addTodo}>ADD</button>
        </div>
      </div>
    </div>
  );
}

export default App;
