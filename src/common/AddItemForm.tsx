import React, {ChangeEvent, KeyboardEvent, useState} from 'react';

import {IconButton, TextField, Tooltip} from '@mui/material';
import LibraryAddIcon from '@mui/icons-material/LibraryAdd';


type AddFormTodoList = {
    addItem: (title: string) => void
    label?: string
    title?: string
    disabled?: boolean
}

export const AddItemForm: React.FC<AddFormTodoList> = ({
                                                           addItem,
                                                           label,
                                                           title,
                                                           disabled
                                                       }) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');


    const onChangeHandlerValue = (e: ChangeEvent<HTMLInputElement>) => {
        setError('')
        const value = e.currentTarget.value
        setValue(value)
    }
    const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }
    const addItemHandler = () => {
        if (value.trim() !== '') {
            addItem(value)
            setValue('')
            setError('')
        } else setError('empty field add task')
    }


    return (
        <>
            <TextField type="text"
                       label={!label ? 'create a new task' : label}
                       helperText={error ? error : 'print text...'}
                       error={!!error}
                       variant="standard"
                       value={value}
                       onChange={onChangeHandlerValue}
                       onKeyUp={onKeyUpHandler}
                       disabled={disabled}

            />


            <Tooltip title={!title ? 'add Task' : title} placement="right">
                <IconButton onClick={addItemHandler}
                            disabled={disabled}
                            color="primary">
                    <LibraryAddIcon/>
                </IconButton>
            </Tooltip>

        </>
    );
};

