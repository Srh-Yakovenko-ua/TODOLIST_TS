import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Fab, TextField} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type InputPropsType = {
    callback: (newTitle: string) => void
}

export const Input = (props: InputPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState(false)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(false);
        if (e.key === 'Enter') {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.callback(title.trim());
            setTitle('');
        } else {
            setError(true);
        }
    }

    const styleFabBtn = {
        maxWidth: '30px',
        maxHeight: '30px',
        minWidth: '30px',
        minHeight: '30px',
        margin: '5px'
    }

    return (
        <div>
            <TextField id="outlined-basic"
                       variant="outlined"
                       size={'small'}
                       label={error ? 'Title is required' : 'type...'}
                       value={title}
                       onChange={onChangeHandler}
                       onKeyPress={onKeyPressHandler}
                       error={error}
            />
            <Fab size="small"
                 color="primary"
                 onClick={addTask}
                 style={styleFabBtn}>
                <AddIcon/>
            </Fab>
        </div>
    );
};

