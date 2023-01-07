import React, { ChangeEvent } from "react";
import { TaskItem } from "./TaskItem";
import { useAppDispatch, useAppSelector } from "../../store";
import { TaskStatuses, TasksType } from "../../store/tasks/tasks-types";
import { FiltersType } from "../../store/todolist/todolist-types";
import { removeTaskTC, updateTaskTC } from "../../store/tasks/tasks-reducer";
import { filterSelector } from "../../store/tasks/tasks-selectors";

interface TaskListType {
  filter: FiltersType;
  todolistId: string;
}

export const TaskList: React.FC<TaskListType> = ({ filter, todolistId }) => {
  const dispatch = useAppDispatch();
  const tasks = useAppSelector<TasksType[] | undefined>((state) =>
    filterSelector(state, filter, todolistId)
  );

  const updateStatusCheckbox = (
    e: ChangeEvent<HTMLInputElement>,
    taskID: string
  ): void => {
    const status = e.currentTarget.checked
      ? TaskStatuses.Completed
      : TaskStatuses.New;
    dispatch(updateTaskTC(todolistId, taskID, { status }));
  };

  const handlerRemoveTask = (taskID: string): void =>
    dispatch(removeTaskTC(taskID, todolistId));
  const onChangeValueTextSpan = (newValue: string, taskID: string): void =>
    dispatch(updateTaskTC(todolistId, taskID, { title: newValue }));

  const tasksItemLayer =
    tasks &&
    tasks.map((task) => {
      return (
        <TaskItem
          key={task.id}
          taskTitle={task.title}
          taskID={task.id}
          taskStatus={task.status}
          todolistId={todolistId}
          entityStatusTask={task.entityStatusTask}
          updateStatusCheckbox={updateStatusCheckbox}
          handlerRemoveTask={handlerRemoveTask}
          onChangeValueTextSpan={onChangeValueTextSpan}
        />
      );
    });

  return <>{tasksItemLayer}</>;
};
