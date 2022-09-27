import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';
import {Input} from './Components/Input';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}

function App() {

    // let [todolists, setTodolists] = useState<Array<TodolistsType>>([
    //     {id: v1(), title: 'What to learn', filter: 'active'},
    //     {id: v1(), title: 'What to buy', filter: 'all'},
    // ])

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},
            {id: v1(), title: 'Rest API', isDone: false},
            {id: v1(), title: 'GraphQL', isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: 'HTML&CSS2', isDone: true},
            {id: v1(), title: 'JS2', isDone: true},
            {id: v1(), title: 'ReactJS2', isDone: false},
            {id: v1(), title: 'Rest API2', isDone: false},
            {id: v1(), title: 'GraphQL2', isDone: false},
        ]
    });


    function removeTask(todolistID: string, taskId: string) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(fl => fl.id !== taskId)})
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [...tasks[todolistID], newTask]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {

        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: isDone} : el)})
    }


    function changeFilter(todolistID: string, filterValue: FilterValuesType) {
        setTodolists(todolists.map(tl => tl.id === todolistID ? {...tl, filter: filterValue} : tl))
    }

    const removeTodolist = (todolistID: string) => {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        const deleteTasks = Object.fromEntries(Object.entries(tasks).filter(([key]) => key !== todolistID))
        setTasks(deleteTasks)
    }

    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1();
        const newTodolist: TodolistsType = {id: newTodolistId, title: newTitle, filter: 'all'}
        setTodolists([...todolists, newTodolist])
        setTasks({...tasks, [newTodolistId]: []})
    }

    const changeTask = (todolistID: string, taskId: string, currentTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, title: currentTitle} : el)
        })
    }

    const editTodolist = (todolistID: string, currentTitle: string) => {
        setTodolists(todolists.map(td => td.id === todolistID ? {...td, title: currentTitle} : td))
    }

    return (
        <div className="App">
            <Input callback={addTodolist}/>
            {todolists.map(el => {
                let tasksForTodolist = tasks[el.id]

                if (el.filter === 'active') {
                    tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                }
                if (el.filter === 'completed') {
                    tasksForTodolist = tasks[el.id].filter(t => t.isDone);
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
                              removeTodolist={removeTodolist}
                              changeTask={changeTask}
                              editTodolist={editTodolist}
                    />)

            })}

        </div>
    );
}

export default App;
