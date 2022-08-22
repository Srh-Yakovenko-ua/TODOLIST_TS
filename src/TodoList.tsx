import React from 'react';

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

type TodoListPropsType = {
    title: string
    tasks: Array<TaskType>
}

export const TodoList = (props: TodoListPropsType) => {

    const taskItems = props.tasks.map(t => {
        return(
            <li key={t.id}><input type="checkbox" checked={t.isDone}/><span>{t.title}</span></li>
        );
    })


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {taskItems}
            </ul>
            <div>
                <button>All</button>
                <button>Active</button>
                <button>Completed</button>
            </div>
        </div>
    );
}

