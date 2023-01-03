import {RootReducerType} from '../root-reducer';
import {FiltersType} from './todolist-types';
import {TaskStatuses} from '../tasks/tasks-types';

export const allTodoSelectors = (state: RootReducerType) => state.todolist


export const filterSelector = (state: RootReducerType, filter: FiltersType, todoID: string) => {
    if (filter === undefined) {
        return state.tasks[todoID]
    }


    if (filter === 'all') {
        return state.tasks[todoID]
    }
    if (filter === 'active') {
        return state.tasks[todoID].filter(el => el.status === TaskStatuses.New)
    }
    if (filter === 'completed') {
        return state.tasks[todoID].filter(el => el.status === TaskStatuses.Completed)
    }

}