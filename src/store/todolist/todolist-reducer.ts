import {ACTION_TYPE_TODOLIST, ActionsTodolistType, TodoStateType} from './todolist-types';
import {todoAPI} from '../../api/todolist-api';
import {changeTodoEntityStatusAC, createTodoAC, getTodoAC, removeTodoAC, updateTodoTitleAC,} from './todolist-action';
import {RootThunkType} from '../index';
import {getTasksThunk} from '../tasks/tasks-reducer';
import {setAppPreloaderStatusAC} from '../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import axios, {AxiosError} from 'axios';

const initialState: TodoStateType[] = []


export const todolistReducer = (state: TodoStateType[] = initialState, action: ActionsTodolistType): TodoStateType[] => {
    switch (action.type) {
        case ACTION_TYPE_TODOLIST.GET_TODO :
            return action.payload.data.map(el => ({...el, filter: 'all', entityStatus: 'idle'}))
        case ACTION_TYPE_TODOLIST.REMOVE_TODO :
            return state.filter(el => el.id !== action.payload.todoID)
        case ACTION_TYPE_TODOLIST.CREATE_NEW_TODO :
            return [...state, {...action.payload.item, filter: 'all', entityStatus: 'idle'}]
        case ACTION_TYPE_TODOLIST.UPDATE_TODO_TITLE:
            return state.map(el => el.id === action.payload.todoID ?
                {...el, title: action.payload.newTodoTitle} : el)
        case ACTION_TYPE_TODOLIST.CHANGE_TODO_FILTER :
            return state.map(el => el.id === action.payload.todoID ?
                {...el, filter: action.payload.filter}
                : el)
        case ACTION_TYPE_TODOLIST.CHANGE_TODO_ENTITY_STATUS :
            return state.map(el => el.id === action.payload.todoID ?
                {...el, entityStatus: action.payload.entityStatus} : el)
        default:
            return state
    }
}


export const getTodoListsThunk = (): RootThunkType => async (dispatch) => {
    dispatch(setAppPreloaderStatusAC('loading'))

    try {
        const {data} = await todoAPI.getTodo()
        dispatch(getTodoAC(data))
        dispatch(setAppPreloaderStatusAC('succeeded'))
        data.forEach(el => {
            dispatch(getTasksThunk(el.id))
        })
    } catch (error) {
        console.error(error)
    }

}

export const createNewTodoThunk = (title: string): RootThunkType => async (dispatch) => {
    dispatch(setAppPreloaderStatusAC('loading'))
    try {
        const {data} = await todoAPI.createNewTodo(title)
        if (data.resultCode === 0) {
            dispatch(createTodoAC(data.data.item))
            dispatch(setAppPreloaderStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
        }
    } catch (error) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            handleServerNetworkError(error, dispatch)
        }

    }

}

export const removeTodoThunk = (todoID: string): RootThunkType => async (dispatch) => {
    dispatch(setAppPreloaderStatusAC('loading'))
    dispatch(changeTodoEntityStatusAC(todoID, 'loading'))

    try {
        const {data} = await todoAPI.removeTodo(todoID)

        if (data.resultCode === 0) {
            dispatch((removeTodoAC(todoID)))
            dispatch(setAppPreloaderStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
            dispatch(changeTodoEntityStatusAC(todoID, 'failed'))
        }
    } catch (error) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodoEntityStatusAC(todoID, 'failed'))
        }
    }

}

export const updateTodoTitleThunk = (todoID: string, newTodoTitle: string): RootThunkType => async (dispatch) => {
    dispatch(setAppPreloaderStatusAC('loading'))
    dispatch(changeTodoEntityStatusAC(todoID, 'loading'))

    try {
        const {data} = await todoAPI.updateTodoTitle(todoID, newTodoTitle)
        if (data.resultCode === 0) {
            dispatch(updateTodoTitleAC(todoID, newTodoTitle))
            dispatch(setAppPreloaderStatusAC('succeeded'))
            dispatch(changeTodoEntityStatusAC(todoID, 'succeeded'))
        } else {
            handleServerAppError(data, dispatch)
            dispatch(changeTodoEntityStatusAC(todoID, 'failed'))
        }
    } catch (error) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodoEntityStatusAC(todoID, 'failed'))
        }
    }

}


