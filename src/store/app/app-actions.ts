import { ACTION_TYPE_APP, RequestStatusType } from "./app-reducer";

export const setAppPreloaderStatusAC = (status: RequestStatusType) =>
  ({
    type: ACTION_TYPE_APP.SET_APP_STATUS,
    payload: {
      status,
    },
  } as const);

export const setAppErrorAC = (error: string | null) =>
  ({
    type: ACTION_TYPE_APP.SET_APP_ERROR,
    payload: {
      error,
    },
  } as const);
