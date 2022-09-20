import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {Input} from './Components/Input';
import {EditableSpan} from './Components/EditableSpan';

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

    const changeTaskHandler = (todolistID: string, id: string, currentTitle: string) => {
        props.changeTask(todolistID, id, currentTitle)
    }

    return <div>
        <h3>
            <EditableSpan title={props.title} callback={editTodolistHandler}/>
            <button onClick={removeTodolistHandler}>x</button>
        </h3>
        <Input callback={addTaskHandler}/>

        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(props.todolistID, t.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(props.todolistID, t.id, e.currentTarget.checked);
                    }

                    const changeNewTaskHandler = (currentTitle: string) => {
                        changeTaskHandler(props.todolistID, t.id, currentTitle)
                    }

                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={onChangeHandler}
                               checked={t.isDone}/>
                        <EditableSpan title={t.title} callback={changeNewTaskHandler}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}
