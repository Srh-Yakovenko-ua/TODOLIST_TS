import React, {ChangeEvent, useState} from 'react';
import {TaskType} from './App';
import {KeyboardEvent} from 'react';

type TodoListType = {
    tasks: Array<TaskType>
    deleteTasks: (id: string) => void
    setFilteredTask: (arg: filteredTaskType) => void
    addTask: (newTaskTitle: string) => void

}
export type filteredTaskType = 'all' | 'completed' | 'active'

export const TodoList = (props: TodoListType) => {
    const [newTaskTitle, setNewTaskTitle] = useState('')

    const mapTask = props.tasks.map(t => {
        const onDeleteTaskHandler = () => props.deleteTasks(t.id)

        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={onDeleteTaskHandler}>-</button>
            </li>
        )
    });

    const all = () => props.setFilteredTask('all')
    const completed = () => props.setFilteredTask('completed')
    const active = () => props.setFilteredTask('active')

    const buttonClickAdd = () => {
        props.addTask(newTaskTitle)
        setNewTaskTitle('')
    }

    const onTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') buttonClickAdd()
    }

    return (

        <div>
            <div>
                <input value={newTaskTitle}
                       onChange={onTitleChangeHandler}
                       onKeyUp={onKeyUpHandler}/>
                <button onClick={buttonClickAdd}>+</button>
            </div>
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
