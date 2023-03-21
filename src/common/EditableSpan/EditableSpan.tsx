import React from 'react'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { IconButton, TextField, Tooltip } from '@mui/material'

import { Span } from './editable-span-style'
import { useEditableSpan } from './useEditableSpan'

type EditableSpanType = {
  title: string
  onChangeTitle?: (newValue: string) => void
  disabled?: boolean
  taskStatus?: number
}

export const EditableSpan: React.FC<EditableSpanType> = ({
  title,
  onChangeTitle,
  disabled,
  taskStatus,
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
      {!editMode && (
        <>
          <Tooltip title={disabled ? '' : 'click for edit'} placement="top" arrow>
            <IconButton disabled={disabled} color="primary" onClick={onClickEditMode}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <Span taskStatusProps={taskStatus}>{newTitle}</Span>
        </>
      )}
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
        />
      )}
    </>
  )
}
