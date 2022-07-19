import { RootState } from "store/type";
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";

const selectValidation = (state: RootState) =>
  state?.validation || initialState;

export const selectValidationList = createSelector(
  [selectValidation],
  (validationState) => validationState.validations
);

export const selectValidationSelected = createSelector(
  [selectValidation],
  (validationState) => validationState.validationSelected
);

export const selectOpenDialogAdd = createSelector(
  [selectValidation],
  (validationState) => validationState.openDialogAdd
);

export const selectRules = createSelector(
  [selectValidation],
  (validationState) => validationState.rules
);
