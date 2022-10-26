import React, {useCallback} from 'react';


import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType} from './state/store';
import {TaskType, TodolistRedux} from './TodolistRedux';
import {Container, Grid, Paper} from '@mui/material';
import {addTodolistAC} from './state/todo-list-reducer';
import {AddItemForm} from './AddItemForm';

export type FilterValuesType = 'all' | 'active' | 'completed';
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}


export type TasksStateType = {
    [key: string]: Array<TaskType>
}


const AppWithRedux = React.memo(() => {
    console.log('App')
    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)


    const dispatch = useDispatch()


    const addTodolist = useCallback((title: string) => {
        dispatch(addTodolistAC(title))
    }, [dispatch])

    return (
        <div className="App">
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm addItem={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            return <Grid key={tl.id} item>
                                <Paper style={{padding: '10px'}}>
                                    <TodolistRedux
                                        todolistId={tl.id}
                                        title={tl.title}
                                        filter={tl.filter}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
})

export default AppWithRedux;
