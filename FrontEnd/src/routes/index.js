import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Error from "../pages/Error";
import Navbar from "../layouts/Navbar";
import AddUser from "../features/users/AddUser";
import UserLogin from "../features/users/UserLogin";
import AddTask from "../features/tasks/AddTask";
import AssignTask from "../features/tasks/AssignTask";
export default function Index() {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-reg" element={<AddUser />} />
          <Route path="/user-login" element={<UserLogin />} />
          <Route path="/task-add" element={<AddTask />} />
          <Route path="/task-assign" element={<AssignTask />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}
