import { configureStore } from "@reduxjs/toolkit";
import UserReducer from "../features/users/usersSlice";
import TaskReducer from "../features/tasks/taskSlice";

const store = configureStore({
  reducer: {
    userReducer: UserReducer,
    taskReducer: TaskReducer,
  },
});

export default store;
