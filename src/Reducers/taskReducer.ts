import {v1} from 'uuid';


const REMOVE_TASK = 'REMOVE_TASK'
const ADD_TASK = 'ADD_TASK'
const CHANGE_STATUS = 'CHANGE_STATUS'
const REMOVE_TODOLIST = 'REMOVE_TODOLIST'
const ADD_TODOLIST = 'ADD_TODOLIST'
const CHANGE_TASK = 'CHANGE_TASK'
type task = {
    id: string
    title: string
    isDone: boolean
}
type stateType = {
    [key: string]: task[]
}
type ActionsTypeTasksReducer = ReturnType<typeof removeTaskAC>
    | ReturnType<typeof addTaskAC>
    | ReturnType<typeof changeStatusAC>
    | ReturnType<typeof removeTodoListAC>
    | ReturnType<typeof addTodoListAC>
    | ReturnType<typeof changeTaskAC>


export const removeTaskAC = (todolistID: string, taskId: string) => {
    return {
        type: REMOVE_TASK,
        payload: {
            todolistID: todolistID,
            taskId: taskId,
        }
    } as const
}
export const addTaskAC = (todolistID: string, title: string) => {
    return {
        type: ADD_TASK,
        payload: {
            todolistID: todolistID,
            title: title
        }
    } as const
}
export const changeStatusAC = (todolistID: string, taskId: string, isDone: boolean) => {
    return {
        type: CHANGE_STATUS,
        payload: {
            todolistID: todolistID,
            taskId: taskId,
            isDone: isDone,
        }
    } as const
}
export const removeTodoListAC = (todolistID: string) => {
    return {
        type: REMOVE_TODOLIST,
        payload: {
            todolistID: todolistID
        }
    } as const
}
export const addTodoListAC = (newTodolistId: string) => {
    return {
        type: ADD_TODOLIST,
        payload: {
            newTodolistId: newTodolistId
        }
    } as const
}
export const changeTaskAC = (todolistID: string, taskId: string, currentTitle: string) => {
    return {
        type: CHANGE_TASK,
        payload: {
            todolistID: todolistID,
            taskId: taskId,
            currentTitle: currentTitle
        }
    } as const
}

export const taskReducer = (state: stateType, action: ActionsTypeTasksReducer): stateType => {
    switch (action.type) {
        case REMOVE_TASK :
            const tdID = action.payload.todolistID
            const taskId = action.payload.taskId
            return {...state, [tdID]: state[tdID].filter((fl: { id: string; }) => fl.id !== taskId)}
        case ADD_TASK :
            let newTask = {id: v1(), title: action.payload.title, isDone: false};
            return {...state, [action.payload.todolistID]: [...state[action.payload.todolistID], newTask]}
        case CHANGE_STATUS :
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    isDone: action.payload.isDone
                } : el)
            }
        case REMOVE_TODOLIST :
            return Object.fromEntries(Object.entries(state).filter(([key]) => key !== action.payload.todolistID))
        case ADD_TODOLIST :
            return {...state, [action.payload.newTodolistId]: []}
        case CHANGE_TASK :
            return {
                ...state,
                [action.payload.todolistID]: state[action.payload.todolistID].map(el => el.id === action.payload.taskId ? {
                    ...el,
                    title: action.payload.currentTitle
                } : el)
            }
        default :
            return state
    }


}


