export interface GroupRule {
  id: string;
  rules: string[];
  customMessage: string;
}

export type FieldType = "string" | "object" | "number";
export interface ValidationField {
  id: string;
  name: string;
  type: FieldType;
  groupRules: GroupRule[];
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
