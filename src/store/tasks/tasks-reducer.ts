import {
    ACTION_TYPE_TASK,
    ActionsTaskType,
    TaskStateType,
    UpdateDomainTaskModelType,
    UpdateTaskModelType
} from './tasks-types';
import {taskAPI} from '../../api/task-api';
import {changeTaskEntityStatusAC, createNewTaskAC, getTasksAC, removeTaskAC, updateTaskAC} from './tasks-action';
import {RootThunkType} from '../index';
import {ACTION_TYPE_TODOLIST} from '../todolist/todolist-types';
import {setAppPreloaderStatusAC} from '../app/app-reducer';
import {handleServerAppError, handleServerNetworkError} from '../../utils/error-utils';
import {changeTodoEntityStatusAC} from '../todolist/todolist-action';
import axios, {AxiosError} from 'axios';


const initialState: TaskStateType = {}


export const tasksReducer = (state: TaskStateType = initialState, action: ActionsTaskType): TaskStateType => {
    switch (action.type) {
        case ACTION_TYPE_TODOLIST.CREATE_NEW_TODO :
            return {
                ...state,
                [action.payload.item.id]: []
            }
        case ACTION_TYPE_TASK.GET_TASKS :
            return {
                ...state,
                [action.payload.todolistId]: action.payload.items.map(el => ({...el, entityStatusTask: 'idle'}))
            }
        case ACTION_TYPE_TASK.CREATE_NEW_TASK :
            return {
                ...state,
                [action.item.todoListId]: [...state[action.item.todoListId], {...action.item, entityStatusTask: 'idle'}]
            }
        case ACTION_TYPE_TASK.REMOVE_TASK :
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].filter(el => el.id !== action.payload.taskID)
            }
        case  ACTION_TYPE_TASK.UPDATE_TASK :
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].map(el => (
                    el.id === action.payload.taskID ? {...el, ...action.payload.apiModel} : el
                ))
            }
        case ACTION_TYPE_TASK.CHANGE_TASK_ENTITY_STATUS:
            return {
                ...state,
                [action.payload.todoID]: state[action.payload.todoID].map(el => (
                    el.id === action.payload.taskID ?
                        {...el, entityStatusTask: action.payload.entityStatus} : el))
            }
        default:
            return state
    }
}


export const getTasksThunk = (todolistId: string): RootThunkType => async (dispatch) => {
    dispatch(setAppPreloaderStatusAC('loading'))
    try {
        const {data} = await taskAPI.getTasks(todolistId)
        dispatch(getTasksAC(data.items, todolistId))
        dispatch(setAppPreloaderStatusAC('succeeded'))
    } catch (e) {
        console.error(e)
    }

}

export const createNewTaskThunk = (title: string, todolistId: string): RootThunkType => async (dispatch) => {
    dispatch(setAppPreloaderStatusAC('loading'))
    dispatch(changeTodoEntityStatusAC(todolistId, 'loading'))

    try {
        const {data} = await taskAPI.createNewTask(title, todolistId)
        if (data.resultCode === 0) {
            dispatch(createNewTaskAC(data.data.item))
            dispatch(setAppPreloaderStatusAC('succeeded'))
            dispatch(changeTodoEntityStatusAC(todolistId, 'succeeded'))
        } else {
            handleServerAppError(data, dispatch)
            dispatch(changeTodoEntityStatusAC(todolistId, 'failed'))
        }
    } catch (error) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTodoEntityStatusAC(todolistId, 'failed'))
        }
    }

}

export const removeTaskThunk = (taskID: string, todoID: string): RootThunkType => async (dispatch) => {
    dispatch(setAppPreloaderStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todoID, taskID, 'loading'))

    try {
        const {data} = await taskAPI.removeTask(todoID, taskID)
        if (data.resultCode === 0) {
            dispatch(removeTaskAC(taskID, todoID))
            dispatch(setAppPreloaderStatusAC('succeeded'))
        } else {
            handleServerAppError(data, dispatch)
            dispatch(changeTaskEntityStatusAC(todoID, taskID, 'failed'))

        }
    } catch (error) {
        if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
            handleServerNetworkError(error, dispatch)
            dispatch(changeTaskEntityStatusAC(todoID, taskID, 'failed'))
        }
    }

}

export const updateTaskThunk = (todoID: string, taskID: string, domainModel: UpdateDomainTaskModelType): RootThunkType =>
    async (dispatch, getState) => {
        const task = getState().tasks[todoID];
        const currentlyTask = task.find(el => el.id === taskID)

        if (currentlyTask) {
            const apiModel: UpdateTaskModelType = {
                status: currentlyTask.status,
                title: currentlyTask.title,
                completed: false,
                deadline: currentlyTask.deadline,
                description: currentlyTask.description,
                priority: currentlyTask.priority,
                startDate: currentlyTask.startDate,
                ...domainModel
            }

            dispatch(setAppPreloaderStatusAC('loading'))
            dispatch(changeTaskEntityStatusAC(todoID, taskID, 'loading'))
            try {
                const {data} = await taskAPI.updateTask(todoID, taskID, apiModel)
                if (data.resultCode === 0) {
                    dispatch(updateTaskAC(todoID, taskID, apiModel))
                    dispatch(setAppPreloaderStatusAC('succeeded'))
                    dispatch(changeTaskEntityStatusAC(todoID, taskID, 'succeeded'))
                } else {
                    handleServerAppError(data, dispatch)
                    dispatch(changeTaskEntityStatusAC(todoID, taskID, 'failed'))
                }
            } catch (error) {
                if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
                    handleServerNetworkError(error, dispatch)
                    dispatch(changeTaskEntityStatusAC(todoID, taskID, 'failed'))
                }
            }
        }
    }