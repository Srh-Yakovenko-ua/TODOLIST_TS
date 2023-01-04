import React from 'react';
import {EditableSpan} from '../../common/EditableSpan';
import {IconButton, Tooltip} from '@mui/material';
import {red} from '@mui/material/colors';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import {RequestStatusType} from '../../store/app/app-reducer';
import styled from 'styled-components';


interface TitleFormNameTodoType {
    title: string
    entityTodoStatus: RequestStatusType
    onChangeTodoTitle: (newValue: string) => void
    removeTodo: () => void
}

const Wrapper = styled.div`
  font-weight: 600;
  font-size: 1.5em;
`

export const TitleFormTodo: React.FC<TitleFormNameTodoType> = ({
                                                                   title,
                                                                   onChangeTodoTitle,
                                                                   removeTodo,
                                                                   entityTodoStatus,
                                                               }) => {
    return (
        <Wrapper>
            <EditableSpan title={title}
                          disabled={entityTodoStatus === 'loading'}
                          onChangeValueTextSpan={onChangeTodoTitle}/>
            <Tooltip title="delete TODO"
                     placement="top">
                <IconButton
                    sx={{color: red[400]}}
                    onClick={removeTodo}
                    disabled={entityTodoStatus === 'loading'}>
                    <DeleteForeverIcon/>
                </IconButton>
            </Tooltip>
        </Wrapper>
    );
};
