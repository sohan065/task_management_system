import React from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <Link to="/" className="nav-link">
        Home
      </Link>
      <Link to="/user-reg" className="nav-link">
        User Registration
      </Link>
      <Link to="/user-login" className="nav-link">
        User Login
      </Link>
      <Link to="/task-add" className="nav-link">
        Add Task
      </Link>
      <Link to="/task-assign" className="nav-link">
        Assign Task
      </Link>
    </nav>
  );
}
