import {
  ACTION_TYPE_TASK,
  TasksType,
  UpdateTaskModelType,
} from "./tasks-types";
import { RequestStatusType } from "../app/app-reducer";

export const getTasksAC = (items: TasksType[], todolistId: string) => {
  return {
    type: ACTION_TYPE_TASK.GET_TASKS,
    payload: {
      items,
      todolistId,
    },
  } as const;
};
export const createNewTaskAC = (item: TasksType) => {
  return {
    type: ACTION_TYPE_TASK.CREATE_NEW_TASK,
    item,
  } as const;
};

export const removeTaskAC = (taskID: string, todoID: string) => {
  return {
    type: ACTION_TYPE_TASK.REMOVE_TASK,
    payload: {
      taskID,
      todoID,
    },
  } as const;
};

export const updateTaskAC = (
  todoID: string,
  taskID: string,
  apiModel: UpdateTaskModelType
) => {
  return {
    type: ACTION_TYPE_TASK.UPDATE_TASK,
    payload: {
      todoID,
      taskID,
      apiModel,
    },
  } as const;
};

export const changeTaskEntityStatusAC = (
  todoID: string,
  taskID: string,
  entityStatus: RequestStatusType
) => {
  return {
    type: ACTION_TYPE_TASK.CHANGE_TASK_ENTITY_STATUS,
    payload: {
      todoID,
      taskID,
      entityStatus,
    },
  } as const;
};
