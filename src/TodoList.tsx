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
    filter: filteredTaskType
}

export type filteredTaskType = 'all' | 'completed' | 'active'

export const TodoList = (props: TodoListType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')
    const [error, setError] = useState('')

    const changeCheckBoxStatusHandler = (taskID: string, currentTarget: boolean) => {
        props.changeCheckBoxStatus(taskID, currentTarget)
    }

    const mapTask = props.tasks.map(t => {
        const onDeleteTaskHandler = () => props.deleteTasks(t.id)

        // const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        //     changeCheckBoxStatusHandler(t.id, e.currentTarget.checked)
        // }

        return (
            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                <input type="checkbox" checked={t.isDone} onChange={(e)=>{changeCheckBoxStatusHandler(t.id,e.currentTarget.checked)}}/>
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
            {error && <div className={'error-message'}>{error}</div>}
            <ul>
                {mapTask}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={all}>All</button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={completed}>Complete
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={active}>Active</button>
            </div>
        </div>

    );
};
