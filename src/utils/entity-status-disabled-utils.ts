import { RequestStatusType } from 'store'

export const entityStatusDisabledUtils = (
  entityStatusTask: RequestStatusType
): entityStatusTask is 'loading' => {
  return entityStatusTask === 'loading'
}
