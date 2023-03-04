import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://social-network.samuraijs.com/api/1.1/',
  headers: {
    'API-KEY': '86e18530-22f7-4a66-9420-87069fc981b5',
  },
  withCredentials: true,
})
