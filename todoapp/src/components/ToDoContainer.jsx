import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";
import {
  Page,
  InlineError,
  Card,
  FormLayout,
  TextField,
  Button,
  Layout,
} from "@shopify/polaris";

import { PlusIcon } from "@shopify/polaris-icons";

const API_URL = "http://localhost:5000/api/todos";

const ToDoContainer = () => {
  const [item, setItem] = useState("");
  const [emptyItem, setEmptyItem] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState(tasks);
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
      setFilteredTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (!item.trim()) return setEmptyItem(true);
    try {
      setEmptyItem(false);
      const response = await axios.post(API_URL, { item, completed: false });
      setTasks([...tasks, response.data]);
      setFilteredTasks([...tasks, response.data]);
      setItem("");
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const toggleComplete = async (id, completed) => {
    try {
      const response = await axios.put(`${API_URL}/${id}`, {
        completed: !completed,
      });
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setFilteredTasks(tasks.map((task) => (task._id === id ? response.data : task)));
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      setTasks(tasks.filter((task) => task._id !== id));
      setFilteredTasks(tasks.filter((task) => task._id !== id));
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
      setTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setFilteredTasks(tasks.map((task) => (task._id === id ? response.data : task)));
      setEditingId(null);
      setEditText("");
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const filterTaskBaseonCompletion = (isCompleted) => {
    if (isCompleted === null) {
      setFilteredTasks(tasks);
    } else {
      const filtered = tasks.filter((task) => task.completed === isCompleted);
      setFilteredTasks(filtered);
    }
  };
  
  return (
    <Page title="TO-DO App" narrowWidth>
      <Layout>
        <Layout.Section>
          <Card sectioned>
            <FormLayout>
              <TextField
                label="New Task"
                value={item}
                onChange={(value) => setItem(value)}
                placeholder="Enter a task..."
              />
              {emptyItem && <InlineError message={`${emptyItem?"item required":""} `} fieldID="myFieldID" />}
              <Button onClick={addTask} primary icon={PlusIcon}></Button>
            </FormLayout>
          </Card>
        </Layout.Section>
        <Layout.Section>
          
          <Card background="bg-surface-success" title="Task List" sectioned>
            <TaskList
              filteredTasks={filteredTasks}
              filterTaskBaseonCompletion={filterTaskBaseonCompletion}
              toggleComplete={toggleComplete}
              deleteTask={deleteTask}
              startEdit={startEdit}
              updateTask={updateTask}
              editingId={editingId}
              editText={editText}
              setEditText={setEditText}
            />
          </Card>
        </Layout.Section>
      </Layout>
    </Page>
  );
};

export default ToDoContainer;
