import {
  changeTaskEntityStatusAC,
  createNewTaskAC,
  getTasksAC,
  removeTaskAC,
  updateTaskAC,
} from "./tasks-action";
import { createTodoAC } from "../todolist/todolist-action";
import { AppActionType, RequestStatusType } from "../app/app-reducer";

export interface TaskStateType {
  [key: string]: TasksType[];
}

export type ActionsTaskType =
  | ReturnType<typeof getTasksAC>
  | ReturnType<typeof createNewTaskAC>
  | ReturnType<typeof createTodoAC>
  | ReturnType<typeof removeTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof changeTaskEntityStatusAC>
  | AppActionType;

export enum ACTION_TYPE_TASK {
  GET_TASKS = "@@task/GET_TASKS",
  CREATE_NEW_TASK = "@@task/CREATE_NEW_TASK",
  REMOVE_TASK = "@@task/REMOVE_TASK",
  UPDATE_TASK = "@@task/ UPDATE_TASK",
  CHANGE_TASK_ENTITY_STATUS = "@@task/CHANGE_TASK_ENTITY_STATUS",
}

export interface UpdateDomainTaskModelType {
  title?: string;
  description?: string;
  completed?: boolean;
  status?: TaskStatuses;
  priority?: TaskPriorities;
  startDate?: string;
  deadline?: string;
}

export interface UpdateTaskModelType {
  title: string;
  description: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
}

export interface TasksType {
  description: string;
  title: string;
  completed: boolean;
  status: TaskStatuses;
  priority: TaskPriorities;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
  entityStatusTask: RequestStatusType;
}

export enum TaskStatuses {
  New = 0,
  inProgress = 1,
  Completed = 2,
  Draft = 3,
}

export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Later = 4,
}
