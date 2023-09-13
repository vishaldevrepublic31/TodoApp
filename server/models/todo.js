import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required:[true , "Title is required...!"]
  },
  description: {
    type: String,
    required:[true , "description is required...!"]
  },
  tags: {
    type: String,
    enum: ["very-important", "important", "urgent", "normal"],
    default: "normal",
  },
  finished:{
    type:Boolean,
    default:false
  }
});

const Todo = mongoose.model("todo", todoSchema);
export default Todo;
