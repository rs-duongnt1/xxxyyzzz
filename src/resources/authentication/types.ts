export interface CameraState {
  cameraStatus: "on" | "off";
  videoStream: MediaStream | null;
}
