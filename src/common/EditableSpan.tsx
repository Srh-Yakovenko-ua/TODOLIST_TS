import React, {useState, KeyboardEvent, ChangeEvent} from 'react';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import {IconButton, TextField, Tooltip} from '@mui/material';

type EditableSpanType = {
    title: string
    onChangeValueTextSpan?: (newValue: string) => void
    disabled?: boolean
}

export const EditableSpan: React.FC<EditableSpanType> = ({
                                                             title,
                                                             onChangeValueTextSpan,
                                                             disabled,
                                                         }) => {
    const [newValue, setNewValue] = useState<string>(title)
    const [editMode, setEditMode] = useState<boolean>(false)

    const ondblclickMode = () => setEditMode(!editMode)



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
                            onDoubleClick={ondblclickMode}>
                            <ModeEditIcon/>
                        </IconButton>
                    </Tooltip>
                    <span>{newValue}</span>
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

