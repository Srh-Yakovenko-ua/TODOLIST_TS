import React, {ChangeEvent, useCallback} from 'react';
import {FilterValuesType} from '../AppWithRedux';
import {EditableSpan} from '../EditableSpan';
import {AddItemForm} from '../AddItemForm';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from '../state/store';
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from '../state/todo-list-reducer';
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';
import {Task} from './Task';

export type TodolistReduxPropsType = {
    todolistId: string
    title: string
    filter: FilterValuesType
}
export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export const TodolistRedux = React.memo(({todolistId, title, filter}: TodolistReduxPropsType) => {

    console.log('todo')
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[todolistId])
    const dispatch = useDispatch()

    const removeTodolist = useCallback(() => {
        dispatch(removeTodolistAC(todolistId))
    }, [dispatch, todolistId])

    const changeTodolistTitle = useCallback((title: string) => {
        dispatch(changeTodolistTitleAC(todolistId, title))
    }, [dispatch, todolistId])

    const addTask = useCallback((title: string) => {
        dispatch(addTaskAC(title, todolistId))
    }, [dispatch, todolistId])

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, 'all'))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, 'active'))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(todolistId, 'completed'))


    if (filter === 'active') {
        tasks = tasks.filter(t => !t.isDone);
    }
    if (filter === 'completed') {
        tasks = tasks.filter(t => t.isDone);
    }


    return <div>
        <h3><EditableSpan value={title} onChange={changeTodolistTitle}/>
            <IconButton onClick={removeTodolist}>
                <Delete/>
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask}/>
        <div>
            {
                tasks.map(t => <Task
                    key={t.id}
                    task={t}
                    todolistId={todolistId}
                />)
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                    onClick={onAllClickHandler}
                    color={'primary'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                    onClick={onActiveClickHandler}
                    color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                    onClick={onCompletedClickHandler}
                    color={'secondary'}>Completed
            </Button>
        </div>
    </div>
});

