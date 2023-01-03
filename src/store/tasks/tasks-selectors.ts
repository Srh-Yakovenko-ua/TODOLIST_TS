import {RootReducerType} from '../root-reducer';
import {FiltersType} from '../todolist/todolist-types';
import {TaskStatuses} from './tasks-types';


// export const allTaskSelectors = (state: rootReducerType , todolistId : string) => state.todolist[todolistId]


export const allTasksFilterSelectors = (state: RootReducerType, filters: FiltersType, todolistId: string) => {
    if (filters === undefined) {
        return []
    }

    if (filters === 'active') {
        return state.tasks[todolistId].filter(el => el.status === TaskStatuses.New)
    }
    if (filters === 'completed') {
        return state.tasks[todolistId].filter(el => el.status === TaskStatuses.Completed)
    }
    if (filters === 'all') {
        return state.tasks[todolistId].filter(el => el)
    }
}
