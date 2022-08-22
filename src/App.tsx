import React from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {useState} from 'react';


export type filterType = 'all' | 'completed' | 'active'

function App() {

    const todoListTitle: string = 'What to learn today';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS&TS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
        {id: 4, title: 'ReactNative', isDone: false},
    ]);

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID)) //5 - 10ms
        // console.log(tasks) // работает асинхронно
    }

    const changeFilter = (name: filterType) => {
        setFilter(name)
    }
    const [filter, setFilter] = useState<filterType>('all')

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
            />
        </div>
    );
}

export default App;


