import styled from 'styled-components'

import { TaskStatuses } from '../../store/tasks/tasks-types'

export const Span = styled.span<{ taskStatusProps: number | undefined }>`
  opacity: ${props => (props.taskStatusProps === TaskStatuses.Completed ? 0.5 : '')};
  text-decoration: ${props =>
    props.taskStatusProps === TaskStatuses.Completed ? 'line-through' : ''};
`
