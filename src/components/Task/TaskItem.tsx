import React, {ChangeEvent} from 'react';
import {TaskStatuses} from '../../store/tasks/tasks-types';
import {EditableSpan} from '../../common/EditableSpan';
import {Checkbox, IconButton, Tooltip} from '@mui/material';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {RequestStatusType} from '../../store/app/app-reducer';


interface TaskTypeProps {
    todolistId: string
    taskTitle: string
    taskID: string
    taskStatus: TaskStatuses
    entityStatusTask: RequestStatusType
    updateStatusCheckbox: (e: ChangeEvent<HTMLInputElement>, taskID: string) => void
    handlerRemoveTask: (taskID: string) => void
    onChangeValueTextSpan: (newValue: string, taskID: string) => void
}

export const TaskItem: React.FC<TaskTypeProps> = ({
                                                      taskTitle,
                                                      taskID,
                                                      entityStatusTask,
                                                      updateStatusCheckbox,
                                                      handlerRemoveTask,
                                                      onChangeValueTextSpan,
                                                      taskStatus
                                                  }) => {


    return (
        <div>
            <Checkbox
                disabled={entityStatusTask === 'loading'}
                checked={taskStatus === TaskStatuses.Completed}
                onChange={(e) => updateStatusCheckbox(e, taskID)}

            />
            <EditableSpan title={taskTitle}
                          disabled={entityStatusTask === 'loading'}
                          taskStatus={taskStatus}
                          onChangeValueTextSpan={(newValue: string) => onChangeValueTextSpan(newValue, taskID)}
            />
            <Tooltip title="delete Task"
                     placement="right">
                <IconButton disabled={entityStatusTask === 'loading'}
                            onClick={() => handlerRemoveTask(taskID)}
                            color="primary"
                >
                    <DeleteForeverIcon/>
                </IconButton>
            </Tooltip>

        </div>
    );
};

