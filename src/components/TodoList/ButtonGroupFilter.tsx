import React from 'react';
import {Button} from '@mui/material';
import {FiltersType} from '../../store/todolist/todolist-types';
import styled from 'styled-components';

interface ButtonFilterType {
    filter: FiltersType
    filterTodo: (e: React.MouseEvent<HTMLButtonElement>) => void
}

const additionalStylesForBtn = {
    '&:hover': {
        background: '#739fcb',
        color: 'white',
        border: '1px solid #739fcb',
    }
}

const Wrapper = styled.div`
  padding: 15px;
  display: flex;
  gap: 5px;
`

export const ButtonGroupFilter: React.FC<ButtonFilterType> = ({
                                                                  filter,
                                                                  filterTodo,
                                                              }) => {
    return (
        <Wrapper>
            <Button data-filter="all"
                    sx={additionalStylesForBtn}
                    variant={filter === 'all' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={filterTodo}>all</Button>
            <Button data-filter="active"
                    sx={additionalStylesForBtn}
                    variant={filter === 'active' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={filterTodo}>active</Button>
            <Button data-filter="completed"
                    sx={additionalStylesForBtn}
                    variant={filter === 'completed' ? 'contained' : 'outlined'}
                    color="primary"
                    onClick={filterTodo}>completed</Button>
        </Wrapper>
    );
};

