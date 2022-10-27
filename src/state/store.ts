import {tasksReducer} from './tasks-reducer';
import {todoListReducer} from './todo-list-reducer';
import {combineReducers, compose, legacy_createStore} from 'redux';


// утилка для отслеживания store в консоли
declare global {
    interface Window {
        __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;





const rootReducer = combineReducers({
    tasks: tasksReducer,
    todolists: todoListReducer
})
// непосредственно создаём store
export const store = legacy_createStore(rootReducer,composeEnhancers());

export type AppRootStateType = ReturnType<typeof rootReducer>


// @ts-ignore
window.store = store;




