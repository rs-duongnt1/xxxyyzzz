import { RootState } from "store/type";
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";

const appSelector = (state: RootState) => state?.app || initialState;

export const selectLoading = createSelector(
  [appSelector],
  (appState) => appState.loading
);
