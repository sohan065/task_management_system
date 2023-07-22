import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "./taskSlice";
import { useNavigate } from "react-router-dom";

export default function AddTask() {
  const [task, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = (e) => {
    setUser({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createTask(task));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> User Registration</h1>
        <div className="form-field">
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            id="description"
            name="description"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="deadline">Deadline:</label>
          <input
            type="text"
            id="deadline"
            name="deadline"
            onChange={getUserData}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
