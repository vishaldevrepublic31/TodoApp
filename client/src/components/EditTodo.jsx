import React, { useEffect, useState } from "react";
import { useTodo } from "../context/todoContext";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import Swal from "sweetalert2";

export default function () {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tag, setTag] = useState("Normal");
  // console.log("Tag=>",tag.toLowerCase());
  const [todo, setTodo] = useState("");
  const { getTodos } = useTodo();
  const { id } = useParams();
  const navigate =  useNavigate()
  async function getSingleTodo(id) {
    console.log("id=>", id);
    
      try {
        
        const res = await axios.get(
          `http://localhost:5000/api/v1/todo/single-todo/${id}`
        );
        setTodo(res?.data?.todos);
        setDescription(res?.data?.todos?.description);
        setTitle(res?.data?.todos?.title);
        setTag(res?.data?.todos?.tag);
      } catch (error) {
        console.log(error);
      }
    
  }

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(title, description, tag);
    try {
      Swal.fire({
        title: 'Do you want to save the changes?',
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: 'Save',
        denyButtonText: `Don't save`,
      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
          const res =  axios.put(`/api/v1/todo/update-todo/${id}`, {
            title,
            description,
            tags: tag,
          });
          setTodo(res.data?.todo);
          navigate('/')
          Swal.fire('Saved!', '', 'success')
        } else if (result.isDenied) {
          Swal.fire('Changes are not saved', '', 'info')
          navigate('/')

        }
      })
      

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(function () {
    getSingleTodo(id);
  }, []);
  useEffect(
    function () {
      getTodos();
    },
    [todo]
  );

  return (
    <div className="edit ">
      <div className="edit-form ">
        <form onSubmit={handleSubmit}>
          <div className="modal-body d-flex flex-column ">
            <label htmlFor="title mt-1">Title:</label>
            <input
              id="title "
              type="text"
              placeholder="title..."
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <label htmlFor="description mt-4">Description:</label>
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
              <option defaultValue="normal">normal</option>
              <option value="very-important">Very important</option>
              <option value="important">Important</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          <button className="btn btn-primary mt-2">update</button>
          <br />
          <div className="m-1">
            <Link className="mt-3" to="/">
              Home
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
