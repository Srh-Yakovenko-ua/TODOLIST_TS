import {AnyAction, applyMiddleware, legacy_createStore} from 'redux';
import {rootReducer, RootReducerType} from './root-reducer';
import thunk, {ThunkAction , ThunkDispatch} from 'redux-thunk'
import {ActionsTodolistType} from './todolist/todolist-types';
import {ActionsTaskType} from './tasks/tasks-types';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {ActionAppAuth} from './appAuth/appAuth-reducer';
import {AppActionType} from './app/app-reducer';

export const store = legacy_createStore(
    rootReducer,
    applyMiddleware(thunk)
)

export type RootActions = ActionsTodolistType | ActionsTaskType | ActionAppAuth  | AppActionType
export type RootThunkType<ReturnType = void> = ThunkAction<ReturnType, RootReducerType, unknown, RootActions>

export const useAppDispatch: () => ThunkDispatch<RootReducerType, any, AnyAction> = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector;