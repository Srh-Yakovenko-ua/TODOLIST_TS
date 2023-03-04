import { RootReducerType } from '../root-reducer'

export const appAuthSelectors = (state: RootReducerType) => state.appAuth.isAuth
export const isAppAuthInitializedSelectors = (state: RootReducerType) =>
  state.appAuth.isAppAuthInitialized
