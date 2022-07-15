export interface ValidationState {
  cameraStatus: "on" | "off";
  videoStream: MediaStream | null;
}
