import React from 'react'

import { Button } from '@mui/material'

import { additionalBtnStyles, ButtonContainer } from './btn-group-filter-style'

import { FiltersType } from 'store'

interface ButtonFilterType {
  filter: FiltersType
  filterTodo: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export const ButtonGroupFilter: React.FC<ButtonFilterType> = ({ filter, filterTodo }) => {
  return (
    <ButtonContainer>
      <Button
        data-filter="all"
        sx={additionalBtnStyles}
        variant={filter === 'all' ? 'contained' : 'outlined'}
        color="primary"
        onClick={filterTodo}
      >
        all
      </Button>
      <Button
        data-filter="active"
        sx={additionalBtnStyles}
        variant={filter === 'active' ? 'contained' : 'outlined'}
        color="primary"
        onClick={filterTodo}
      >
        active
      </Button>
      <Button
        data-filter="completed"
        sx={additionalBtnStyles}
        variant={filter === 'completed' ? 'contained' : 'outlined'}
        color="primary"
        onClick={filterTodo}
      >
        completed
      </Button>
    </ButtonContainer>
  )
}
