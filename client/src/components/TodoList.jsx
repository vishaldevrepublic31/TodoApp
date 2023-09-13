import React, { useEffect, useState } from "react";
import { useTodo } from "../context/todoContext";
import { AiOutlineDelete } from "react-icons/ai";
import { FiEdit } from "react-icons/fi";
import { IoMdDoneAll } from "react-icons/io";
import { RiInboxUnarchiveLine } from "react-icons/ri";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { FaListUl } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";

function TodoList() {
  let id = 0;
  let fid = 0;
  const {
    todos,
    getTodos,
    pageNumber,
    setPageNumber,
    results,
    finishedTodos,
    setFinishedPageNumber,
    finishedPageNumber,
    getFinishedTodos,
    finishedResults,
  } = useTodo();
  const [todo, setTodo] = useState("");
  const [update, setUpdate] = useState(1);
  const [view, setView] = useState(false);

  async function handleFindish(id) {
    try {
      const res = await axios.put(`/api/v1/todo/update-todo/${id}`, {
        finished: true,
      });
      setTodo(res.data.updatedTodo);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleUnFindish(id) {
    try {
      const res = await axios.put(`/api/v1/todo/update-todo/${id}`, {
        finished: false,
      });
      setTodo(res.data.updatedTodo);
      console.log(res.data.updatedTodo);
    } catch (error) {
      console.log(error);
    }
  }

  async function handleDelete(id) {
    try {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          const res = axios.delete(`/api/v1/todo/delete-single-todo/${id}`);

          setUpdate(update + 1);
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
        }
      });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(
    function () {
      getTodos();
      getFinishedTodos();
    },
    [todo, update]
  );
  return (
    <div className="container border mt-3 mh-100 overflowtodolist">
      <div className="mt-2">
        <div className="row">
          <div>
            <span className="me-2" onClick={() => setView(true)}>
              <BsFillGrid3X3GapFill />
            </span>
            <span onClick={() => setView(false)}>
              <FaListUl />
            </span>
            <hr />
          </div>
          <div className="col-md-6  ">
            <h1>TODO..</h1>

            <div className="d-flex flex-wrap">
              {!view && (
                <table className="table align-middle mb-0 bg-white">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {todos.map((el) => (
                      <>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              {(id += 1)}
                            </div>
                          </td>
                          <td>
                            <p>{el.title}</p>
                          </td>
                          <td>
                            <span
                              className={
                                `${
                                  el.tags === "normal"
                                    ? "badge badge-success rounded-pill d-inline text-dark"
                                    : " "
                                } ` +
                                ` ${
                                  el.tags === "very-important"
                                    ? "badge badge-danger rounded-pill d-inline text-dark"
                                    : " "
                                } ` +
                                ` ${
                                  el.tags === "important"
                                    ? "badge badge-warning  rounded-pill d-inline text-dark"
                                    : " "
                                } ` +
                                ` ${
                                  el.tags === "urgent"
                                    ? "badge badge-primary rounded-pill d-inline text-dark"
                                    : " "
                                } `
                              }
                            >
                              {el.tags}
                            </span>
                          </td>
                          <td>
                            <p>{el.description}</p>
                          </td>
                          <td>
                            <div className="d-inline">
                              <button
                                type="button"
                                className="btn btn-link btn-sm btn-rounded"
                                onClick={() => handleFindish(el._id)}
                              >
                                <IoMdDoneAll />
                              </button>

                              <Link
                                type="button"
                                className="btn btn-link btn-sm btn-rounded"
                                to={`/edit/${el._id}`}
                              >
                                <FiEdit />
                              </Link>
                              <button
                                type="button"
                                className="btn btn-link btn-sm btn-rounded"
                                onClick={() => handleDelete(el._id)}
                              >
                                <AiOutlineDelete />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
              {view &&
                todos.map((el) => (
                  <>
                    <div key={el._id}>
                      <div
                        className="card m-1"
                        style={{ width: "18rem" }}
                        key={el._id}
                      >
                        <div className="card-body">
                          <h5 className="card-title">Title - {el.title}</h5>
                          <h6
                            className={
                              `${
                                el.tags === "normal"
                                  ? "badge badge-success rounded-pill d-inline text-dark"
                                  : " "
                              } ` +
                              ` ${
                                el.tags === "very-important"
                                  ? "badge badge-danger rounded-pill d-inline text-dark"
                                  : " "
                              } ` +
                              ` ${
                                el.tags === "important"
                                  ? "badge badge-warning  rounded-pill d-inline text-dark"
                                  : " "
                              } ` +
                              ` ${
                                el.tags === "urgent"
                                  ? "badge badge-primary rounded-pill d-inline text-dark"
                                  : " "
                              } `
                            }
                          >
                            {el.tags}
                          </h6>
                          <p className="card-text">
                            Description:- <br />
                            {el.description}
                          </p>
                          <hr />
                          <div className="d-flex  justify-content-between">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleFindish(el._id)}
                            >
                              <IoMdDoneAll />
                            </button>
                            <div>
                              <Link
                                className="btn btn-primary   me-1"
                                to={`/edit/${el._id}`}
                              >
                                <FiEdit />
                              </Link>
                              <button
                                onClick={() => handleDelete(el._id)}
                                className="btn btn-danger   me-1"
                              >
                                <AiOutlineDelete />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination">
                {results.previous && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      aria-label="Previous"
                      onClick={() => setPageNumber(pageNumber - 1)}
                    >
                      <span aria-hidden="true">«</span>
                    </button>
                  </li>
                )}
                <li className="page-item">
                  <button className="page-link">{pageNumber}</button>
                </li>

                {results.next && (
                  <li className="page-item">
                    <button
                      className="page-link"
                      aria-label="Next"
                      onClick={() => setPageNumber(pageNumber + 1)}
                    >
                      <span aria-hidden="true">»</span>
                    </button>
                  </li>
                )}
              </ul>
            </nav>
          </div>

          {/* --- */}
          <div className="col-md-6  bg-light">
            <h1>Finished..</h1>
            <div className="d-flex flex-wrap ">
              {!view && (
                <table className="table align-middle mb-0 bg-white">
                  <thead className="bg-light">
                    <tr>
                      <th>Name</th>
                      <th>Title</th>
                      <th>Status</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {finishedTodos.map((el) => (
                      <>
                        <tr>
                          <td>
                            <div className="d-flex align-items-center">
                              {(fid += 1)}
                            </div>
                          </td>
                          <td>
                            <p>{el.title}</p>
                          </td>
                          <td>
                            <span
                              className={
                                `${
                                  el.tags === "normal"
                                    ? "badge badge-success rounded-pill d-inline text-dark"
                                    : " "
                                } ` +
                                ` ${
                                  el.tags === "very-important"
                                    ? "badge badge-danger rounded-pill d-inline text-dark"
                                    : " "
                                } ` +
                                ` ${
                                  el.tags === "important"
                                    ? "badge badge-warning  rounded-pill d-inline text-dark"
                                    : " "
                                } ` +
                                ` ${
                                  el.tags === "urgent"
                                    ? "badge badge-primary rounded-pill d-inline text-dark"
                                    : " "
                                } `
                              }
                            >
                              {el.tags}
                            </span>
                          </td>
                          <td>
                            <p>{el.description}</p>
                          </td>
                          <td>
                            <div className="d-inline">
                              <button
                                type="button"
                                className="btn btn-link btn-sm btn-rounded"
                                onClick={() => handleUnFindish(el._id)}
                              >
                                <RiInboxUnarchiveLine />
                              </button>
                            </div>
                          </td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              )}
              {view &&
                finishedTodos.map((el) => (
                  <>
                    <div key={el._id}>
                      <div className="card m-1" style={{ width: "18rem" }}>
                        <div className="card-body">
                          <h5 className="card-title">Title :- {el.title}</h5>
                          <h6
                            className={
                              `${
                                el.tags === "normal"
                                  ? "badge badge-success rounded-pill d-inline text-dark"
                                  : " "
                              } ` +
                              ` ${
                                el.tags === "very-important"
                                  ? "badge badge-danger rounded-pill d-inline text-dark"
                                  : " "
                              } ` +
                              ` ${
                                el.tags === "important"
                                  ? "badge badge-warning  rounded-pill d-inline text-dark"
                                  : " "
                              } ` +
                              ` ${
                                el.tags === "urgent"
                                  ? "badge badge-primary rounded-pill d-inline text-dark"
                                  : " "
                              } `
                            }
                          >
                            {el.tags}
                          </h6>
                          <p className="card-text">
                            Discription :- <br />
                            {el.description}
                          </p>
                          <hr />
                          <div className="d-flex  justify-content-between">
                            <button
                              className="btn btn-primary"
                              onClick={() => handleUnFindish(el._id)}
                            >
                              <RiInboxUnarchiveLine />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </>
                ))}
            </div>

            {finishedResults && (
              <nav aria-label="Page navigation example">
                <ul className="pagination">
                  {finishedResults.previous && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        aria-label="Previous"
                        onClick={() =>
                          setFinishedPageNumber(finishedPageNumber - 1)
                        }
                      >
                        <span aria-hidden="true">«</span>
                      </button>
                    </li>
                  )}
                  <li className="page-item">
                    <button className="page-link">{finishedPageNumber}</button>
                  </li>
                  {/* <li className="page-item">
                  <a className="page-link" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link" href="#">
                    3
                  </a>
                </li> */}

                  {finishedResults.next && (
                    <li className="page-item">
                      <button
                        className="page-link"
                        aria-label="Next"
                        onClick={() =>
                          setFinishedPageNumber(finishedPageNumber + 1)
                        }
                      >
                        <span aria-hidden="true">»</span>
                      </button>
                    </li>
                  )}
                </ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default TodoList;
