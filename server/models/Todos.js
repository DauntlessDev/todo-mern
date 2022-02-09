const mongoose = require("mongoose");

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  state: {
    type: Boolean,
    required: true,
  },
});

const UserModel = mongoose.model("todos", TodoSchema);
module.exports = TodoSchema;
