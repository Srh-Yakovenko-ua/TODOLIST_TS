import React from 'react'

import { Navigate } from 'react-router-dom'

import { useAppSelector } from '../../store'
import { appAuthSelectors } from '../../store/appAuth/appAuth-selectors'

import { AuthLoginForm } from './AuthLoginForm'

export const Login = () => {
  const isAuth = useAppSelector(appAuthSelectors)

  if (isAuth) return <Navigate to={'/'} />

  return <AuthLoginForm />
}
