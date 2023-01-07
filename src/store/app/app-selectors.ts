import {RootReducerType} from '../root-reducer';

export const appErrorSelectors = (state: RootReducerType) => state.app.error
export const appStatusSelectors = (state :RootReducerType) => state.app.status
