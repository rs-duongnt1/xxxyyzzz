import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useInjectReducer } from "utils/redux-injectors";
import { CameraState } from "./types";
export const initialState: CameraState = {
  cameraStatus: "off",
  videoStream: null,
};
const slice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    toggleCamera(state, action: PayloadAction<"on" | "off">) {
      state.cameraStatus = action.payload;
    },
    setVideoStream(state, action: PayloadAction<MediaStream | null>) {
      state.videoStream = action.payload;
    },
  },
});

export const { actions: audioActions } = slice;

export const useCameraSlice = () => {
  useInjectReducer({ key: slice.name, reducer: slice.reducer });
  return { actions: slice.actions };
};
