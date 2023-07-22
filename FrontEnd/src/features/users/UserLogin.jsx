import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "./usersSlice";
import { useNavigate } from "react-router-dom";

export default function UserLogin() {
  const [user, setUser] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getUserData = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(userLogin(user));
    navigate("/");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1> Log In</h1>
        <div className="form-field">
          <label htmlFor="name">Phone:</label>
          <input
            type="text"
            id="phone"
            name="phone"
            onChange={getUserData}
            required
          />
        </div>
        <div className="form-field">
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            id="password"
            name="password"
            onChange={getUserData}
            required
          />
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
}
