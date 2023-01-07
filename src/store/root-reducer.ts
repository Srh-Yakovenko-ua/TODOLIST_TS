import { combineReducers } from "redux";
import { tasksReducer } from "./tasks/tasks-reducer";
import { todolistReducer } from "./todolist/todolist-reducer";
import { appReducer } from "./app/app-reducer";
import { appAuthReducer } from "./appAuth/appAuth-reducer";

export type RootReducerType = ReturnType<typeof rootReducer>;

export const rootReducer = combineReducers({
  tasks: tasksReducer,
  todolist: todolistReducer,
  app: appReducer,
  appAuth: appAuthReducer,
});
