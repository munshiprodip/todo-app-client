import axios from "axios";
import React, { useContext, useState } from "react";
import { UserContext } from "../../App";

const AddForm = () => {
  const { loggedInUser, reloadData } = useContext(UserContext);
  const [newTodo, setNewTodo] = useState({ name: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://vast-cliffs-30420.herokuapp.com/todos/`;

    axios
      .post(url, newTodo)
      .then((response) => {
        console.log(response.data.message);
        reloadData();
      })
      .catch((error) => {
        console.log(error);
      });

    // setData([...data, newTodo]);
    setNewTodo({ name: "", email: "" });
  };

  const handleInputChange = (e) => {
    setNewTodo({
      email: loggedInUser.email,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="input-group mb-3">
        <input
          type="text"
          name="name"
          className="form-control"
          placeholder="Add new todo"
          aria-describedby="button-addon2"
          value={newTodo.name}
          onChange={handleInputChange}
        />
        <button
          className="btn btn-outline-secondary"
          type="submit"
          id="button-addon2"
        >
          ADD
        </button>
      </div>
    </form>
  );
};

export default AddForm;
