import { ChangeEvent, KeyboardEvent, useState } from 'react'

type PropsType = {
  title?: string
  onChangeTitle?: (newValue: string) => void
}

export const useEditableSpan = ({ title = '', onChangeTitle }: PropsType) => {
  const [newTitle, setNewTitle] = useState(title)
  const [editMode, setEditMode] = useState(false)
  const [error, setError] = useState('')

  const onClickEditMode = () => setEditMode(!editMode)

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value

    if (newValue?.trim()?.length > 99) {
      setError('must be less than 100 characters')
    } else {
      setError('')
      setNewTitle(newValue)
    }
  }

  const onBlurEditMode = () => {
    if (!newTitle?.trim().length) {
      setError('can not be empty')

      return
    }
    if (newTitle?.trim().length > 99) {
      setError('cannot be more than 100 characters')

      return
    }

    setEditMode(!editMode)
    onChangeTitle && onChangeTitle(newTitle)
    setError('')
  }

  const onKeyUpEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!newTitle.trim().length) {
        setError('can not be empty')

        return
      }

      onChangeTitle && onChangeTitle(newTitle)
      setEditMode(!editMode)
      setError('')
    }
  }

  return {
    newTitle,
    editMode,
    error,
    onClickEditMode,
    onChangeValueHandler,
    onBlurEditMode,
    onKeyUpEditMode,
  }
}
