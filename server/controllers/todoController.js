import Todo from "../models/todo.js";

// create todo
const createTodo = async (req, res) => {
  try {
    const { title, description ,tags} = req.body;
    if (!title || !description)
      return res.status(400).json({ message: "All fields are required!" });
    const todo = await Todo.create({
      title,
      description,
      tags
    });

    await todo.save();
    res.status(201).json({
      success: true,
      todo,
    });
  } catch (error) {
    res.status(400).json({ message: "Error in create todo!", error });
  }
};

// get all todo
const getAllTodo = async (req, res) => {
  try {
    const todos = res.paginatedResult;
    if (!todos)
      return res
        .status(400)
        .json({ message: "No any todoes in databases . Please create now!" });

    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(400).json({ message: "Error in get all todo!", error });
  }
};

const getSingleTodo = async (req, res) => {
  try {
    const { id } = req.params;
    console.log("ID=>",id);

    const todos = await Todo.findById(id);
    console.log("Todos=>",todos);
    if (!todos)
      return res
        .status(400)
        .json({ message: "No any todoes in databases . Please create now!" });

    res.status(200).json({
      success: true,
      todos,
    });
  } catch (error) {
    res.status(400).json({ message: "Error in get single todo!", error });
  }
};

//  update
const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await Todo.findById(id);
   if(todo){
    todo.title = req.body.title || todo.title
    todo.description = req.body.description || todo.description
    todo.tags = req.body.tags || todo.tags
  
    if(!req.body.finished){
      todo.finished = false
    }else{
      todo.finished = req.body.finished  || todo.finished
    }
    const updatedTodo = await todo.save()
    res.status(201).json({
      success:true,
      updatedTodo,
      todo

    })
   }else{
    res.status(400).json({
      success:false,
      message:'Todo not found'
    })
   }
  } catch (error) {
    console.log(error)
  }
 
};

//delete single todo
const deleteSingleTodo = async (req, res) => {
  const { id } = req.params;

  const deletedTodo = await Todo.findByIdAndDelete(id);
  if (!deletedTodo)
    return res.status(400).json({ message: "Todo is not exist" });

  res.status(200).json({
    success: true,
    message: "Todo deleted successfully",
    deletedTodo
  });
};

export { createTodo, getAllTodo, deleteSingleTodo, getSingleTodo, updateTodo };
