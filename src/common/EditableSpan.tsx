import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {IconButton, TextField, Tooltip} from '@mui/material';
import {TaskStatuses} from '../store/tasks/tasks-types';
import styled from 'styled-components';

interface EditableSpanType {
    title: string
    onChangeValueTextSpan?: (newValue: string) => void
    disabled?: boolean
    taskStatus?: TaskStatuses
}

const Span = styled.span<{ taskStatusProps: TaskStatuses | undefined }>`
  opacity: ${props => props.taskStatusProps === TaskStatuses.Completed ? 0.5 : ''};
  text-decoration: ${props => props.taskStatusProps === TaskStatuses.Completed ? 'line-through' : ''};
`

export const EditableSpan: React.FC<EditableSpanType> = ({
                                                             title,
                                                             onChangeValueTextSpan,
                                                             disabled,
                                                             taskStatus,
                                                         }) => {
    const [newValue, setNewValue] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const onDoubleClickEditMode = () => setEditMode(!editMode)


    const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = e.currentTarget.value
        setNewValue(newValue)
    }
    const onBlurEditMode = () => {
        setEditMode(!editMode)
        onChangeValueTextSpan && onChangeValueTextSpan(newValue)
    }
    const onKeyUpEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onChangeValueTextSpan && onChangeValueTextSpan(newValue)
            setEditMode(!editMode)
        }
    }
    return (
        <>
            {!editMode ?
                <>
                    <Tooltip title={disabled ? '' : 'double click for edit'} placement="top">
                        <IconButton
                            disabled={disabled}
                            color="primary"
                            onDoubleClick={onDoubleClickEditMode}>
                            <ModeEditIcon/>
                        </IconButton>
                    </Tooltip>
                    <Span taskStatusProps={taskStatus}>{newValue}</Span>
                </> :
                <TextField
                    type="text"
                    value={newValue}
                    onChange={onChangeValueHandler}
                    onBlur={onBlurEditMode}
                    onKeyUp={onKeyUpEditMode}
                    autoFocus
                    variant="standard"
                    label={`previous task name : ${title}`}
                />
            }
        </>

    );
};

