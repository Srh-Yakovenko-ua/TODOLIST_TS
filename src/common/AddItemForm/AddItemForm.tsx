import React from "react";
import { IconButton, TextField, Tooltip } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";
import { useAddItemForm } from "./useAddItemForm";

interface AddFormTodoList {
  addItem: (title: string) => void;
  label?: string;
  title?: string;
  disabled?: boolean;
}

export const AddItemForm: React.FC<AddFormTodoList> = ({
  addItem,
  label,
  title,
  disabled,
}) => {
  const { addItemHandler, onKeyUpHandler, onChangeHandlerValue, value, error } =
    useAddItemForm(addItem);

  return (
    <>
      <TextField
        type="text"
        label={!label ? "create a new task" : label}
        helperText={error ? error : "print text..."}
        error={!!error}
        variant="standard"
        value={value}
        onChange={onChangeHandlerValue}
        onKeyUp={onKeyUpHandler}
        disabled={disabled}
      />

      <Tooltip title={!title ? "add Task" : title} placement="right">
        <IconButton
          onClick={addItemHandler}
          disabled={disabled}
          color="primary"
        >
          <LibraryAddIcon />
        </IconButton>
      </Tooltip>
    </>
  );
};
