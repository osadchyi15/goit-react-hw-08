import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
};

const filtersSlice = createSlice({
  name: "filters",
  initialState,
  selectors: {
    selectFilters: (state) => state.name,
  },
  reducers: {
    changeFilter: (state, action) => {
      state.name = action.payload;
    },
  },
});

export const filtersSliceReducer = filtersSlice.reducer;
export const { changeFilter } = filtersSlice.actions;
export const { selectFilters } = filtersSlice.selectors;
