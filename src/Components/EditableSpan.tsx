import React, {useState} from 'react';

type EditableSpanType = {
    title: string
}

export const EditableSpan = (props: EditableSpanType) => {
    const [edit, setEdit] = useState(false)
    const changeEditHandler = () => {
        setEdit(!edit)
    }

    return (
        edit ?
            <input value={props.title} onBlur={changeEditHandler} autoFocus /> :
            <span onDoubleClick={changeEditHandler}>{props.title}</span>
    );
};

