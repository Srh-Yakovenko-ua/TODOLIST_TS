import { useFormik } from 'formik'
import * as Yup from 'yup'

import { useAppDispatch } from '../../store'
import { authLoginTC } from '../../store/appAuth/appAuth-reducer'

export interface FormDataValuesType {
  email: string
  password: string
  rememberMe: boolean
}
export const useAuthLoginForm = () => {
  const dispatch = useAppDispatch()
  const { handleSubmit, errors, touched, getFieldProps } = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().email('Invalid email address').required(),
      password: Yup.string().max(20).required(),
    }),
    onSubmit: (data: FormDataValuesType): void => {
      dispatch(authLoginTC(data))
    },
  })

  return { handleSubmit, errors, touched, getFieldProps }
}
