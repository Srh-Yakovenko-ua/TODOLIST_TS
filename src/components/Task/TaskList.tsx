import React, { ChangeEvent } from 'react'

import { useAppDispatch, useAppSelector } from '../../store'
import { removeTaskTC, updateTaskTC } from '../../store/tasks/tasks-reducer'
import { filterSelector } from '../../store/tasks/tasks-selectors'
import { TaskStatuses, TasksType } from '../../store/tasks/tasks-types'
import { FiltersType } from '../../store/todolist/todolist-types'

import { TaskItem } from './TaskItem'

interface TaskListType {
  filter: FiltersType
  todolistId: string
}

export const TaskList: React.FC<TaskListType> = ({ filter, todolistId }) => {
  const dispatch = useAppDispatch()
  const tasks = useAppSelector<TasksType[] | undefined>(state =>
    filterSelector(state, filter, todolistId)
  )

  const setNewStatusCheckbox = (e: ChangeEvent<HTMLInputElement>, taskID: string): void => {
    const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New

    dispatch(updateTaskTC(todolistId, taskID, { status }))
  }

  const removeCurrentTask = (taskID: string): void => dispatch(removeTaskTC(taskID, todolistId))
  const setNewTaskName = (newValue: string, taskID: string): void =>
    dispatch(updateTaskTC(todolistId, taskID, { title: newValue }))

  const tasksItemLayout = tasks?.map(task => {
    return (
      <TaskItem
        key={task.id}
        taskTitle={task.title}
        taskID={task.id}
        taskStatus={task.status}
        todolistId={todolistId}
        entityStatusTask={task.entityStatusTask}
        updateStatusCheckbox={setNewStatusCheckbox}
        handlerRemoveTask={removeCurrentTask}
        setNewTaskName={setNewTaskName}
      />
    )
  })

  return <>{tasksItemLayout}</>
}
