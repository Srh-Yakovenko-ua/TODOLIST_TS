import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import { Fab} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

type InputPropsType = {
    callback: (newTitle: string) => void
}

export const Input = (props: InputPropsType) => {
    let [title, setTitle] = useState('')
    let [error, setError] = useState<string | null>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addTask();
        }
    }

    const addTask = () => {
        if (title.trim() !== '') {
            props.callback(title.trim());
            setTitle('');
        } else {
            setError('Title is required');
        }
    }

    return (
        <div>
            <input value={title}
                   onChange={onChangeHandler}
                   onKeyPress={onKeyPressHandler}
                   className={error ? 'error' : ''}
            />
            <Fab size="small" color="primary" onClick={addTask} style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}>
                <AddIcon/>
            </Fab>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

