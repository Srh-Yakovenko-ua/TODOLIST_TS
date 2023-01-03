import {instance} from './instance';
import {TodoStateType, ResponseTodoType,} from '../store/todolist/todolist-types';

export const todoAPI = {
    getTodo() {
        return instance.get<TodoStateType[]>('todo-lists')

    },
    createNewTodo(titleTODO: string) {
        return instance
            .post<ResponseTodoType<{ item: TodoStateType }>>('todo-lists', {title: titleTODO})
    },
    removeTodo(todoID: string) {
        return instance
            .delete<ResponseTodoType<{}>>(`todo-lists/${todoID}`)
    },
    updateTodoTitle(todoID: string, newTodoTitle: string) {

        return instance
            .put<ResponseTodoType<{}>>(`todo-lists/${todoID}`, {title: newTodoTitle})
    }
}