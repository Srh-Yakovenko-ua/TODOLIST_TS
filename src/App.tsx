import React, {useReducer} from 'react';
import './App.css';
import {v1} from 'uuid';
import {Input} from './Components/Input';
import ButtonAppBar from './ButtonAppBar';
import {Container, Grid, Paper} from '@mui/material';

import {
    addTodolistAC,
    changeFilterAC,
    editTodolistAC,
    removeTodolistAC,
    todolistReducer
} from './Reducers/TodolistReducer';
import {
    addTaskAC,
    addTodoListAC,
    changeStatusAC, changeTaskAC,
    removeTaskAC,
    removeTodoListAC,
    taskReducer
} from './Reducers/taskReducer';
import {Todolist} from './Todolist';


export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}


function App() {


    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, dispatchTodolists] = useReducer(todolistReducer, [
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])

    let [tasks, dispatchTask] = useReducer(taskReducer, {
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
        dispatchTask(removeTaskAC(todolistID, taskId))
    }

    function addTask(todolistID: string, title: string) {
        dispatchTask(addTaskAC(todolistID, title))
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        dispatchTask(changeStatusAC(todolistID, taskId, isDone))
    }


    function changeFilter(todolistID: string, filterValue: FilterValuesType) {

        dispatchTodolists(changeFilterAC(todolistID, filterValue))
    }

    const removeTodolist = (todolistID: string) => {
        dispatchTodolists(removeTodolistAC(todolistID))
        dispatchTask(removeTodoListAC(todolistID))

    }

    const addTodolist = (newTitle: string) => {
        const newTodolistId = v1();
        dispatchTodolists(addTodolistAC(newTitle,newTodolistId))
        dispatchTask(addTodoListAC(newTodolistId))
    }

    const changeTask = (todolistID: string, taskId: string, currentTitle: string) => {
        dispatchTask(changeTaskAC(todolistID,taskId,currentTitle))
    }

    const editTodolist = (todolistID: string, currentTitle: string) => {
        dispatchTodolists(editTodolistAC(todolistID,currentTitle))
    }

    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <Input callback={addTodolist}/>
                </Grid>

                <Grid container spacing={4}>
                    {todolists.map(el => {
                        let tasksForTodolist = tasks[el.id]

                        if (el.filter === 'active') {
                            tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                        }
                        if (el.filter === 'completed') {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                        }

                        return <Grid item>
                            <Paper style={{padding: '15px', border: '1px solid #1976d2'}}>
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
                                />
                            </Paper>
                        </Grid>
                    })}

                </Grid>
            </Container>
        </div>
    );
}

export default App;
