import { configureStore } from "@reduxjs/toolkit";
import countriesReducer from "./countriesSlice";
import favouritesReducer from "./favouritesSlice";
import visitedReducer from "./visitedSlice";

export default configureStore({
  reducer: {
    countries: countriesReducer,
    favourites: favouritesReducer,
    visited: visitedReducer,
  },
});
