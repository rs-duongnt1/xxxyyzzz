import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import { AppState } from "./types";
export const initialState: AppState = {
  loading: true,
};
const slice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading(state, action: PayloadAction<boolean>) {
      console.log('setLoading', action.payload);
      state.loading = action.payload;
    },
  },
});

export const { actions: appActions } = slice;

export const useAppSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
