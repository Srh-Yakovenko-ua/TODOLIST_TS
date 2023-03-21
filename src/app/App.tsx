import React, { useEffect } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'

import { CustomizedSnackbars, AppStatusLoader, InitializedLoader } from 'common'
import { MenuAppBar, Login, ErrorRoute404, TodoList } from 'components'
import {
  appStatusSelectors,
  authMeTC,
  isAppAuthInitializedSelectors,
  useAppDispatch,
  useAppSelector,
} from 'store'

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appStatusSelectors)
  const isAppAuthInitialized = useAppSelector(isAppAuthInitializedSelectors)

  useEffect(() => {
    dispatch(authMeTC())
  }, [dispatch])

  if (!isAppAuthInitialized) return <InitializedLoader />

  return (
    <div>
      <CustomizedSnackbars />
      <MenuAppBar />
      {status === 'loading' && <AppStatusLoader />}
      <Routes>
        <Route path={'/'} element={<TodoList />} />
        <Route path={'/login'} element={<Login />} />
        <Route path={'*'} element={<ErrorRoute404 />} />
      </Routes>
    </div>
  )
}

export default App
