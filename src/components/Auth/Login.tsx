import React from 'react'

import { Navigate } from 'react-router-dom'

import { AuthLoginForm } from './AuthLoginForm'

import { appAuthSelectors, useAppSelector } from 'store'

export const Login = () => {
  const isAuth = useAppSelector(appAuthSelectors)

  if (isAuth) return <Navigate to={'/'} />

  return <AuthLoginForm />
}
