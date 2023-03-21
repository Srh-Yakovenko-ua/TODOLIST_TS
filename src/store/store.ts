import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { AnyAction, applyMiddleware, legacy_createStore } from 'redux'
import thunk, { ThunkAction, ThunkDispatch } from 'redux-thunk'

import { AppActionType } from './app/app-reducer'
import { ActionAppAuth } from './appAuth/appAuth-reducer'
import { rootReducer, RootReducerType } from './root-reducer'
import { ActionsTaskType } from './tasks/tasks-types'
import { ActionsTodolistType } from './todolist/todolist-types'

export const store = legacy_createStore(rootReducer, applyMiddleware(thunk))

export type RootActions = ActionsTodolistType | ActionsTaskType | ActionAppAuth | AppActionType
export type RootThunkType<ReturnType = void> = ThunkAction<
  ReturnType,
  RootReducerType,
  unknown,
  RootActions
>

export const useAppDispatch: () => ThunkDispatch<RootReducerType, any, AnyAction> = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootReducerType> = useSelector

//@ts-ignore
window.store = store
