import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { appActions, useAppSlice } from "resources/app/slice";

export default function ValidationDetail() {
  const { actions: appActions } = useAppSlice();
  const dispatch = useDispatch();

  return <div>xxx</div>;
}
