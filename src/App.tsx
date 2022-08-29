import React from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {useState} from 'react';
import {v1} from 'uuid';


export type filterType = 'all' | 'completed' | 'active'

function App() {

    const todoListTitle: string = 'What to learn today';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS&TS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'ReactNative', isDone: false},
    ]);

    const removeTask = (taskID: string) => {
        setTasks(tasks.filter(t => t.id !== taskID)) //5 - 10ms
        // console.log(tasks) // работает асинхронно
    }

    const addTask = (value: string) => {
        const newTask: TaskType = {
            id: v1(), title: value, isDone: false,
        };
        const copyTasks = [newTask, ...tasks]
        setTasks(copyTasks)
    }


    const changeFilter = (name: filterType) => {
        setFilter(name)
    }
    const [filter, setFilter] = useState<filterType>('all')

// ui
    let tasksFilteredTodoList = tasks
    if (filter === 'active') {
        tasksFilteredTodoList = tasks.filter(filtered => !filtered.isDone)
    }
    if (filter === 'completed') {
        tasksFilteredTodoList = tasks.filter(filtered => filtered.isDone)
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasksFilteredTodoList}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
            />
        </div>
    );
}

export default App;


