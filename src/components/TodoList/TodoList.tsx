import React, { useEffect } from 'react'

import { Container, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Navigate } from 'react-router-dom'

import { todoItemContainer, todoListContainer } from './todo-style'
import { TodoItem } from './TodoItem'

import { AddItemForm } from 'common'
import {
  appAuthSelectors,
  useAppDispatch,
  useAppSelector,
  createNewTodoTC,
  getTodoListsTC,
  allTodoSelectors,
} from 'store'

export const TodoList = () => {
  const dispatch = useAppDispatch()
  const todo = useAppSelector(allTodoSelectors)
  const isAuth = useAppSelector(appAuthSelectors)

  const createNewTodo = (title: string) => dispatch(createNewTodoTC(title))

  useEffect(() => {
    if (!isAuth) return
    dispatch(getTodoListsTC())
  }, [dispatch, isAuth])

  const todoItemLayout = todo.map(todo => {
    return (
      <Grid key={todo.id}>
        <Paper sx={todoItemContainer} elevation={4}>
          <TodoItem
            key={todo.id}
            todolistId={todo.id}
            title={todo.title}
            filter={todo.filter}
            entityTodoStatus={todo.entityStatus}
          />
        </Paper>
      </Grid>
    )
  })

  if (!isAuth) return <Navigate to={'/login'} />

  return (
    <div>
      <Container fixed>
        <Grid container sx={todoListContainer}>
          <AddItemForm addItem={createNewTodo} label="create new Todo" title="add Todo" />
        </Grid>
        <Grid container spacing={3}>
          {todoItemLayout}
        </Grid>
      </Container>
    </div>
  )
}
