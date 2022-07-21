import { validationApi } from "resources/validation/api";

export const APIs = {
  validationApi: validationApi,
};

export const RTKQueryReducers = {
  [validationApi.reducerPath]: validationApi.reducer,
};

export const RTKQueryMiddlewares = Object.values(APIs).map(
  (api) => api.middleware
);
