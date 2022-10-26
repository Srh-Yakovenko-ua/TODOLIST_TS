import React, {ChangeEvent} from 'react';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from '../state/tasks-reducer';
import {Checkbox, IconButton} from '@mui/material';
import {EditableSpan} from '../EditableSpan';
import {Delete} from '@mui/icons-material';
import {useDispatch} from 'react-redux';
import {TaskType} from './TodolistRedux';

interface TaskPropsType {
    task: TaskType
    todolistId: string
}

const Task: React.FC<TaskPropsType> = React.memo((props) => {
    const {task, todolistId} = props;
    const dispatch = useDispatch()

    const onClickHandler = () => dispatch(removeTaskAC(task.id, todolistId))

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        let newIsDoneValue = e.currentTarget.checked;
        dispatch(changeTaskStatusAC(task.id, newIsDoneValue, todolistId))
    }

    const onTitleChangeHandler = (newValue: string) => {
        dispatch(changeTaskTitleAC(task.id, newValue, todolistId))
    }


    return (
        <div key={task.id} className={task.isDone ? 'is-done' : ''}>
            <Checkbox
                checked={task.isDone}
                color="primary"
                onChange={onChangeHandler}
            />

            <EditableSpan value={task.title} onChange={onTitleChangeHandler}/>
            <IconButton onClick={onClickHandler}>
                <Delete/>
            </IconButton>
        </div>
    )
});

export {Task};