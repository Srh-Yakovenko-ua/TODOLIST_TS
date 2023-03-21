import React, { ChangeEvent } from 'react'

import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { Checkbox, IconButton, Tooltip } from '@mui/material'

import { EditableSpan } from 'common'
import { RequestStatusType, TaskStatuses } from 'store'
import { entityStatusDisabledUtils } from 'utils'

interface TaskTypeProps {
  todolistId: string
  taskTitle: string
  taskID: string
  taskStatus: TaskStatuses
  entityStatusTask: RequestStatusType
  updateStatusCheckbox: (e: ChangeEvent<HTMLInputElement>, taskID: string) => void
  handlerRemoveTask: (taskID: string) => void
  setNewTaskName: (newValue: string, taskID: string) => void
}

export const TaskItem: React.FC<TaskTypeProps> = ({
  taskTitle,
  taskID,
  entityStatusTask,
  updateStatusCheckbox,
  handlerRemoveTask,
  setNewTaskName,
  taskStatus,
}) => {
  const entityStatusDisabled = entityStatusDisabledUtils(entityStatusTask)

  return (
    <div>
      <Checkbox
        disabled={entityStatusDisabled}
        checked={taskStatus === TaskStatuses.Completed}
        onChange={e => updateStatusCheckbox(e, taskID)}
      />
      <EditableSpan
        title={taskTitle}
        disabled={entityStatusDisabled}
        taskStatus={taskStatus}
        onChangeTitle={(newValue: string) => setNewTaskName(newValue, taskID)}
      />
      <Tooltip title="delete Task" placement="right">
        <IconButton
          disabled={entityStatusDisabled}
          onClick={() => handlerRemoveTask(taskID)}
          color="primary"
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </div>
  )
}
