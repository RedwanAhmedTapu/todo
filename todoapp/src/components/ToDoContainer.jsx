import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./TaskList";

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
        <div className="w-full max-w-md mx-auto bg-gray-900 text-white p-6 rounded-lg shadow-lg">
            <h1 className="text-4xl font-bold text-center mb-4">TO-DO App</h1>

            <div className="flex gap-2 mb-4">
                <input
                    type="text"
                    value={item}
                    onChange={(e) => setItem(e.target.value)}
                    className="flex-1 px-4 py-2 rounded-md text-white border-2 border-slate-400"
                    placeholder="Enter a task..."
                />
                <button onClick={addTask} className="bg-blue-500 px-4 py-2 rounded-md hover:bg-blue-600">
                    Add
                </button>
            </div>

            <TaskList tasks={tasks} toggleComplete={toggleComplete} deleteTask={deleteTask} startEdit={startEdit} updateTask={updateTask} editingId={editingId} editText={editText} setEditText={setEditText} />
        </div>
    );
};

export default ToDoContainer;