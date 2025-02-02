import { createSelector } from "@reduxjs/toolkit";
import { selectFilters } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;
export const selectDeletingItem = (state) => state.contacts.deletingItem;
export const selectIsEdit = (state) => state.contacts.isEdit;
export const selectEditingItem = (state) => state.contacts.editingItem;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, filterValue) => {
    return contacts.filter(
      (item) =>
        item.name.toLowerCase().includes(filterValue.toLowerCase()) ||
        item.number.includes(filterValue)
    );
  }
);
