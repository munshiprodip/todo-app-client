import axios from "axios";
import React, { useContext } from "react";
import { UserContext } from "../../App";

const EditForm = () => {
  const { setActiveForm, toEditTodo, setToEditTodo, reloadData } =
    useContext(UserContext);

  const handleEditChange = (e) => {
    setToEditTodo({
      ...toEditTodo,
      [e.target.name]: e.target.value,
    });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();

    const url = `http://localhost:5000/todos/updateTodo/${toEditTodo._id}`;

    axios
      .put(url, toEditTodo)
      .then((response) => {
        console.log(response.data.message);
        reloadData();
        setToEditTodo({});
        setActiveForm("add");
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <form onSubmit={handleEditSubmit} className="form">
      <div className="input-group mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Add new todo"
          aria-describedby="button-addon2"
          value={toEditTodo.name}
          onChange={handleEditChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
        >
          UPDATE
        </button>
      </div>
    </form>
  );
};

export default EditForm;
