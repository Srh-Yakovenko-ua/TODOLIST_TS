import React, { ChangeEvent } from "react";
import { TaskStatuses } from "../../store/tasks/tasks-types";
import { EditableSpan } from "../../common/EditableSpan/EditableSpan";
import { Checkbox, IconButton, Tooltip } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RequestStatusType } from "../../store/app/app-reducer";
import { entityStatusDisabledUtils } from "../../utils/entity-status-disabled-utils";

interface TaskTypeProps {
  todolistId: string;
  taskTitle: string;
  taskID: string;
  taskStatus: TaskStatuses;
  entityStatusTask: RequestStatusType;
  updateStatusCheckbox: (
    e: ChangeEvent<HTMLInputElement>,
    taskID: string
  ) => void;
  handlerRemoveTask: (taskID: string) => void;
  setNewTaskName: (newValue: string, taskID: string) => void;
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
  const entityStatusDisabled = entityStatusDisabledUtils(entityStatusTask);
  return (
    <div>
      <Checkbox
        disabled={entityStatusDisabled}
        checked={taskStatus === TaskStatuses.Completed}
        onChange={(e) => updateStatusCheckbox(e, taskID)}
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
  );
};
