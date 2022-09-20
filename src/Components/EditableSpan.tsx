import React, {ChangeEvent, useState} from 'react';

type EditableSpanType = {
    title: string
    callback : (title : string)=>void
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
            <input value={currentTitle}
                   onBlur={changeEditHandler}
                   onChange={onChangeHandler}
                   autoFocus/> :
            <span onDoubleClick={changeEditHandler}>{props.title}</span>
    );
};

