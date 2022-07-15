import { useSelector } from "react-redux"
import { selectCameraStatus } from "../selectors"

export default function Button() {
    const xxx = useSelector(selectCameraStatus);
    console.log(xxx);
    return <div>Button</div>
}