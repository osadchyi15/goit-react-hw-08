import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { setEditingItem, setIsEdit } from "./slice";
import { goItApi } from "../auth/operations";

const toastParams = {
  position: "bottom-right",
  duration: "500",
  style: {
    textAlign: "left",
    background: "rgba(200, 200, 200)",
    border: "1px solid black",
    boxShadow: "3px 3px 5px rgb(33, 33, 33)",
  },
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await goItApi.get("/contacts");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (body, thunkAPI) => {
    try {
      const { data } = await goItApi.post(`/contacts`, body);
      toast.success(
        `Contact:\n Name: ${body.name}\nNumber: ${body.number}\nhas just been added`,
        toastParams
      );
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async (id, thunkAPI) => {
    try {
      const { data } = await goItApi.delete(`/contacts/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const editContact = createAsyncThunk(
  "contacts/editContact",
  async (body, thunkAPI) => {
    try {
      await goItApi.patch(`/contacts/${body.id}`, {
        name: body.name,
        number: body.number,
      });
      thunkAPI.dispatch(fetchContacts());
      thunkAPI.dispatch(setIsEdit(false));
      thunkAPI.dispatch(setEditingItem({}));
      toast.success(
        `Contact:\n Name: ${body.name}\nNumber: ${body.number}\nhas just been changed`,
        toastParams
      );
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
