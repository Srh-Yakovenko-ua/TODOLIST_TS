import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: 'What to learn', filter: 'active'},
        {id: v1(), title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false},
    ]);

    //  let [filter, setFilter] = useState<FilterValuesType>('all');


    function removeTask(id: string) {
        let filteredTasks = tasks.filter(t => t.id != id);
        setTasks(filteredTasks);
    }

    function addTask(title: string) {
        let task = {id: v1(), title: title, isDone: false};
        let newTasks = [task, ...tasks];
        setTasks(newTasks);
    }

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find(t => t.id === taskId);
        if (task) {
            task.isDone = isDone;
        }

        setTasks([...tasks]);
    }


    function changeFilter(todolistID: string, filterValue: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filterValue} : tl))
    }


    return (
        <div className="App">
            {todolists.map(el => {
                let tasksForTodolist = tasks;

                if (el.filter === 'active') {
                    tasksForTodolist = tasks.filter(t => !t.isDone);
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks.filter(t => t.isDone);
                }
                return (
                    <Todolist key={el.id}
                              todolistID={el.id}
                              title={el.title}
                              tasks={tasksForTodolist}
                              removeTask={removeTask}
                              changeFilter={changeFilter}
                              addTask={addTask}
                              changeTaskStatus={changeStatus}
                              filter={el.filter}
                    />)

            })}

        </div>
    );
}

export default App;
