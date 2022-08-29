import React, {useState} from 'react';
import './App.css';
import {filteredTaskType, TodoList} from './TodoList';
import {v1} from 'uuid';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}


function App() {

    const [tasks, setTasks] = useState<Array<TaskType>>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS&TS', isDone: true},
        {id: v1(), title: 'REACT', isDone: false},
        {id: v1(), title: 'ReactNative', isDone: false},
    ]);

    const deleteTask = (taskId: string) => {
        setTasks(tasks.filter(t => t.id !== taskId))
    }

    const [filtered, setFilteredTask] = useState<filteredTaskType>('all')

    const filteredTask = (tasks: Array<TaskType>, filtered: string): Array<TaskType> => {
        if (filtered === 'completed') return tasks.filter(f => f.isDone)
        if (filtered === 'active') return tasks.filter(f => !f.isDone)
        else return tasks
    }



    const addTask = (newTaskTitle :string) => {
        let newTask = {id: v1(), title: newTaskTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    const filteredTasks = filteredTask(tasks, filtered)

    return (
        <div className="App">

            <TodoList tasks={filteredTasks}
                      deleteTasks={deleteTask}
                      setFilteredTask={setFilteredTask}
                      addTask={addTask}/>

        </div>
    );
}

export default App;



