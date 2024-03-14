import { createSlice } from "@reduxjs/toolkit";
import {
  addVisitedToFirebase,
  auth,
  clearVisitedFromFirebase,
  removeVisitedFromFirebase,
} from "../auth/firebase";

export const visitedSlice = createSlice({
  name: "visited",
  initialState: {
    visited: [],
  },
  reducers: {
    getVisited(state, action) {
      state.visited = action.payload;
    },
    addVisited(state, action) {
      if (state.visited.some((fav) => fav === action.payload))
        state.visited = [...state.visited];
      state.visited = [...state.visited, action.payload];

      const user = auth.currentUser;
      if (user) addVisitedToFirebase(user.uid, action.payload);
    },
    removeVisited(state, action) {
      const newArray = [...state.visited];
      newArray.splice(
        newArray.findIndex((e) => e === action.payload),
        1
      );
      state.visited = [...newArray];

      const user = auth.currentUser;
      if (user) {
        removeVisitedFromFirebase(user.uid, action.payload);
      }
    },
    clearVisited(state) {
      state.visited = [];
      const user = auth.currentUser;
      if (user) {
        clearVisitedFromFirebase(user.uid);
      }
    },
  },
});

export const { getVisited, addVisited, clearVisited, removeVisited } = visitedSlice.actions;

export default visitedSlice.reducer;
