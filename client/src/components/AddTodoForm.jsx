import React, { useEffect, useState } from "react";
import { IoIosAdd } from "react-icons/io";
import axios from "axios";
import { useTodo } from "../context/todoContext";
import Swal from 'sweetalert2'
function AddTodoForm() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("normal");
  // console.log("Tag=>",tag.toLowerCase());
  const [todo,setTodo]=useState('')
  const { getTodos } = useTodo();
  async function handleSubmit(e) {
    e.preventDefault();
    console.log(title, description, tag);
    try {
      const res = await axios.post("/api/v1/todo/create-todo", {
        title,
        description,
        tags: tag,
      });
      setTodo(res.data.todo);
      Swal.fire(
        'Good job!',
        'You clicked the button!',
        'success'
      )
      setDescription("");
      setTitle("");
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getTodos();
  }, [todo]);
  
  return (
    <div>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-primary addbtn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
       <div className="btnbtn"><span>Add</span> <IoIosAdd className="addIcon" /></div> 
      </button>
      {/* Modal */}
      <form onSubmit={handleSubmit}>
        <div
          className="modal fade"
          id="exampleModal"
          tabIndex={-1}
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">
                  Add your task
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  onClick={()=>{
                    setDescription('')
                    setTitle('')
                  }}
                />
              </div>
              <div className="modal-body d-flex flex-column ">
                <label htmlFor="title mt-1">Title:</label>
                <input
                  id="title "
                  type="text"
                  placeholder="title..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
                <label htmlFor="description mt-1">Description:</label>
                <input
                  id="description"
                  type="text"
                  placeholder="description..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <label htmlFor="title mt-3">Tag:</label>
                <select
                  className="form-select mt-1 "
                  aria-label="Default select example"
                  onChange={(e) => setTag(e.target.value)}
                  value={tag}
                >
                  <option value="normal">normal</option>
                  <option value="very-important">Very important</option>
                  <option value="important">Important</option>
                  <option value="urgent">Urgent</option>
                </select>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                  onClick={()=>{
                    setDescription('')
                    setTitle('')
                  }}
                >
                  Close
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                  data-bs-dismiss="modal"
                >
                  ADD
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default AddTodoForm;
