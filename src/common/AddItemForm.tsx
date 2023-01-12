import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { IconButton, TextField, Tooltip } from "@mui/material";
import LibraryAddIcon from "@mui/icons-material/LibraryAdd";

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
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState<string>("");

  const onChangeHandlerValue = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    if (value?.trim()?.length > 100) {
      setError("must be less than 100 characters");
    } else {
      setError("");
      setValue(value);
    }
  };
  const onKeyUpHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (value?.trim()?.length > 100) return;

    if (e.key === "Enter") addItemHandler();
  };
  const addItemHandler = () => {
    if (value?.trim()?.length > 100) return;

    if (value?.trim() !== "") {
      addItem(value);
      setValue("");
      setError("");
    } else setError("empty field add task");
  };

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
