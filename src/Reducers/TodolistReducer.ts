import {FilterValuesType, TodolistsType} from '../App';

const CHANGE_FILTER = 'CHANGE_FILTER';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const ADD_TODOLIST = 'ADD_TODOLIST';
const EDIT_TODOLIST = 'EDIT_TODOLIST';
type ActionsTypeTasksReducer = ReturnType<typeof changeFilterAC>
    | ReturnType<typeof removeTodolistAC>
    | ReturnType<typeof addTodolistAC>
    | ReturnType<typeof editTodolistAC>

export const changeFilterAC = (todolistID: string, filterValue: FilterValuesType) => {
    return {
        type: CHANGE_FILTER,
        payload: {
            todolistID: todolistID,
            filterValue: filterValue
        }
    } as const
}
export const removeTodolistAC = (todolistID: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            todolistID: todolistID
        }
    } as const

}
export const addTodolistAC = (newTitle: string, newTodolistId: string) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            newTitle: newTitle,
            newTodolistId: newTodolistId
        }
    } as const
}
export const editTodolistAC = (todolistID: string, currentTitle: string) => {
    return {
        type: EDIT_TODOLIST,
        payload: {
            todolistID: todolistID,
            currentTitle: currentTitle
        }
    } as const
}

export const todolistReducer = (state: TodolistsType[], action: ActionsTypeTasksReducer): TodolistsType[] => {
    switch (action.type) {
        case CHANGE_FILTER :
            return state.map(tl => tl.id === action.payload.todolistID ? {
                ...tl,
                filter: action.payload.filterValue
            } : tl)
        case REMOVE_TODOLIST :
            return state.filter(el => el.id !== action.payload.todolistID)
        case ADD_TODOLIST :
            const newTodolist: TodolistsType = {
                id: action.payload.newTodolistId,
                title: action.payload.newTitle,
                filter: 'all'
            }
            return [...state, newTodolist]
        case  EDIT_TODOLIST :
            return state.map(td => td.id === action.payload.todolistID ? {
                ...td,
                title: action.payload.currentTitle
            } : td)
        default :
            return state
    }

}


