import React, { useState } from 'react';


function ToDoList() {
    const [tasks, setTasks] = useState([{ text: "Task-1 to do",isEditing: false},{text:"Task-2 to do", isEditing: false }]);
    const [newTask, setNewTask] = useState("");

    function handleInputChange(event) {
        setNewTask(event.target.value);
    }

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(t => [...t, { text: newTask, isEditing: false }]);
            setNewTask("");
        }
    }

    function deleteTask(index) {
        const updatedTasks = tasks.filter((_, i) => i !== index);
        setTasks(updatedTasks);
    }

    function moveTaskUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] = [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function moveTaskDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] = [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        }
    }

    function toggleEdit(index) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, isEditing: !task.isEditing } : task
        );
        setTasks(updatedTasks);
    }

    function updateTaskText(index, text) {
        const updatedTasks = tasks.map((task, i) =>
            i === index ? { ...task, text: text } : task
        );
        setTasks(updatedTasks);
    }

    return (
        <div className="to-do-list">
            <h1>To-Do List</h1>

            <div className="input-container">
                <input
                    type="text"
                    placeholder="Enter a task"
                    value={newTask}
                    onChange={handleInputChange}
                />
                <button className="add-button" onClick={addTask}>
                    Add
                </button>
            </div>

            <ol className="task-list">
                {tasks.map((task, index) =>
                    <li key={index} className={`task-item ${task.isEditing ? 'editing' : ''}`}>
                        {task.isEditing ? (
                            <input
                                type="text"
                                value={task.text}
                                onChange={(e) => updateTaskText(index, e.target.value)}
                                className="edit-input"
                            />
                        ) : (
                            <span className="text">{task.text}</span>
                        )}
                        <div className="button-group">
                            <button className="edit-button" onClick={() => toggleEdit(index)}>
                                {task.isEditing ? "Save" : "Edit"}
                            </button>
                            <button className="delete-button" onClick={() => deleteTask(index)}>
                                Delete
                            </button>
                            <button className="move-button" onClick={() => moveTaskUp(index)}>
                                ⬆️
                            </button>
                            <button className="move-button" onClick={() => moveTaskDown(index)}>
                                ⬇️
                            </button>
                        </div>
                    </li>
                )}
            </ol>
        </div>
    );
}

export default ToDoList;
