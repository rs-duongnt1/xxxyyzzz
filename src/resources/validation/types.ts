export interface FieldRule {
  id: string;
  title?: string;
  value: string[];
}

export type FieldType = "string" | "object" | "number";
export interface ValidationField {
  id: string;
  name: string;
  type: FieldType;
  rules: FieldRule[];
  required: boolean;
}
export interface Validation {
  id: string;
  name: string;
  fields: ValidationField[];
}

export interface ValidationState {
  rules: string[];
  validationSelected: Validation | null;
  validations: Validation[];
  openDialogAdd: boolean;
}
