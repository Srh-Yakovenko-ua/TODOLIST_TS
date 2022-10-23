import {tasksReducer} from './tasks-reducer';
import {todoListReducer} from './todo-list-reducer';
import {combineReducers,legacy_createStore} from 'redux';

const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})

export const store = legacy_createStore(rootReducer);

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;




