import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import { IconButton, TextField, Tooltip } from "@mui/material";
import { Span } from "./editable-span-style";

type EditableSpanType = {
  title: string;
  onChangeValueTextSpan?: (newValue: string) => void;
  disabled?: boolean;
  taskStatus?: number;
};

export const EditableSpan: React.FC<EditableSpanType> = ({
  title,
  onChangeValueTextSpan,
  disabled,
  taskStatus,
}) => {
  const [newTitle, setNewTitle] = useState<string>(title);
  const [editMode, setEditMode] = useState<boolean>(false);

  const onDoubleClickEditMode = () => setEditMode(!editMode);

  const onChangeValueHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    setNewTitle(newValue);
  };
  const onBlurEditMode = () => {
    setEditMode(!editMode);
    onChangeValueTextSpan && onChangeValueTextSpan(newTitle);
  };
  const onKeyUpEditMode = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onChangeValueTextSpan && onChangeValueTextSpan(newTitle);
      setEditMode(!editMode);
    }
  };
  return (
    <>
      {!editMode && (
        <>
          <Tooltip
            title={disabled ? "" : "double click for edit"}
            placement="top"
          >
            <IconButton
              disabled={disabled}
              color="primary"
              onDoubleClick={onDoubleClickEditMode}
            >
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <Span taskStatusProps={taskStatus}>{newTitle}</Span>
        </>
      )}
      {editMode && (
        <TextField
          type="text"
          value={newTitle}
          onChange={onChangeValueHandler}
          onBlur={onBlurEditMode}
          onKeyUp={onKeyUpEditMode}
          autoFocus
          variant="standard"
          label={`previous task name : ${title}`}
        />
      )}
    </>
  );
};
