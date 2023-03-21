import axios, { AxiosError } from 'axios'

import { authApi } from '../../api/auth-api'
import { FormDataValuesType } from '../../components/Auth/useAuthLoginForm'
import { setAppPreloaderStatusAC } from '../app/app-actions'
import { RootThunkType } from '../store'

import { RESPONSE_RESULT_CODE_SUCCESS, handleServerAppError, handleServerNetworkError } from 'utils'

export enum ACTION_APP_AUTH {
  SET_AUTHORIZED_APP = '@@auth/SET_AUTHORIZED_APP',
  AUTH_INITIALIZED = '@@auth/AUTH_INITIALIZED',
}

export interface AppAuthStateType {
  isAuth: boolean
  isAppAuthInitialized: boolean
}

export type ActionAppAuth = ReturnType<typeof setAuthAppAC> | ReturnType<typeof authInitializedAC>

const initialState = {
  isAuth: false,
  isAppAuthInitialized: false,
}

export const appAuthReducer = (
  state: AppAuthStateType = initialState,
  action: ActionAppAuth
): AppAuthStateType => {
  switch (action.type) {
    case ACTION_APP_AUTH.SET_AUTHORIZED_APP:
      return {
        ...state,
        isAuth: action.payload.isAuth,
      }
    case ACTION_APP_AUTH.AUTH_INITIALIZED:
      return {
        ...state,
        isAppAuthInitialized: action.payload.isAppAuth,
      }
    default:
      return state
  }
}

export const authMeTC = (): RootThunkType => async dispatch => {
  try {
    const { data } = await authApi.authMe()

    if (data.resultCode === RESPONSE_RESULT_CODE_SUCCESS) {
      dispatch(setAuthAppAC(true))
    } else {
      handleServerAppError(data, dispatch)
      dispatch(setAuthAppAC(false))
    }
  } catch (error) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
      handleServerNetworkError(error, dispatch)
      dispatch(setAuthAppAC(false))
    }
  } finally {
    dispatch(authInitializedAC(true))
  }
}

export const authLoginTC =
  ({ email, password, rememberMe }: FormDataValuesType): RootThunkType =>
  async dispatch => {
    dispatch(setAppPreloaderStatusAC('loading'))
    try {
      const { data } = await authApi.login(email, password, rememberMe)

      if (data.resultCode === RESPONSE_RESULT_CODE_SUCCESS) {
        dispatch(setAuthAppAC(true))
        dispatch(setAppPreloaderStatusAC('succeeded'))
        dispatch(authMeTC())
      } else {
        handleServerAppError(data, dispatch)
        dispatch(setAuthAppAC(false))
      }
    } catch (error) {
      if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
        handleServerNetworkError(error, dispatch)
        dispatch(setAuthAppAC(false))
      }
    }
  }

export const logoutTC = (): RootThunkType => async dispatch => {
  dispatch(setAppPreloaderStatusAC('loading'))
  try {
    const { data } = await authApi.logout()

    if (data.resultCode === RESPONSE_RESULT_CODE_SUCCESS) {
      dispatch(setAuthAppAC(false))
      dispatch(setAppPreloaderStatusAC('succeeded'))
    } else {
      handleServerAppError(data, dispatch)
    }
  } catch (error) {
    if (axios.isAxiosError<AxiosError<{ message: string }>>(error)) {
      handleServerNetworkError(error, dispatch)
    }
  }
}

export const setAuthAppAC = (isAuth: boolean) =>
  ({
    type: ACTION_APP_AUTH.SET_AUTHORIZED_APP,
    payload: {
      isAuth,
    },
  } as const)

export const authInitializedAC = (isAppAuth: boolean) =>
  ({
    type: ACTION_APP_AUTH.AUTH_INITIALIZED,
    payload: {
      isAppAuth,
    },
  } as const)
