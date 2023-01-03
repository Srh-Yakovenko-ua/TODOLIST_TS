import React, {useEffect} from 'react';
import './App.css';
import {TodoList} from './components/TodoList/TodoList';
import {allTodoSelectors} from './store/todolist/todolist-selectors';
import {TodoStateType} from './store/todolist/todolist-types';
import {AddItemForm} from './common/AddItemForm';
import {createNewTodoThunk, getTodoListsThunk} from './store/todolist/todolist-reducer';
import {useAppDispatch, useAppSelector} from './store';
import {Container, LinearProgress, Paper} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import CustomizedSnackbars from './common/ErrorSnackbar';
import {RequestStatusType} from './store/app/app-reducer';


function App() {
    const dispatch = useAppDispatch();
    const todo = useAppSelector<TodoStateType[]>(allTodoSelectors)
    const status = useAppSelector<RequestStatusType>(state => state.app.status)

    const createNewTodo = (title: string) => dispatch(createNewTodoThunk(title))


    useEffect(() => {
        dispatch(getTodoListsThunk())
    }, [])
    return (
        <div>
            <CustomizedSnackbars/>
            <Container fixed>
                <Grid2 container style={{padding: '15px'}}>
                    <AddItemForm addItem={createNewTodo} label="create new Todo" title="add Todo"/>
                    {status === 'loading' && <LinearProgress color="primary"/>}
                </Grid2>

                <Grid2 container spacing={3}>

                    {todo.map(todo => {
                        return (
                            <Grid2 key={todo.id}>
                                <Paper style={{padding: '15px'}} elevation={4}>
                                    <TodoList
                                        key={todo.id}
                                        todolistId={todo.id}
                                        title={todo.title}
                                        filter={todo.filter}
                                        entityTodoStatus={todo.entityStatus}
                                    />
                                </Paper>
                            </Grid2>
                        )
                    })}
                </Grid2>
            </Container>
        </div>
    );
}

export default App;


