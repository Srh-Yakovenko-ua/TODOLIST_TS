import { RootReducerType } from '../root-reducer'
import { FiltersType } from '../todolist/todolist-types'

import { TaskStatuses } from './tasks-types'

export const filterSelector = (state: RootReducerType, filter: FiltersType, todoID: string) => {
  switch (filter) {
    case 'active':
      return state.tasks[todoID].filter(el => el.status === TaskStatuses.New)
    case 'completed':
      return state.tasks[todoID].filter(el => el.status === TaskStatuses.Completed)
    default:
      return state.tasks[todoID]
  }
}
