import React from "react";
import { Button, TextField, InlineStack } from "@shopify/polaris";

const TaskList = ({
  tasks,
  toggleComplete,
  deleteTask,
  startEdit,
  updateTask,
  editingId,
  editText,
  setEditText,
}) => {
  return (
    <div>
      {tasks.length === 0 ? (
        <p>No tasks to show</p>
      ) : (
        tasks.map((task) => (
            <InlineStack alignment="center" gap="tight">
            {editingId === task._id ? (
              <TextField
                value={editText}
                onChange={(value) => setEditText(value)}
                labelHidden
              />
            ) : (
              <Button
                plain
                onClick={() => toggleComplete(task._id, task.completed)}
                style={{
                  textDecoration: task.completed ? "line-through" : "none",
                }}
              >
                {task.item}
              </Button>
            )}
          
            <InlineStack gap="tight">
              {editingId === task._id ? (
                <Button onClick={() => updateTask(task._id)} primary>
                  Save
                </Button>
              ) : (
                <Button onClick={() => startEdit(task._id, task.item)}>Edit</Button>
              )}
              <Button destructive onClick={() => deleteTask(task._id)}>Delete</Button>
            </InlineStack>
          </InlineStack>
          
        ))
      )}
    </div>
  );
};

export default TaskList;
