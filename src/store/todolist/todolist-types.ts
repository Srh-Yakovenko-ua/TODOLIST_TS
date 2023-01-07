import {
  changeFilterTodoAC,
  changeTodoEntityStatusAC,
  createTodoAC,
  getTodoAC,
  removeTodoAC,
  updateTodoTitleAC,
} from "./todolist-action";
import { AppActionType, RequestStatusType } from "../app/app-reducer";

export type FiltersType = "all" | "completed" | "active";

export interface TodoStateType {
  id: string;
  addedDate: string;
  order: number;
  title: string;
  filter: FiltersType;
  entityStatus: RequestStatusType;
}

export interface GeneralResponseType<T> {
  resultCode: number;
  messages: string[];
  data: T;
}

export enum ACTION_TYPE_TODOLIST {
  GET_TODO = "@@todolist/GET_TODO",
  CREATE_NEW_TODO = "@@todolist/CREATE_NEW_TODO",
  UPDATE_TODO_TITLE = "@@todolist/UPDATE_TODO_TITLE",
  REMOVE_TODO = "@@todolist/REMOVE_TODO",
  CHANGE_TODO_ENTITY_STATUS = "@@todolist/CHANGE_ENTITY_STATUS",
  CHANGE_TODO_FILTER = "@@todolist/CHANGE_TODO_FILTER",
}

export type ActionsTodolistType =
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof getTodoAC>
  | ReturnType<typeof removeTodoAC>
  | ReturnType<typeof createTodoAC>
  | ReturnType<typeof updateTodoTitleAC>
  | ReturnType<typeof changeFilterTodoAC>
  | ReturnType<typeof changeTodoEntityStatusAC>
  | AppActionType;


