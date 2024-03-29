import axios, { AxiosError } from 'axios'

import { taskAPI } from '../../api/task-api'
import { setAppPreloaderStatusAC } from '../app/app-actions'
import { RootThunkType } from '../store'
import { changeTodoEntityStatusAC } from '../todolist/todolist-action'
import { ACTION_TYPE_TODOLIST } from '../todolist/todolist-types'

import {
  changeTaskEntityStatusAC,
  createNewTaskAC,
  getTasksAC,
  removeTaskAC,
  updateTaskAC,
} from './tasks-action'
import {
  ACTION_TYPE_TASK,
  ActionsTaskType,
  TaskStateType,
  UpdateDomainTaskModelType,
  UpdateTaskModelType,
} from './tasks-types'

import { RESPONSE_RESULT_CODE_SUCCESS, handleServerAppError, handleServerNetworkError } from 'utils'

const initialState: TaskStateType = {}

export const tasksReducer = (
  state: TaskStateType = initialState,
  action: ActionsTaskType
): TaskStateType => {
  switch (action.type) {
    case ACTION_TYPE_TODOLIST.CREATE_NEW_TODO:
      return {
        ...state,
        [action.payload.item.id]: [],
      }
    case ACTION_TYPE_TASK.GET_TASKS:
      return {
        ...state,
        [action.payload.todolistId]: action.payload.items.map(el => ({
          ...el,
          entityStatusTask: 'idle',
        })),
      }
    case ACTION_TYPE_TASK.CREATE_NEW_TASK:
      return {
        ...state,
        [action.item.todoListId]: [
          ...state[action.item.todoListId],
          { ...action.item, entityStatusTask: 'idle' },
        ],
      }
    case ACTION_TYPE_TASK.REMOVE_TASK:
      return {
        ...state,
        [action.payload.todoID]: state[action.payload.todoID].filter(
          el => el.id !== action.payload.taskID
        ),
      }
    case ACTION_TYPE_TASK.UPDATE_TASK:
      return {
        ...state,
        [action.payload.todoID]: state[action.payload.todoID].map(el =>
          el.id === action.payload.taskID ? { ...el, ...action.payload.apiModel } : el
        ),
      }
    case ACTION_TYPE_TASK.CHANGE_TASK_ENTITY_STATUS:
      return {
        ...state,
        [action.payload.todoID]: state[action.payload.todoID].map(el =>
          el.id === action.payload.taskID
            ? { ...el, entityStatusTask: action.payload.entityStatus }
            : el
        ),
      }
    default:
      return state
  }
}

export const getTasksTC =
  (todolistId: string): RootThunkType =>
  async dispatch => {
    dispatch(setAppPreloaderStatusAC('loading'))
    try {
      const { data } = await taskAPI.getTasks(todolistId)

      dispatch(getTasksAC(data.items, todolistId))
      dispatch(setAppPreloaderStatusAC('succeeded'))
    } catch (e) {
      console.error(e)
      dispatch(setAppPreloaderStatusAC('failed'))
    }
  }

export const createNewTaskTC =
  (title: string, todolistId: string): RootThunkType =>
  async dispatch => {
    dispatch(setAppPreloaderStatusAC('loading'))
    dispatch(changeTodoEntityStatusAC(todolistId, 'loading'))

    try {
      const { data } = await taskAPI.createNewTask(title, todolistId)

      if (data.resultCode === RESPONSE_RESULT_CODE_SUCCESS) {
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

export const removeTaskTC =
  (taskID: string, todoID: string): RootThunkType =>
  async dispatch => {
    dispatch(setAppPreloaderStatusAC('loading'))
    dispatch(changeTaskEntityStatusAC(todoID, taskID, 'loading'))

    try {
      const { data } = await taskAPI.removeTask(todoID, taskID)

      if (data.resultCode === RESPONSE_RESULT_CODE_SUCCESS) {
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

export const updateTaskTC =
  (todoID: string, taskID: string, domainModel: UpdateDomainTaskModelType): RootThunkType =>
  async (dispatch, getState) => {
    const task = getState().tasks[todoID]
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
        ...domainModel,
      }

      dispatch(setAppPreloaderStatusAC('loading'))
      dispatch(changeTaskEntityStatusAC(todoID, taskID, 'loading'))
      try {
        const { data } = await taskAPI.updateTask(todoID, taskID, apiModel)

        if (data.resultCode === RESPONSE_RESULT_CODE_SUCCESS) {
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
