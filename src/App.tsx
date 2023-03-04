import React, { useEffect } from 'react'

import './App.css'
import { Route, Routes } from 'react-router-dom'

import CustomizedSnackbars from './common/ErrorSnackbar/ErrorSnackbar'
import { AppStatusLoader } from './common/Preloader/AppStatusLoader/AppStatusLoader'
import { InitializedLoader } from './common/Preloader/InitializedLoader/InitializedLoader'
import { MenuAppBar } from './components/AppBar/AppBar'
import { Login } from './components/Auth/Login'
import { ErrorRoute404 } from './components/ErrorRoute/ErrorRoute404'
import { TodoList } from './components/TodoList/TodoList'
import { useAppDispatch, useAppSelector } from './store'
import { appStatusSelectors } from './store/app/app-selectors'
import { authMeTC } from './store/appAuth/appAuth-reducer'
import { isAppAuthInitializedSelectors } from './store/appAuth/appAuth-selectors'

function App() {
  const dispatch = useAppDispatch()
  const status = useAppSelector(appStatusSelectors)
  const isAppAuthInitialized = useAppSelector(isAppAuthInitializedSelectors)

  useEffect(() => {
    dispatch(authMeTC())
  }, [dispatch])

  if (!isAppAuthInitialized) {
    return <InitializedLoader />
  }

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
