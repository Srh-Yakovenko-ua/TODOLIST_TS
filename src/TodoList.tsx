import React, {ChangeEvent, useState} from 'react';
import {TaskType} from './App';
import {KeyboardEvent} from 'react';
import './App.css';

type TodoListType = {
    tasks: Array<TaskType>
    deleteTasks: (id: string) => void
    setFilteredTask: (arg: filteredTaskType) => void
    addTask: (newTaskTitle: string) => void
    changeCheckBoxStatus: (id: string, newIsDone: boolean) => void

}
export type filteredTaskType = 'all' | 'completed' | 'active'

export const TodoList = (props: TodoListType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    const mapTask = props.tasks.map(t => {
        const onDeleteTaskHandler = () => props.deleteTasks(t.id)
        const changeCheckBoxStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
            props.changeCheckBoxStatus(t.id, e.currentTarget.checked)
        }
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone} onChange={changeCheckBoxStatusHandler}/>
                <span>{t.title}</span>
                <button onClick={onDeleteTaskHandler}>-</button>
            </li>
        )
    });

    const all = () => props.setFilteredTask('all')
    const completed = () => props.setFilteredTask('completed')
    const active = () => props.setFilteredTask('active')

    const buttonClickAdd = () => {
        if (newTaskTitle.trim() !== '') {
            props.addTask(newTaskTitle.trim())
            setNewTaskTitle('')
        } else {
            setError('Title is required')
        }

    }

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') buttonClickAdd()
    }

    return (
        <div>
            <div>
                <input className={error ? 'error' : ''} value={newTaskTitle}
                       onChange={onTitleChangeHandler}
                       onKeyUp={onKeyUpHandler}/>
                <button onClick={buttonClickAdd}>+</button>
            </div>
            <div className={'error-message'}>{error}</div>
            <ul>
                {mapTask}
            </ul>
            <div>
                <button onClick={all}>All</button>
                <button onClick={completed}>Complete</button>
                <button onClick={active}>Active</button>
            </div>
        </div>

    );
};
