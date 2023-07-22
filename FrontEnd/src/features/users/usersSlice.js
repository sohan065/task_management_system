import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const userRegistration = createAsyncThunk(
  "userRegistration",
  async (data, { rejectWithValue }) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/user/registration",
      data
    );
    try {
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);
export const userLogin = createAsyncThunk(
  "userLogin",
  async (data, { rejectWithValue }) => {
    const res = await axios.post(
      "http://127.0.0.1:8000/user/login",
      data
    );
    try {
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response);
    }
  }
);

export const getAllUser = createAsyncThunk("getAllUser", async () => {
  const response = await axios.get(
    "http://127.0.0.1:8000/user/get/all"
  );
  return response.data;
});

export const userSlice = createSlice({
  name: "users",
  initialState: {
    isLoading: false,
    users: [],
    error: "",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(userRegistration.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userRegistration.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(userRegistration.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(getAllUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(getAllUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload;
      })
      .addCase(getAllUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      })
      .addCase(userLogin.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(userLogin.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
