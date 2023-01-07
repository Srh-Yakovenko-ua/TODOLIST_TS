import React from "react";
import { useAppDispatch } from "../../store";
import { createNewTaskTC } from "../../store/tasks/tasks-reducer";
import {
  removeTodoTC,
  updateTodoTitleTC,
} from "../../store/todolist/todolist-reducer";
import { FiltersType } from "../../store/todolist/todolist-types";
import { changeFilterTodoAC } from "../../store/todolist/todolist-action";
import { TitleFormTodo } from "./TitleFormTodo/TitleFormTodo";
import { AddItemForm } from "../../common/AddItemForm";
import { TaskList } from "../Task/TaskList";
import { ButtonGroupFilter } from "./BtnGroupFilter/ButtonGroupFilter";
import { RequestStatusType } from "../../store/app/app-reducer";
import styled from "styled-components";
import { entityStatusDisabledUtils } from "../../utils/entity-status-disabled-utils";

type TodoListType = {
  todolistId: string;
  title: string;
  filter: FiltersType;
  entityTodoStatus: RequestStatusType;
};

const AddItemFormWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const TodoItem: React.FC<TodoListType> = ({
  todolistId,
  title,
  filter,
  entityTodoStatus,
}) => {
  const dispatch = useAppDispatch();

  const addTask = (title: string) =>
    dispatch(createNewTaskTC(title, todolistId));
  const onChangeTodoTitle = (title: string) =>
    dispatch(updateTodoTitleTC(todolistId, title));
  const removeTodo = () => dispatch(removeTodoTC(todolistId));

  const filterTodo = (e: React.MouseEvent<HTMLButtonElement>) => {
    const DATA_SET = e.currentTarget.dataset.filter as FiltersType;
    DATA_SET && dispatch(changeFilterTodoAC(DATA_SET, todolistId));
  };

  return (
    <>
      <TitleFormTodo
        title={title}
        entityTodoStatus={entityTodoStatus}
        onChangeTodoTitle={onChangeTodoTitle}
        removeTodo={removeTodo}
      />
      <AddItemFormWrapper>
        <AddItemForm
          addItem={addTask}
          disabled={entityStatusDisabledUtils(entityTodoStatus)}
        />
      </AddItemFormWrapper>
      <TaskList filter={filter} todolistId={todolistId} />
      <ButtonGroupFilter filter={filter} filterTodo={filterTodo} />
    </>
  );
};


