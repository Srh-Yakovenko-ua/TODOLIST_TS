import {instance} from './instance';
import {ResponseTaskType, TasksType, TaskStateType, UpdateTaskModelType} from '../store/tasks/tasks-types';


export const taskAPI = {
    getTasks(todolistId: string) {
        return instance.get<TaskStateType>(`/todo-lists/${todolistId}/tasks`)
    },
    createNewTask(title: string, todolistId: string) {
        return instance
            .post<ResponseTaskType<{ item: TasksType }>>(`/todo-lists/${todolistId}/tasks`, {title: title})
    },
    removeTask(todolistId: string, taskId: string) {
        return instance
            .delete<ResponseTaskType<{}>>(`/todo-lists/${todolistId}/tasks/${taskId}`)
    },
    updateTask(todolistId: string, taskId: string, model: UpdateTaskModelType) {
        return instance.put<ResponseTaskType<{ data: TasksType }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, {...model})
    }

}