import { createSelector } from "@reduxjs/toolkit";
import { selectFilters } from "../filters/selectors";

export const selectContacts = (state) => state.contacts.items;
export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectIsError = (state) => state.contacts.isError;
export const selectIsModalOpen = (state) => state.contacts.isModalOpen;
export const selectDeletingItem = (state) => state.contacts.deletingItem;

export const selectFilteredContacts = createSelector(
  [selectContacts, selectFilters],
  (contacts, filterValue) => {
    return contacts.filter((item) =>
      item.name.toLowerCase().includes(filterValue.toLowerCase())
    );
  }
);
