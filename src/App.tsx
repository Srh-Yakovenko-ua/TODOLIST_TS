import React, {useEffect} from 'react';
import './App.css';
import {AddItemForm} from './common/AddItemForm';
import {createNewTodoThunk, getTodoListsThunk} from './store/todolist/todolist-reducer';
import {useAppDispatch, useAppSelector} from './store';
import {Container, LinearProgress} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import CustomizedSnackbars from './common/ErrorSnackbar';
import {RequestStatusType} from './store/app/app-reducer';
import {TodoList} from './components/TodoList/TodoList';
import {statusSelectors} from './store/app/app-selectors';


function App() {
    const dispatch = useAppDispatch();
    const status = useAppSelector<RequestStatusType>(statusSelectors)
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
                </Grid2>
                {status === 'loading' && <LinearProgress color="primary"/>}
                <TodoList/>
            </Container>
        </div>
    );
}

export default App;


