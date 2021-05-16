import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../App";
import {
  googleSignIn,
  initializeAppfirebase,
} from "../../Firebase/FirebaseAuthentication";
import AddForm from "../AddForm/AddForm";
import EditForm from "../EditForm/EditForm";

initializeAppfirebase();

const MainContent = () => {
  const signInWithGoogle = () => {
    googleSignIn().then((res) => {
      setIsLoggedIn(true);
      setLoggedInUser(res);
    });
  };

  const {
    activeForm,
    setActiveForm,
    toEditTodo,
    setToEditTodo,
    data,
    setData,
    reloadData,
    isLoggedIn,
    setIsLoggedIn,
    loggedInUser,
    setLoggedInUser,
  } = useContext(UserContext);

  // Update Todo status to complete
  const handleCheckBox = (e) => {
    console.log(e.target.value);
    const url = `http://localhost:5000/todos/updateStatus/${e.target.value}`;

    axios
      .put(url)
      .then((response) => {
        console.log(response.data.message);
        reloadData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Avoid update already completed Todo
  const stayChecked = (e) => {
    e.target.checked = "checked";
  };

  // Update Todo priority
  const changePriority = (id, value) => {
    const url = `http://localhost:5000/todos/updatePriority/${id}`;

    axios
      .put(url, { value: value })
      .then((response) => {
        console.log(response.data.message);
        reloadData();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Delete completed Todo
  const deleteTodo = (id) => {
    const url = `http://localhost:5000/todos/delete/${id}`;
    axios
      .delete(url)
      .then((response) => {
        console.log(response.data.message);
        reloadData();
      })
      .catch((err) => {
        console.log(err);
      });

    let updateData = data.filter((item) => item._id !== id);
    setData(updateData);
  };

  // Edit Todo
  const editTodo = (id) => {
    let toEditData = data.find((item) => item._id === id);
    console.log(toEditData);
    setToEditTodo(toEditData);
    setActiveForm("edit");
  };

  return isLoggedIn ? (
    <div className="d-flex justify-content-center m-5 flex-column align-items-center">
      <div className="col-md-6">
        {activeForm === "add" ? (
          <AddForm reloadData={reloadData} />
        ) : (
          <EditForm />
        )}
      </div>

      <div className="col-md-6">
        {/* <div className="d-flex justify-content-center align-items-center col-md-3 float-end">
          <span className="me-2">
            <i className="fas fa-sort-amount-down"></i>
          </span>
          <select
            className="form-select form-select-sm"
            aria-label="Default select example"
            //onSelect={filterTodo}
          >
            <option value="all" selected>
              All Todos
            </option>
            <option value="pending">Pending</option>
            <option value="complete">Complete</option>
          </select>
        </div> */}
        <table className="table ">
          <tbody>
            {data.map((todo) => (
              <tr key={todo._id}>
                <td width="30px">
                  <input
                    className="form-check-input"
                    defaultChecked={todo.status === 1}
                    type="checkbox"
                    value={todo._id}
                    onChange={todo.status === 1 ? stayChecked : handleCheckBox}
                  />
                </td>
                <td
                  className={
                    todo.status === 1 ? "text-decoration-line-through" : ""
                  }
                >
                  {todo.name}
                </td>
                <td className="text-warning" width="90px">
                  {/* <i className="fa fa-star"></i> */}
                  <span>
                    <i
                      onClick={() => changePriority(todo._id, 1)}
                      //className="far fa-star"
                      className={`${
                        todo.priority > 0 ? "fa " : "far "
                      } fa-star`}
                    ></i>
                  </span>
                  <span className="mx-1">
                    <i
                      onClick={() => changePriority(todo._id, 2)}
                      className={`${
                        todo.priority > 1 ? "fa " : "far "
                      } fa-star`}
                    ></i>
                  </span>
                  <span>
                    <i
                      onClick={() => changePriority(todo._id, 3)}
                      className={`${
                        todo.priority > 2 ? "fa " : "far "
                      } fa-star`}
                    ></i>
                  </span>
                </td>
                <td className="text-end" width="30px">
                  {todo.status === 0 ? (
                    <button
                      type="button"
                      onClick={() => editTodo(todo._id)}
                      className="btn btn-outline-info btn-sm"
                    >
                      <span>
                        <i className="fa fa-edit"></i>
                      </span>
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => deleteTodo(todo._id)}
                      className="btn btn-outline-danger btn-sm"
                    >
                      <span>
                        <i className="fa fa-trash"></i>
                      </span>
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div
      style={{ height: "60vh" }}
      className="d-flex justify-content-center align-items-center"
    >
      <div className="col-md-6 text-center">
        <p>Sign in to manage your todos</p>
        <button onClick={signInWithGoogle} className="btn btn-danger">
          Login
        </button>
      </div>
    </div>
  );
};

export default MainContent;
