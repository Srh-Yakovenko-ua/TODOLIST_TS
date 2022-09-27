import React, {ChangeEvent, useState} from 'react';
import {TextField} from '@mui/material';

type EditableSpanType = {
    title: string
    callback: (title: string) => void
}

export const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false);
    let [currentTitle, setTitle] = useState(props.title);

    const changeEditHandler = () => {
        setEdit(!edit)
        props.callback(currentTitle.trim());
    }
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }


    return (
        edit ?
            <TextField value={currentTitle}
                       variant="standard"
                       style={{maxWidth : '120px'}}
                       size={'small'}
                   onBlur={changeEditHandler}
                   onChange={onChangeHandler}
                   autoFocus/> :
            <span onDoubleClick={changeEditHandler}>{props.title}</span>
    );
};

