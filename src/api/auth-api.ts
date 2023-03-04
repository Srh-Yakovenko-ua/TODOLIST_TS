import { GeneralResponseType } from '../store/todolist/todolist-types'

import { instance } from './instance'

export interface AuthMeResponseType {
  id: number
  email: string
  login: string
}

export const authApi = {
  authMe() {
    return instance.get<GeneralResponseType<{ data: AuthMeResponseType }>>('/auth/me')
  },
  login(email: string, password: string, rememberMe?: boolean, captcha?: boolean) {
    return instance.post<GeneralResponseType<{ data: { userId: string } }>>('/auth/login', {
      email,
      password,
      rememberMe,
      captcha,
    })
  },
  logout() {
    return instance.delete('/auth/login')
  },
}
