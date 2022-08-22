import React from 'react';
import './App.css';
import {TaskType, TodoList} from './TodoList';
import {useState} from 'react';


type filterType = 'all' | 'completed' | 'active'

function App() {

    const todoListTitle: string = 'What to learn today';

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: 1, title: 'HTML&CSS', isDone: true},
        {id: 2, title: 'JS&TS', isDone: true},
        {id: 3, title: 'REACT', isDone: false},
        {id: 4, title: 'ReactNative', isDone: false},
    ]);
    let tasksFilteredTodoList = tasks

    const removeTask = (taskID: number) => {
        setTasks(tasks.filter(t => t.id !== taskID)) //5 - 10ms
        // console.log(tasks) // работает асинхронно
    }

    const [filter, setFilter] = useState<filterType>('all')


    if(filter === 'active'){
        tasksFilteredTodoList = tasks.filter(filtered => !filtered.isDone)

    }
    if(filter === 'completed'){
        tasksFilteredTodoList = tasks.filter(filtered => filtered.isDone)
    }

    return (
        <div className="App">
            <TodoList title={todoListTitle}
                      tasks={tasksFilteredTodoList}
                      removeTask={removeTask}/>
        </div>
    );
}

export default App;


