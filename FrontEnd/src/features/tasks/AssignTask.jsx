import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { assignTask } from "./taskSlice";
import { useNavigate } from "react-router-dom";

export default function AssignTask() {
  const [task, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = (e) => {
    setUser({ ...task, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(assignTask(task));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> Assign Task</h1>
        <div className="form-field">
        <label htmlFor="taskOptions">Select a Task:</label>
        <select id="taskOptions" name="taskOptions" onChange={getUserData} required>
          <option value="">Select a task...</option>
          <option value="task1">Task 1</option>
          <option value="task2">Task 2</option>
          <option value="task3">Task 3</option>
        </select>
       </div>
       <div className="form-field">
       <label htmlFor="user">User:</label>
          <select
            id="user"
            name="user"
            onChange={getUserData}
            required
          >
            <option value="">Select a user...</option>
            <option value="user1">User 1</option>
            <option value="user2">User 2</option>
            <option value="user3">User 3</option>
          </select>
        </div>

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
