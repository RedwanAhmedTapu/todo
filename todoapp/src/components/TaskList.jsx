import React from "react";

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
        <div className="h-60 overflow-y-auto space-y-3">
            {tasks.length === 0 ? (
                <p className="text-center text-gray-400">No tasks to show</p>
            ) : (
                tasks.map((task) => (
                    <div
                        key={task._id}
                        className={`flex items-center justify-between p-3 rounded-lg shadow-md transition-all ${
                            task.completed ? "bg-green-500" : "bg-gray-800"
                        }`}
                    >
                        {editingId === task._id ? (
                            <input
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="flex-1 px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 text-white"
                            />
                        ) : (
                            <span
                                onClick={() => toggleComplete(task._id, task.completed)}
                                className={`flex-1 cursor-pointer text-white ${
                                    task.completed ? "line-through opacity-70" : ""
                                }`}
                            >
                                {task.item}
                            </span>
                        )}

                        <div className="flex space-x-2">
                            {editingId === task._id ? (
                                <button
                                    onClick={() => updateTask(task._id)}
                                    className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-all"
                                >
                                    Save
                                </button>
                            ) : (
                                <button
                                    onClick={() => startEdit(task._id, task.item)}
                                    className="px-3 py-1 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-all"
                                >
                                    Edit
                                </button>
                            )}
                            <button
                                onClick={() => deleteTask(task._id)}
                                className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-all"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
            )}
        </div>
    );
};

export default TaskList;
