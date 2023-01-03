import React from 'react';
import {Button} from '@mui/material';
import {FiltersType} from '../../store/todolist/todolist-types';

interface ButtonFilterType {
    filter : FiltersType
    filterTodo : (e: React.MouseEvent<HTMLButtonElement>) => void
}

const hoverBtn = {
    '&:hover': {
        background: '#739fcb',
        color: 'white',
        border: '1px solid #739fcb',
    }
}
export const ButtonFilter: React.FC<ButtonFilterType> = (
    {
        filter,
        filterTodo
    }) => {


    return (
        <div style={{padding: '15px', display: 'flex', gap: '5px'}}>
            <Button data-set="all"
                    sx={hoverBtn}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={filterTodo}>all</Button>
            <Button data-set="active"
                    sx={hoverBtn}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={filterTodo}>active</Button>
            <Button data-set="completed"
                    sx={hoverBtn}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={filterTodo}>completed</Button>
        </div>
    );
};

