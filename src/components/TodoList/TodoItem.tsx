import React from 'react'

import styled from 'styled-components'

import { TaskList } from '../Task/TaskList'

import { ButtonGroupFilter } from './BtnGroupFilter/ButtonGroupFilter'
import { TitleFormTodo } from './TitleFormTodo/TitleFormTodo'

import { AddItemForm } from 'common'
import {
  RequestStatusType,
  useAppDispatch,
  createNewTaskTC,
  changeFilterTodoAC,
  removeTodoTC,
  updateTodoTitleTC,
  FiltersType,
} from 'store'
import { entityStatusDisabledUtils } from 'utils'

type TodoListType = {
  todolistId: string
  title: string
  filter: FiltersType
  entityTodoStatus: RequestStatusType
}

const AddItemFormWrapper = styled.div`
  display: flex;
  gap: 30px;
`

export const TodoItem: React.FC<TodoListType> = ({
  todolistId,
  title,
  filter,
  entityTodoStatus,
}) => {
  const dispatch = useAppDispatch()
  const entityStatusDisabled = entityStatusDisabledUtils(entityTodoStatus)

  const addTask = (title: string) => dispatch(createNewTaskTC(title, todolistId))
  const onChangeTodoTitle = (title: string) => dispatch(updateTodoTitleTC(todolistId, title))
  const removeTodo = () => dispatch(removeTodoTC(todolistId))

  const filterTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const DATA_SET = e.currentTarget.dataset.filter as FiltersType

    DATA_SET && dispatch(changeFilterTodoAC(DATA_SET, todolistId))
  }

  return (
    <>
      <TitleFormTodo
        title={title}
        entityTodoStatus={entityTodoStatus}
        onChangeTodoTitle={onChangeTodoTitle}
        removeTodo={removeTodo}
      />
      <AddItemFormWrapper>
        <AddItemForm addItem={addTask} disabled={entityStatusDisabled} />
      </AddItemFormWrapper>
      <TaskList filter={filter} todolistId={todolistId} />
      <ButtonGroupFilter filter={filter} filterTodo={filterTodo} />
    </>
  )
}
