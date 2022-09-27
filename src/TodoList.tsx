import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from './Components/Input';
import {EditableSpan} from './Components/EditableSpan';
import {Button, Checkbox, IconButton} from '@mui/material';
import {Delete} from '@mui/icons-material';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    todolistID: string;
    title: string
    tasks: Array<TaskType>
    removeTask: (todolistID: string, taskId: string) => void
    changeFilter: (todolistID: string, value: FilterValuesType) => void
    addTask: (todolistID: string, title: string) => void
    changeTaskStatus: (todolistID: string, taskId: string, isDone: boolean) => void
    filter: FilterValuesType
    removeTodolist: (todolistID: string) => void
    changeTask: (todolistID: string, taskId: string, currentTitle: string) => void
    editTodolist: (todolistID: string, currentTitle: string) => void
}


export function Todolist(props: PropsType) {


    const onAllClickHandler = () => props.changeFilter(props.todolistID, 'all');
    const onActiveClickHandler = () => props.changeFilter(props.todolistID, 'active');
    const onCompletedClickHandler = () => props.changeFilter(props.todolistID, 'completed');

    const removeTodolistHandler = () => {
        props.removeTodolist(props.todolistID)
    }

    const addTaskHandler = (newTitle: string) => {
        props.addTask(props.todolistID, newTitle)
    }

    const editTodolistHandler = (currentTitle: string) => {
        props.editTodolist(props.todolistID, currentTitle)
    }


    return <div>
        <h3>
            <EditableSpan title={props.title} callback={editTodolistHandler}/>
            <IconButton onClick={removeTodolistHandler}>
                <Delete/>
            </IconButton>
        </h3>
        <Input callback={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    const changeTaskHandler = (currentTitle: string) => {
                        props.changeTask(props.todolistID, t.id, currentTitle)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <Checkbox
                            color="success"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={changeTaskHandler}/>
                        <IconButton onClick={onClickHandler}>
                            <Delete fontSize="small"/>
                        </IconButton>
                    </li>
                })
            }
        </ul>
        <div>
            <Button variant={props.filter === 'all' ? 'outlined' : 'contained'}
                    onClick={onAllClickHandler}>All
            </Button>
            <Button variant={props.filter === 'active' ? 'outlined' : 'contained'}
                    onClick={onActiveClickHandler}>Active
            </Button>
            <Button variant={props.filter === 'completed' ? 'outlined' : 'contained'}
                    onClick={onCompletedClickHandler}>Completed
            </Button>
        </div>
    </div>
}
