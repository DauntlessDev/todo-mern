import "./App.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [todoList, setTodoList] = useState([]);
  const [title, setTitle] = useState("todo title");
  const [state, setCompleted] = useState(false);

  useEffect(() => {
    Axios.get("http://localhost:3001/").then((response) => {
      setTodoList(response.data);
    });
  });

  return (
    <div className="App">
      <div className="main">
        {todoList.map((todo) => {
          return todo.state ? (
            <h1 className="completed">Title: {todo.title}</h1>
          ) : (
            <h1 className="notcompleted">Title: {todo.title}</h1>
          );
        })}
      </div>
    </div>
  );
}

export default App;
