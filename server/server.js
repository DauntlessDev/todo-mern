const express = require("express");
const app = express();
const mongoose = require("mongoose");

const cors = require("cors");


mongoose.connect("mongodb+srv://user123:Password123Brave@cluster0.vln9r.mongodb.net/TodoDb?retryWrites=true&w=majority")

app.listen(3001, () => {
  console.log("Listening to the server...");
});

