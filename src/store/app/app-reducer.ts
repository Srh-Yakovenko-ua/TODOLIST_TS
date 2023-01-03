enum ACTION_TYPE_APP {
    SET_APP_STATUS = '@@app/SET_APP_STATUS',
    SET_APP_ERROR = '@@app/SET_APP_ERROR',
}

export type AppActionType = ReturnType<typeof setAppErrorAC>
    | ReturnType<typeof setAppPreloaderStatusAC>


export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

const initialState = {
    status: 'loading' as RequestStatusType,
    error: null as string | null,
}

type InitialStateStatusType = typeof initialState

export const appReducer = (state: InitialStateStatusType = initialState, action: AppActionType): InitialStateStatusType => {
    switch (action.type) {
        case ACTION_TYPE_APP.SET_APP_STATUS:
            return {...state, status: action.payload.status}
        case ACTION_TYPE_APP.SET_APP_ERROR :
            return {...state, error: action.payload.error}

        default:
            return state
    }
}


export const setAppPreloaderStatusAC = (status: RequestStatusType) => ({
    type: ACTION_TYPE_APP.SET_APP_STATUS,
    payload: {
        status,
    }
} as const)
export const setAppErrorAC = (error: string | null) => ({
    type: ACTION_TYPE_APP.SET_APP_ERROR,
    payload: {
        error,
    }
} as const)

