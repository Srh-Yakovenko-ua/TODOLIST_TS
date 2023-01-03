import {AppActionType, setAppErrorAC, setAppPreloaderStatusAC} from '../store/app/app-reducer';
import {Dispatch} from 'redux';
import {ResponseTodoType} from '../store/todolist/todolist-types';

type ErrorUtilsDispatchType = Dispatch<AppActionType>

export const handleServerAppError = <T>(data: ResponseTodoType<T>, dispatch: ErrorUtilsDispatchType) => {
    if (data.messages.length) {
        dispatch(setAppErrorAC(data.messages[0]))
    } else {
        dispatch(setAppErrorAC('Some error occurred'))
    }
    dispatch(setAppPreloaderStatusAC('failed'))
}

export const handleServerNetworkError = (error: { message: string }, dispatch: ErrorUtilsDispatchType) => {
    dispatch(setAppErrorAC(error.message))
    dispatch(setAppPreloaderStatusAC('failed'))
}
