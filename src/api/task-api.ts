import { TaskStateType, TasksType, UpdateTaskModelType } from '../store/tasks/tasks-types'
import { GeneralResponseType } from '../store/todolist/todolist-types'

import { instance } from './instance'

export const taskAPI = {
  getTasks(todolistId: string) {
    return instance.get<TaskStateType>(`/todo-lists/${todolistId}/tasks`)
  },
  createNewTask(title: string, todolistId: string) {
    return instance.post<GeneralResponseType<{ item: TasksType }>>(
      `/todo-lists/${todolistId}/tasks`,
      { title: title }
    )
  },
  removeTask(todolistId: string, taskId: string) {
    return instance.delete<GeneralResponseType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
  },
  updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
    return instance.put<GeneralResponseType<{ data: TasksType }>>(
      `/todo-lists/${todolistId}/tasks/${taskId}`,
      { ...model }
    )
  },
}
