import React from "react";
import { EditableSpan } from "../../../common/EditableSpan/EditableSpan";
import { IconButton, Tooltip } from "@mui/material";
import { red } from "@mui/material/colors";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { RequestStatusType } from "../../../store/app/app-reducer";
import { TitleFormContainer } from "./title-form-style";
import { entityStatusDisabledUtils } from "../../../utils/entity-status-disabled-utils";

interface TitleFormNameTodoType {
  title: string;
  entityTodoStatus: RequestStatusType;
  onChangeTodoTitle: (newValue: string) => void;
  removeTodo: () => void;
}

export const TitleFormTodo: React.FC<TitleFormNameTodoType> = ({
  title,
  onChangeTodoTitle,
  removeTodo,
  entityTodoStatus,
}) => {
  return (
    <TitleFormContainer>
      <EditableSpan
        title={title}
        disabled={entityStatusDisabledUtils(entityTodoStatus)}
        onChangeValueTextSpan={onChangeTodoTitle}
      />
      <Tooltip title="delete TODO" placement="top">
        <IconButton
          sx={{ color: red[400] }}
          onClick={removeTodo}
          disabled={entityStatusDisabledUtils(entityTodoStatus)}
        >
          <DeleteForeverIcon />
        </IconButton>
      </Tooltip>
    </TitleFormContainer>
  );
};
