import { validationApi } from "resources/validation/api";
import { configureStore, StoreEnhancer } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";

import { RTKQueryReducers } from "./rtk-query";
import { validationReducer } from "resources/validation/slice";
import { RTKQueryMiddlewares } from "./rtk-query";
import { reducers } from "./reducers";

export function configureAppStore() {
  const store = configureStore({
    reducer: {
      ...RTKQueryReducers,
      ...reducers,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([...RTKQueryMiddlewares]),
    devTools:
      /* istanbul ignore next line */
      process.env.NODE_ENV !== "production",
  });

  return store;
}
