import {ACTION_TYPE_TODOLIST, FiltersType, TodoStateType} from './todolist-types';
import {RequestStatusType} from '../app/app-reducer';


export const getTodoAC = (data: TodoStateType[]) => {
    return {
        type: ACTION_TYPE_TODOLIST.GET_TODO,
        payload: {
            data
        }
    } as const
}

export const removeTodoAC = (todoID: string) => {
    return {
        type: ACTION_TYPE_TODOLIST.REMOVE_TODO,
        payload: {
            todoID
        }
    } as const
}

export const createTodoAC = (item: TodoStateType) => {
    return {
        type: ACTION_TYPE_TODOLIST.CREATE_NEW_TODO,
        payload: {
            item
        }
    } as const
}
export const updateTodoTitleAC = (todoID: string, newTodoTitle: string) => {
    return {
        type: ACTION_TYPE_TODOLIST.UPDATE_TODO_TITLE,
        payload: {
            todoID,
            newTodoTitle,
        }
    } as const
}
export const changeTodoEntityStatusAC = (todoID: string, entityStatus: RequestStatusType) => {
    return {
        type: ACTION_TYPE_TODOLIST.CHANGE_TODO_ENTITY_STATUS,
        payload: {
            todoID,
            entityStatus
        }
    } as const
}

export const changeFilterTodoAC = (filter: FiltersType, todoID: string) => {
    return {
        type: ACTION_TYPE_TODOLIST.CHANGE_TODO_FILTER,
        payload: {
            filter,
            todoID
        }
    } as const
}