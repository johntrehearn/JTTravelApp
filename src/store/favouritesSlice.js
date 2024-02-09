import { createSlice } from "@reduxjs/toolkit";
import { stat } from 'original-fs';

export const favouritesSlice = createSlice({
  name: "favourites",
  initialState: {
    favourites: [],
  },
  reducers: {
    addFavourite(state, action) {
      if (state.favourites.some((favourites) => favourites.name === action.payload)) 
      state.favourites = [...state.favourites];
    state.favourites = [...state.favourites, action.payload];
  }, 

    /* OLD VERSION
    reducers: {
    addFavourite(state, action) {
      if (state.favourites.includes(action.payload)) {
        return state.favourites;
      } else {

        state.favourites = [...state.favourites, action.payload];
      }
    }, */
    clearFavourites(state, action) {
      state.favourites = [];
    },
  },
});

export const { addFavourite, clearFavourites } = favouritesSlice.actions;

export default favouritesSlice.reducer;
