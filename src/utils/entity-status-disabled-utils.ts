import { RequestStatusType } from '../store/app/app-reducer'

export const entityStatusDisabledUtils = (
  entityStatusTask: RequestStatusType
): entityStatusTask is 'loading' => {
  return entityStatusTask === 'loading'
}
