import { AppState } from "resources/app/types";
import { CameraState } from "resources/authentication/types";
import { ValidationState } from "resources/validation/types";

export interface RootState {
    app: AppState,
    camera: CameraState,
    validation: ValidationState,
}