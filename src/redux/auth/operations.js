import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

export const goItApi = axios.create({
  baseURL: "https://connections-api.goit.global",
});

export const setAuthHeaders = (token) => {
  goItApi.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const registerThunk = createAsyncThunk(
  "auth/register",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goItApi.post("users/signup", credentials);
      setAuthHeaders(data.token);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response.data.code === 11000) {
        toast.error("User already exist!");
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (credentials, thunkApi) => {
    try {
      const { data } = await goItApi.post("users/login", credentials);
      setAuthHeaders(data.token);
      return data;
    } catch (error) {
      console.log(error);
      if (error.response && Object.keys(error.response.data).length === 0) {
        toast.error(`User does not exist!\nYou need to register.`);
        return thunkApi.rejectWithValue(error.message);
      }
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkApi) => {
    try {
      const { data } = await goItApi.post("users/logout");
      return data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const refreshUserThunk = createAsyncThunk(
  "auth/refresh",
  async (_, thunkApi) => {
    const savedToken = thunkApi.getState().auth.token;
    if (!savedToken) {
      return thunkApi.rejectWithValue("Token is not exist");
    }

    setAuthHeaders(savedToken);

    try {
      const { data } = await goItApi.get("users/current");
      return data;
    } catch (error) {
      console.log(error);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
