import { RootState } from "store/type";
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";

const selectCamera = (state: RootState) => state?.validation || initialState;

export const selectCameraStatus = createSelector(
  [selectCamera],
  (audioState) => audioState.cameraStatus
);

export const selectVideoStream = createSelector(
  [selectCamera],
  (cameraState) => cameraState.videoStream
);
