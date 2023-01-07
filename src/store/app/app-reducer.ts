import { setAppErrorAC, setAppPreloaderStatusAC } from "./app-actions";

export enum ACTION_TYPE_APP {
  SET_APP_STATUS = "@@app/SET_APP_STATUS",
  SET_APP_ERROR = "@@app/SET_APP_ERROR",
}

export type AppActionType =
  | ReturnType<typeof setAppErrorAC>
  | ReturnType<typeof setAppPreloaderStatusAC>;

export type RequestStatusType = "idle" | "loading" | "succeeded" | "failed";

interface InitialStateStatusType {
  status: RequestStatusType;
  error: string | null;
}

const initialStateApp = {
  status: "idle" as RequestStatusType,
  error: null,
};

export const appReducer = (
  state: InitialStateStatusType = initialStateApp,
  action: AppActionType
): InitialStateStatusType => {
  switch (action.type) {
    case ACTION_TYPE_APP.SET_APP_STATUS:
      return { ...state, status: action.payload.status };
    case ACTION_TYPE_APP.SET_APP_ERROR:
      return { ...state, error: action.payload.error };

    default:
      return state;
  }
};
