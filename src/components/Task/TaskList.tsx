import React, {ChangeEvent} from 'react';
import {TaskItem} from './TaskItem';
import {useAppDispatch, useAppSelector} from '../../store';
import {TaskStatuses, TasksType} from '../../store/tasks/tasks-types';
import {filterSelector} from '../../store/todolist/todolist-selectors';
import {FiltersType} from '../../store/todolist/todolist-types';
import {removeTaskThunk, updateTaskThunk} from '../../store/tasks/tasks-reducer';

interface TaskListType {
    filter: FiltersType
    todolistId: string
}

export const TaskList: React.FC<TaskListType> = (
    {
        filter,
        todolistId
    }) => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector<TasksType[] | undefined>(state => filterSelector(state, filter, todolistId))

    const updateStatusCheckbox = (e: ChangeEvent<HTMLInputElement>, taskID: string) => {
        const status = e.currentTarget.checked ? TaskStatuses.Completed : TaskStatuses.New
        dispatch(updateTaskThunk(todolistId, taskID, {status}))
    }

    const handlerRemoveTask = (taskID: string) => dispatch(removeTaskThunk(taskID, todolistId))
    const onChangeValueTextSpan = (newValue: string, taskID: string) => dispatch(updateTaskThunk(todolistId, taskID, {title: newValue}))

    return (
        <>
            {tasks && tasks.map(task => {
                return (
                    <TaskItem key={task.id}
                              taskTitle={task.title}
                              taskID={task.id}
                              taskStatus={task.status}
                              todolistId={todolistId}
                              entityStatusTask={task.entityStatusTask}
                              updateStatusCheckbox={updateStatusCheckbox}
                              handlerRemoveTask={handlerRemoveTask}
                              onChangeValueTextSpan={onChangeValueTextSpan}
                    />
                )
            })}
        </>
    );
};

