import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  GroupRule,
  FieldType,
  Validation,
  ValidationField,
  ValidationState,
} from "./types";
import { nanoid } from "nanoid";
import { validationApi } from "./api";

const rules = [
  "email",
  "string",
  "katakana",
  "hirakana",
  "isEmpty",
  "isBoolean",
  "isUnique",
  "isAlpha",
  "isAlphanumeric",
  "isAscii",
  "isBtcAddress",
];

export const fieldTypes: FieldType[] = ["number", "object", "string"];

export const initialState: ValidationState = {
  rules: rules,
  validationSelected: null,
  validations: [],
  openDialogAdd: false,
};

const slice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    setValidations(state, action: PayloadAction<Validation[]>) {
      state.validations = action.payload;
    },
    updateValidations(state) {
      const validationIndex = state.validations.findIndex(
        (validation) => validation.id === state.validationSelected?.id
      );
      if (validationIndex !== -1 && state.validationSelected) {
        state.validations[validationIndex] = state.validationSelected;
      }
    },
    addValidation(state, action: PayloadAction<Validation>) {
      state.validations.push(action.payload);
    },
    setValidationSelected(state, action: PayloadAction<Validation | null>) {
      state.validationSelected = action.payload;
    },
    toggleOpenDialogAdd(state) {
      state.openDialogAdd = !state.openDialogAdd;
      // this.getIndex(state, { payload: {} });
    },

    addField(
      state,
      action: PayloadAction<{ validation: Validation; field: ValidationField }>
    ) {
      const validationIndex = state.validations.findIndex(
        (validation) => validation.id === action.payload.validation.id
      );
      if (validationIndex !== -1) {
        state.validations[validationIndex].fields.push(action.payload.field);
      }
    },
    updateFieldName(
      state,
      action: PayloadAction<{ field: ValidationField; fieldName: string }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field.id
      );
      if (fieldIndex !== -1 && state.validationSelected) {
        state.validationSelected.fields[fieldIndex as number].name =
          action.payload.fieldName;
      }
    },

    updateFieldRequired(
      state,
      action: PayloadAction<{ field: ValidationField; required: boolean }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field.id
      );
      if (fieldIndex !== -1 && state.validationSelected) {
        state.validationSelected.fields[fieldIndex as number].required =
          action.payload.required;
      }
    },
    removeField() {},
    updateField() {},
    updateFieldType(
      state,
      action: PayloadAction<{
        field: ValidationField | undefined;
        type: FieldType;
      }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field?.id
      );
      if (fieldIndex !== -1 && state.validationSelected) {
        state.validationSelected.fields[fieldIndex as number].type =
          action.payload.type;
      }
    },
    addRule(
      state,
      action: PayloadAction<{
        field: ValidationField | undefined;
        rule: GroupRule | undefined;
      }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field?.id
      );

      if (fieldIndex !== -1 && action.payload.rule) {
        state.validationSelected?.fields[fieldIndex as number].groupRules.push(
          action.payload.rule
        );
      }
    },
    removeRule(
      state,
      action: PayloadAction<{
        field: ValidationField | undefined;
        rule: GroupRule | undefined;
      }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field?.id
      );

      if (fieldIndex !== -1 && action.payload.rule) {
        const rules = state.validationSelected?.fields[
          fieldIndex as number
        ].groupRules.filter((rule) => rule.id !== action.payload.rule?.id);
        if (state.validationSelected) {
          state.validationSelected.fields[fieldIndex as number].groupRules =
            rules as GroupRule[];
        }
      }
    },
    updateRule(
      state,
      action: PayloadAction<{
        field: ValidationField | undefined;
        rule: GroupRule | undefined;
        value: string[];
      }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field?.id
      );

      if (fieldIndex !== -1 && state.validationSelected) {
        const ruleIndex = state.validationSelected.fields[
          fieldIndex as number
        ].groupRules.findIndex((rule) => rule.id === action.payload.rule?.id);
        if (ruleIndex !== -1 && action.payload.rule) {
          state.validationSelected.fields[fieldIndex as number].groupRules[
            ruleIndex
          ].rules = action.payload.value;
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      validationApi.endpoints.fetchValidationList.matchFulfilled,
      (state, action) => {
        state.validations = action.payload;
      }
    );
  },
});

export const { actions: audioActions } = slice;

export const useValidationSlice = () => {
  return { actions: slice.actions };
};

export const validationReducer = slice.reducer;
