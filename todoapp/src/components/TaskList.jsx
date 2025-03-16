import React, { useState, useCallback } from "react";
import {
  Box,
  Button,
  TextField,
  InlineStack,
  Text,
  Card,
  Icon,
  Tooltip,
  BlockStack,
  Badge,
} from "@shopify/polaris";
import { EditIcon, SaveIcon, DeleteIcon,SearchIcon } from "@shopify/polaris-icons";

const TaskList = ({
  filteredTasks,
  filterTaskBaseonCompletion,
  toggleComplete,
  deleteTask,
  startEdit,
  updateTask,
  editingId,
  editText,
  setEditText,
}) => {
  const [textFieldValue, setTextFieldValue] = useState("");
  
  const filteredList = filteredTasks.filter((task) => {
    const matchesSearch =
      textFieldValue === "" ||
      task.item.toLowerCase().includes(textFieldValue.toLowerCase());

    return matchesSearch;
  });

  const highlightText = (text, highlight) => {
    if (!highlight) return text;

    const index = text.toLowerCase().indexOf(highlight.toLowerCase());
    if (index !== -1 && highlight.length >= 3) {
      return (
        <>
          {text.substring(0, index)}
          <span style={{ color: "orange"}}>
            {text.substring(index, index + highlight.length)}
          </span>
          {text.substring(index + highlight.length)}
        </>
      );
    }
    return text;
  };

  const handleTextFieldChange = useCallback((value) => {
    setTextFieldValue(value);
  }, []);

  return (
    <>
      <Box>
        <BlockStack>
          <InlineStack gap="100">
            <Button
              onClick={() => {
                filterTaskBaseonCompletion(true);
              }}
            >
              <Badge progress="complete">Completed</Badge>
            </Button>
            <Button
              onClick={() => {
                filterTaskBaseonCompletion(false);
              }}
            >
              <Badge progress="incomplete" tone="attention">
                Incompleted
              </Badge>
            </Button>
            <TextField
              value={textFieldValue}
              onChange={handleTextFieldChange}
              placeholder="Search tasks "
              prefix={<Icon source={SearchIcon} />}
              autoComplete="off"
            />
          </InlineStack>
        </BlockStack>
      </Box>

      {filteredList.length === 0 ? (
        <Text variant="bodyMd" alignment="center" tone="subdued">
          No tasks to show
        </Text>
      ) : (
        filteredList.map((task) => (
          <Box
            key={task._id}
            padding="200"
            borderRadius="200"
            shadow="md"
            marginBlockEnd="200"
            gap="200"
          >
            <InlineStack align="space-between" gap="200">
              {editingId === task._id ? (
                <TextField
                  value={editText}
                  onChange={(value) => setEditText(value)}
                  labelHidden
                />
              ) : (
                <Text
                  variant="bodyMd"
                  onClick={() => toggleComplete(task._id, task.completed)}
                  tone={task.completed ? "subdued" : "default"}
                  style={{
                    textDecoration: task.completed ? "line-through" : "none",
                    cursor: "pointer",
                  }}
                >
                  {highlightText(task.item, textFieldValue)}
                </Text>
              )}

              <InlineStack gap="200">
                {editingId === task._id ? (
                  <Tooltip dismissOnMouseOut content="Save">
                    <Button
                      onClick={() => updateTask(task._id)}
                      primary
                      icon={SaveIcon}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip dismissOnMouseOut content="Update">
                    <Button
                      onClick={() => startEdit(task._id, task.item)}
                      icon={EditIcon}
                    />
                  </Tooltip>
                )}
                <Tooltip dismissOnMouseOut content="Delete">
                  <Button
                    destructive
                    onClick={() => deleteTask(task._id)}
                    icon={DeleteIcon}
                  />
                </Tooltip>
              </InlineStack>
            </InlineStack>
          </Box>
        ))
      )}
    </>
  );
};

export default TaskList;
