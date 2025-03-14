import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import { Page, Card, FormLayout, TextField, Button } from "@shopify/polaris";

const API_URL = "http://localhost:5000/api/todos";

const ToDoContainer = () => {
  const [item, setItem] = useState("");
  const [tasks, setTasks] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!item.trim()) return;
    try {
      const response = await axios.post(API_URL, { item, completed: false });
      setTasks([...tasks, response.data]);
      setItem("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { completed: !completed });
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter(task => task._id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEdit = (id, text) => {
    setEditingId(id);
    setEditText(text);
  };

  const updateTask = async (id) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, { item: editText });
      setTasks(tasks.map(task => (task._id === id ? response.data : task)));
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  return (
    <Page title="TO-DO App">
      <Card sectioned>
        <FormLayout>
          <TextField
            label="New Task"
            value={item}
            onChange={(value) => setItem(value)}
            placeholder="Enter a task..."
          />
          <Button onClick={addTask} primary>
            Add Task
          </Button>
        </FormLayout>
      </Card>
      <Card title="Task List" sectioned>
        <TaskList
          tasks={tasks}
          toggleComplete={toggleComplete}
          deleteTask={deleteTask}
          startEdit={startEdit}
          updateTask={updateTask}
          editingId={editingId}
          editText={editText}
          setEditText={setEditText}
        />
      </Card>
    </Page>
  );
};

export default ToDoContainer;
