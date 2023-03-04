import React, { useEffect } from 'react'

import { Container, Paper } from '@mui/material'
import Grid from '@mui/material/Unstable_Grid2'
import { Navigate } from 'react-router-dom'

import { AddItemForm } from '../../common/AddItemForm/AddItemForm'
import { useAppDispatch, useAppSelector } from '../../store'
import { appAuthSelectors } from '../../store/appAuth/appAuth-selectors'
import { createNewTodoTC, getTodoListsTC } from '../../store/todolist/todolist-reducer'
import { allTodoSelectors } from '../../store/todolist/todolist-selectors'

import { TodoItem } from './TodoItem'

export const TodoList = () => {
  const dispatch = useAppDispatch()
  const todo = useAppSelector(allTodoSelectors)
  const isAuth = useAppSelector(appAuthSelectors)

  const createNewTodo = (title: string) => dispatch(createNewTodoTC(title))

  useEffect(() => {
    if (!isAuth) return
    dispatch(getTodoListsTC())
  }, [dispatch, isAuth])

  if (!isAuth) return <Navigate to={'/login'} />

  const todoItemLayout = todo.map(todo => {
    return (
      <Grid key={todo.id}>
        <Paper style={{ padding: '15px' }} elevation={4}>
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

  return (
    <div>
      <Container fixed>
        <Grid container style={{ padding: '15px' }}>
          <AddItemForm addItem={createNewTodo} label="create new Todo" title="add Todo" />
        </Grid>
        <Grid container spacing={3}>
          {todoItemLayout}
        </Grid>
      </Container>
    </div>
  )
}
