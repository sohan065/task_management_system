import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createTask = createAsyncThunk(
  "createTask",
  async (data, { rejectWithValue }) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/user/create/task",
      data
    );
    try {
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const assignTask = createAsyncThunk(
  "assignTask",
  async (data, { rejectWithValue }) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/user/task/assign",
      data
    );
    try {
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getAllTask = createAsyncThunk("task/getAllTask", async () => {
  const response = await axios.get(
    "http://127.0.0.1:8000/user/task/get/all"
  );
  return response.data;
});

export const taskSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllTask.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(assignTask.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(assignTask.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(assignTask.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default taskSlice.reducer;
