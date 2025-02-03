import { createSlice, isAnyOf } from "@reduxjs/toolkit";
import {
  addContact,
  deleteContact,
  fetchContacts,
  editContact,
} from "./operations";
import toast from "react-hot-toast";
import { logoutThunk } from "../auth/operations";

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

const initialState = {
  items: [],
  isLoading: false,
  isError: false,
  deletingItem: {},
  isEdit: false,
  editingItem: {},
};

const contactsSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setDeletingItem: (state, action) => {
      state.deletingItem = action.payload;
    },
    setIsEdit: (state, action) => {
      state.isEdit = action.payload;
    },
    setEditingItem: (state, action) => {
      state.editingItem = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.items = action.payload;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.items = state.items.filter(
          (item) => item.id !== action.payload.id
        );
        state.isLoading = false;
        state.isError = false;
        toast.error(
          `Contact:\n Name: ${action.payload.name}\nNumber: ${action.payload.number}\nhas just been deleted`,
          toastParams
        );
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.items.push(action.payload);
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(editContact.fulfilled, (state, action) => {
        state.items = state.items.map((item) =>
          item.id === state.editingItem.id ? action.payload : item
        );
        state.isError = false;
        state.isLoading = false;
      })
      .addCase(logoutThunk.fulfilled, (state, action) => {
        state.items = [];
      })

      .addMatcher(
        isAnyOf(
          fetchContacts.pending,
          addContact.pending,
          deleteContact.pending,
          editContact.pending
        ),
        (state, action) => {
          state.isError = false;
          state.isLoading = true;
        }
      )
      .addMatcher(
        isAnyOf(
          fetchContacts.rejected,
          addContact.rejected,
          deleteContact.rejected,
          editContact.rejected
        ),
        (state, action) => {
          state.isError = action.payload;
          state.isLoading = false;
        }
      );
  },
});

export const contactsSliceReducer = contactsSlice.reducer;
export const { setDeletingItem, setIsEdit, setEditingItem } =
  contactsSlice.actions;
