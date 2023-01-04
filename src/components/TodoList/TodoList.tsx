import React from 'react';
import {useAppSelector} from '../../store';
import {TodoStateType} from '../../store/todolist/todolist-types';
import {allTodoSelectors} from '../../store/todolist/todolist-selectors';
import Grid2 from '@mui/material/Unstable_Grid2';
import {Paper} from '@mui/material';
import {TodoItem} from './TodoItem';


export const TodoList = () => {
    const todo = useAppSelector<TodoStateType[]>(allTodoSelectors)

    return (
        <Grid2 container spacing={3}>
            {todo.map(todo => {
                return (
                    <Grid2 key={todo.id}>
                        <Paper style={{padding: '15px'}} elevation={4}>
                            <TodoItem
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
    )
};

