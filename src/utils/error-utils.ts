import {
  setAppErrorAC,
  setAppPreloaderStatusAC,
} from "../store/app/app-actions";
import { Dispatch } from "redux";
import { GeneralResponseType } from "../store/todolist/todolist-types";
import { AppActionType } from "../store/app/app-reducer";

type ErrorUtilsDispatchType = Dispatch<AppActionType>;

export const handleServerAppError = <T>(
  data: GeneralResponseType<T>,
  dispatch: ErrorUtilsDispatchType
): void => {
  if (data.messages.length) {
    dispatch(setAppErrorAC(data.messages[0]));
  } else {
    dispatch(setAppErrorAC("Some error occurred"));
  }
  dispatch(setAppPreloaderStatusAC("failed"));
};

export const handleServerNetworkError = (
  error: { message: string },
  dispatch: ErrorUtilsDispatchType
): void => {
  dispatch(setAppErrorAC(error.message));
  dispatch(setAppPreloaderStatusAC("failed"));
};
