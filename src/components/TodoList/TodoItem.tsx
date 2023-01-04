import React from 'react';
import {useAppDispatch} from '../../store';
import {createNewTaskThunk} from '../../store/tasks/tasks-reducer';
import {removeTodoThunk, updateTodoTitleThunk} from '../../store/todolist/todolist-reducer';
import {FiltersType} from '../../store/todolist/todolist-types';
import {changeFilterTodoAC} from '../../store/todolist/todolist-action';
import {AddItemForm} from '../../common/AddItemForm';
import {TaskList} from '../Task/TaskList';
import {RequestStatusType} from '../../store/app/app-reducer';
import {TitleFormTodo} from './TitleFormTodo';
import {ButtonGroupFilter} from './ButtonGroupFilter';

interface TodoListType {
    todolistId: string
    title: string
    filter: FiltersType
    entityTodoStatus: RequestStatusType
}


export const TodoItem: React.FC<TodoListType> = ({
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
        const DATA_SET = e.currentTarget.dataset.filter as FiltersType
        DATA_SET && dispatch(changeFilterTodoAC(DATA_SET, todolistId))
    }

    return (
        <>
            <TitleFormTodo title={title}
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
            <ButtonGroupFilter filter={filter}
                               filterTodo={filterTodo}
            />
        </>
    )
}

