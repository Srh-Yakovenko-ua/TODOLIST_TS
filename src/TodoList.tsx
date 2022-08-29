import React, {useState} from 'react';
import {filterType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskID: string) => void
    changeFilter: (name: filterType) => void
    addTask: (value: string) => void
}

export const TodoList = (props: TodoListPropsType) => {

    const [value, setValue] = useState<string>('')

    const changeTitle = (e: { currentTarget: { value: string; }; }) => {
        setValue(e.currentTarget.value)
    }
    const addTask = () => {
        props.addTask(value)
        setValue('')
    }

    const taskItems = props.tasks.length ? props.tasks.map(t => {
        return (
            <li key={t.id}>
                <input type="checkbox" checked={t.isDone}/>
                <span>{t.title}</span>
                <button onClick={() => props.removeTask(t.id)}>x</button>
            </li>
        );
    }) : <span>Tasks list is empty</span>


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={value} onChange={changeTitle}/>
                <button onClick={addTask}>+</button>
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button onClick={() => props.changeFilter('all')}>All</button>
                <button onClick={() => props.changeFilter('active')}>Active</button>
                <button onClick={() => props.changeFilter('completed')}>Completed</button>
            </div>
        </div>
    );
}

