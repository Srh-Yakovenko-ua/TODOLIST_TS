import React from 'react';
import {AddItemForm} from '../../common/AddItemForm';
import {removeTodoThunk, updateTodoTitleThunk} from '../../store/todolist/todolist-reducer';
import {createNewTaskThunk} from '../../store/tasks/tasks-reducer';
import {changeFilterTodoAC} from '../../store/todolist/todolist-action';
import {FiltersType} from '../../store/todolist/todolist-types';
import {useAppDispatch} from '../../store';
import {RequestStatusType} from '../../store/app/app-reducer';
import {TitleFormNameTodo} from './TitleFormNameTodo';
import {ButtonFilter} from './ButtonFilter';
import {TaskList} from '../Task/TaskList';

type TodoListType = {
    todolistId: string
    title: string
    filter: FiltersType
    entityTodoStatus: RequestStatusType
}


export const TodoList: React.FC<TodoListType> = (
    {
        todolistId,
        title,
        filter,
        entityTodoStatus
    }) => {
    const dispatch = useAppDispatch();

    const addTask = (title: string) => dispatch(createNewTaskThunk(title, todolistId))
    const onChangeTodoTitle = (title: string) => dispatch(updateTodoTitleThunk(todolistId, title))
    const removeTodo = () => dispatch(removeTodoThunk(todolistId))


    const filterTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
        const DATA_SET = e.currentTarget.dataset.set as FiltersType
        DATA_SET && dispatch(changeFilterTodoAC(DATA_SET, todolistId))
    }

    return (
        <>
            <TitleFormNameTodo title={title}
                               entityTodoStatus={entityTodoStatus}
                               onChangeTodoTitle={onChangeTodoTitle}
                               removeTodo={removeTodo}
            />
            <div style={{display: 'flex', gap: '30px'}}>
                <AddItemForm addItem={addTask}
                             disabled={entityTodoStatus === 'loading'}/>
            </div>
            <TaskList filter={filter}
                      todolistId={todolistId}/>
            <ButtonFilter filter={filter}
                          filterTodo={filterTodo}
            />
        </>
    );
};

