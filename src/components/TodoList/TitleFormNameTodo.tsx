import React from 'react';
import {EditableSpan} from '../../common/EditableSpan';
import {IconButton, Tooltip} from '@mui/material';
import {red} from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {RequestStatusType} from '../../store/app/app-reducer';


const container = {
    fontWeight: 600,
    fontSize: '1.5em'
}

interface TitleFormNameTodoType {
    title: string
    entityTodoStatus: RequestStatusType
    onChangeTodoTitle: (newValue: string) => void
    removeTodo: () => void
}

export const TitleFormNameTodo: React.FC<TitleFormNameTodoType> = (
    {
        title,
        onChangeTodoTitle,
        removeTodo,
        entityTodoStatus,
    }) => {
    return (
        <div style={container}>
            <EditableSpan title={title}
                          disabled={entityTodoStatus === 'loading'}
                          onChangeValueTextSpan={onChangeTodoTitle}/>
            <Tooltip title="delete TODO" placement="top">
                <IconButton
                    sx={{color: red[400]}}
                    onClick={removeTodo}
                    disabled={entityTodoStatus === 'loading'}>
                    <DeleteForeverIcon/>
                </IconButton>
            </Tooltip>
        </div>
    );
};
