import React, { ChangeEvent, KeyboardEvent, useState } from 'react'

import ModeEditIcon from '@mui/icons-material/ModeEdit'
import { IconButton, TextField, Tooltip } from '@mui/material'

import { Span } from './editable-span-style'

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
  const [newTitle, setNewTitle] = useState<string>(title)
  const [editMode, setEditMode] = useState<boolean>(false)
  const [error, setError] = useState('')

  const onClickEditMode = () => setEditMode(!editMode)

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value

    setNewTitle(newValue)
  }
  const onBlurEditMode = () => {
    if (!newTitle.length) {
      setError('can not be empty')

      return
    }

    setEditMode(!editMode)
    onChangeTitle && onChangeTitle(newTitle)
    setError('')
  }
  const onKeyUpEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!newTitle.length) {
        setError('can not be empty')

        return
      }
      onChangeTitle && onChangeTitle(newTitle)
      setEditMode(!editMode)
      setError('')
    }
  }

  return (
    <>
      {!editMode && (
        <>
          <Tooltip title="click for edit" placement="top" arrow>
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
