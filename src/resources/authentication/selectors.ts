import { RootState } from "store/type";
import { createSelector } from "@reduxjs/toolkit";
import { initialState } from "./slice";

const selectCamera = (state: RootState) => state?.camera || initialState;

export const selectCameraStatus = createSelector(
  [selectCamera],
  (audioState) => audioState.cameraStatus
);

export const selectVideoStream = createSelector(
  [selectCamera],
  (cameraState) => cameraState.videoStream
);
