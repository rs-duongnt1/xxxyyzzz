import {
  useInjectReducer as useReducer,
  useInjectSaga as useSaga,
} from "redux-injectors";
import {
  RootStateKeyType,
  InjectReducerParams,
  InjectSagaParams,
} from "./types/injector-typings";

export function useInjectReducer<Key extends RootStateKeyType>(
  params: InjectReducerParams<Key>
) {
  return useReducer(params as any);
}

export function useInjectSaga(params: InjectSagaParams) {
  return useSaga(params as any);
}
