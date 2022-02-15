const express = require("express");
const app = express();
const mongoose = require("mongoose");
const TodoModel = require("./models/Todos");

const cors = require("cors");

app.use(express.json());
app.use(cors());

mongoose.connect(
  "mongodb+srv://user123:Password123Brave@cluster0.vln9r.mongodb.net/TodoDb?retryWrites=true&w=majority"
);

app.get("/", (req, res) => {
  TodoModel.find({}, (err, result) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/addTodo", async (req, res) => {
  const todo = req.body;
  const newTodo = new TodoModel(todo);
  await newTodo.save();

  res.json(todo);
});

app.put("/updateTodoState", async (req, res) => {
  const todoState = req.body.todoState;
  const id = req.body.id;

  try {
    await TodoModel.findById(id, (err, updatedTodoState) => {
      updatedTodoState.state = todoState;
      updatedTodoState.save();
      res.send("updatestate");
    });
  } catch (err) {
    console.log(err);
  }
});

app.put("/updateTodo", async (req, res) => {
  const newTitle = req.body.newTitle;
  const id = req.body.id;

  try {
    await TodoModel.findById(id, (err, updatedTodo) => {
      updatedTodo.title = newTitle;
      updatedTodo.save();
      res.send("update");
    });
  } catch (err) {
    console.log(err);
  }
});

app.delete("/deleteTodo/:id", async (req, res) => {
  const id = req.params.id;

  await TodoModel.findByIdAndRemove(id).exec();
  res.send("deleted");
});

app.listen(3001, () => {
  console.log("Listening to the server...");
});
