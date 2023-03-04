import { TodoStateType, GeneralResponseType } from '../store/todolist/todolist-types'

import { instance } from './instance'

export const todoAPI = {
  getTodo() {
    return instance.get<TodoStateType[]>('todo-lists')
  },
  createNewTodo(titleTODO: string) {
    return instance.post<GeneralResponseType<{ item: TodoStateType }>>('todo-lists', {
      title: titleTODO,
    })
  },
  removeTodo(todoID: string) {
    return instance.delete<GeneralResponseType<{}>>(`todo-lists/${todoID}`)
  },
  updateTodoTitle(todoID: string, newTodoTitle: string) {
    return instance.put<GeneralResponseType<{}>>(`todo-lists/${todoID}`, {
      title: newTodoTitle,
    })
  },
}
