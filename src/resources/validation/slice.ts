import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import {
  FieldRule,
  FieldType,
  Validation,
  ValidationField,
  ValidationState,
} from "./types";
import { nanoid } from "nanoid";

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

const validation: Validation = {
  id: "bOkhjRh75MdoYkFE8KeuB",
  name: "Register",
  fields: [
    {
      id: "Rqyn3hifN6CminGAn7tnj",
      name: "email",
      type: "string",
      rules: [],
      required: true,
    },
  ],
};

export const initialState: ValidationState = {
  rules: rules,
  validationSelected: null,
  validations: [validation],
  openDialogAdd: false,
};
const slice = createSlice({
  name: "validation",
  initialState,
  reducers: {
    addValidation(state, action: PayloadAction<Validation>) {
      state.validations.push(action.payload);
    },
    updateValidation(state, action: PayloadAction<Validation>) {},
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
        rule: FieldRule | undefined;
      }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field?.id
      );

      if (fieldIndex !== -1 && action.payload.rule) {
        state.validationSelected?.fields[fieldIndex as number].rules.push(
          action.payload.rule
        );
      }
    },
    removeRule(
      state,
      action: PayloadAction<{
        field: ValidationField | undefined;
        rule: FieldRule | undefined;
      }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field?.id
      );

      if (fieldIndex !== -1 && action.payload.rule) {
        const rules = state.validationSelected?.fields[
          fieldIndex as number
        ].rules.filter((rule) => rule.id !== action.payload.rule?.id);
        if (state.validationSelected) {
          state.validationSelected.fields[fieldIndex as number].rules =
            rules as FieldRule[];
        }
      }
    },
    updateRule(
      state,
      action: PayloadAction<{
        field: ValidationField | undefined;
        rule: FieldRule | undefined;
        value: string[];
      }>
    ) {
      const fieldIndex = state.validationSelected?.fields.findIndex(
        (field) => field.id === action.payload.field?.id
      );

      if (fieldIndex !== -1 && state.validationSelected) {
        const ruleIndex = state.validationSelected.fields[
          fieldIndex as number
        ].rules.findIndex((rule) => rule.id === action.payload.rule?.id);
        if (ruleIndex !== -1 && action.payload.rule) {
          state.validationSelected.fields[fieldIndex as number].rules[
            ruleIndex
          ].value = action.payload.value;
        }
      }
    },
  },
});

export const { actions: audioActions } = slice;

export const useValidationSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
