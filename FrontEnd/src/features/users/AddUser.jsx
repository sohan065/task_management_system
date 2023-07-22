import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userRegistration } from "./usersSlice";
import { useNavigate } from "react-router-dom";

export default function AddUser() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userRegistration(user));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> User Registration</h1>
        <div className="form-field">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="phone">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="email">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={getUserData}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
