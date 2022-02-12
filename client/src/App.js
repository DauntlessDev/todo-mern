import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("todo title");
  // const [state, setCompleted] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setTodoList(response.data);
    });
  });

  const addTodo = () => {
    Axios.post("http://localhost:3001/addTodo", {
      title,
      state: false,
    }).then((response) => {
      setTodoList([...todoList], { title, state: false });
    });
  };

  const toggleState = () => {};

  return (
    <div className="App">
      <div className="main">
        {todoList.map((todo) => {
          return (
            <button onClick={toggleState}>
              <h1 className={todo.state ? "completed" : "notcompleted"}>
                Title: {todo.title}
              </h1>
            </button>
          );
        })}

        <div>
          <input
            type="tyext"
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
