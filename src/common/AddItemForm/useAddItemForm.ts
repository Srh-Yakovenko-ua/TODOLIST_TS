import { ChangeEvent, KeyboardEvent, useState } from 'react'

export const useAddItemForm = (addItem: (title: string) => void) => {
  const [value, setValue] = useState<string>('')
  const [error, setError] = useState<string>('')

  const onChangeHandlerValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value

    if (value?.trim()?.length > 100) {
      setError('must be less than 100 characters')
    } else {
      setError('')
      setValue(value)
    }
  }
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (value?.trim()?.length > 100) return

    if (e.key === 'Enter') addItemHandler()
  }
  const addItemHandler = () => {
    if (value?.trim()?.length > 100) return

    if (value?.trim() !== '') {
      addItem(value)
      setValue('')
      setError('')
    } else setError('empty field add task')
  }

  return { value, error, onChangeHandlerValue, onKeyUpHandler, addItemHandler }
}
