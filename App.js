import React, { useState, useEffect } from "react";
import { Trash, CheckCircle } from "lucide-react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState("");

  // Load tasks from local storage
  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (savedTasks) setTasks(savedTasks);
  }, []);

  // Save tasks to local storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Add a new task
  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, { text: task, completed: false }]);
      setTask("");
    }
  };

  // Toggle task completion
  const toggleTask = (index) => {
    const newTasks = [...tasks];
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  // Delete a task
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto", padding: "20px", textAlign: "center" }}>
      <h2>Task Manager</h2>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          style={{ padding: "8px", marginRight: "5px", width: "60%" }}
        />
        <button onClick={addTask} style={{ padding: "8px", cursor: "pointer" }}>Add</button>
      </div>
      <ul style={{ listStyle: "none", padding: "0" }}>
        {tasks.map((t, index) => (
          <li key={index} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px", borderBottom: "1px solid #ddd" }}>
            <span style={{ textDecoration: t.completed ? "line-through" : "none" }}>{t.text}</span>
            <div>
              <CheckCircle style={{ cursor: "pointer", marginRight: "10px", color: "green" }} onClick={() => toggleTask(index)} />
              <Trash style={{ cursor: "pointer", color: "red" }} onClick={() => deleteTask(index)} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
