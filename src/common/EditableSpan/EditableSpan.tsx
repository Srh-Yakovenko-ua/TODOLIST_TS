import React from 'react'

import { TextField, Tooltip, Typography } from '@mui/material'

import { TaskStatuses } from '../../store'

import { text } from './editable-span-style'
import { useEditableSpan } from './useEditableSpan'

type EditableSpanType = {
  title: string
  onChangeTitle?: (newValue: string) => void
  disabled?: boolean
  taskStatus?: number
  fontWeight?: string
}

export const EditableSpan: React.FC<EditableSpanType> = ({
  title,
  onChangeTitle,
  disabled,
  taskStatus,
  fontWeight = '',
}) => {
  const {
    onClickEditMode,
    onBlurEditMode,
    editMode,
    onKeyUpEditMode,
    newTitle,
    onChangeValueHandler,
    error,
  } = useEditableSpan({ title, onChangeTitle })

  return (
    <>
      {editMode && (
        <TextField
          type="text"
          value={newTitle}
          onChange={onChangeValueHandler}
          onBlur={onBlurEditMode}
          onKeyUp={onKeyUpEditMode}
          autoFocus
          variant="standard"
          label={`previous name: ${title}`}
          helperText={error}
          error={!!error}
          disabled={disabled}
          multiline
        />
      )}

      {!editMode && (
        <>
          <Tooltip title="click to edit" arrow placement="top">
            <Typography
              component="p"
              onClick={onClickEditMode}
              sx={{
                ...text,
                textDecoration: taskStatus === TaskStatuses.Completed ? 'line-through' : '',
                opacity: taskStatus === TaskStatuses.Completed ? 0.5 : '',
                fontWeight: fontWeight ? 'bold' : '400',
              }}
            >
              {newTitle}
            </Typography>
          </Tooltip>
        </>
      )}
    </>
  )
}
