/*Admin Task Page*/
/*Feature for Admins to create/assign tasks to staff members - Kamil */
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Tasktab from "../js/Tasktab";
import Tabs from "../js/Tabs";

//Creates the function Add task
export default function Atask() {
    const [completedTasks, setCompletedTasks] = useState([]);
    const [availableTasks, setAvailableTasks] = useState([]);
    const [newTaskTitle, setNewTaskTitle] = useState("");
    const [newTaskType, setNewTaskType] = useState("routine");
    const [newTaskDuration, setNewTaskDuration] = useState(0);
    const [assignee, setAssignee] = useState("");

    const navigate = useNavigate();

    //Fetches completed and uncompleted tasks using useEffect
    useEffect(() => {
        fetchCompletedTasks();
        fetchAvailableTasks();
    }, []);

    const fetchCompletedTasks = async () => {
        try {
            const response = await axios.get('/api/tasks/completed');
            setCompletedTasks(response.data);
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
        }
    };

    const fetchAvailableTasks = async () => {
        try {
            const response = await axios.get('/api/tasks');
            setAvailableTasks(response.data);
        } catch (error) {
            console.error("Error fetching available tasks:", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`/api/tasks/${taskId}`);
            fetchCompletedTasks();
            fetchAvailableTasks();
        } catch (error) {
            console.error("Error deleting task:", error);
        }
    };

    //paratmeters for assigning a new task
    const assignTask = async () => {
        const newTask = {
            title: newTaskTitle,
            type: newTaskType,
            duration: newTaskDuration,
            createdDate: new Date().toISOString(),
            assignee,
            status: 'pending'
        };

        //displays fillers when starting
        try {
            await axios.post('/api/tasks', newTask);
            setNewTaskTitle("");
            setNewTaskType("routine");
            setNewTaskDuration(0);
            setAssignee("");
            fetchAvailableTasks();
        } catch (error) {
            console.error("Error assigning task:", error);
        }
    };

    return (
        //display 'none' prevents the page from appearing at the start after login
        <div style={{ display: "none" }} id="task" className="tabchangerhide">
            <h1>Admin Task Page</h1>

            <h2>Completed Tasks</h2>
            <ul>
                {completedTasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.assignee}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Available Tasks</h2>
            <ul>
                {availableTasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.assignee} - {task.type} - {task.duration} hours
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                        <button onClick={() => navigate(`/assign/${task.id}`)}>Assign to User</button>
                    </li>
                ))}
            </ul>

            <h2>Assign New Task</h2>
            <div>
                <input
                    type="text"
                    placeholder="Task title"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                />
                <select
                    value={newTaskType}
                    onChange={(e) => setNewTaskType(e.target.value)}
                >
                    <option value="urgent">Urgent</option>
                    <option value="routine">Routine</option>
                    <option value="other">Other</option>
                </select>
                <input
                    type="number"
                    placeholder="Duration (hours)"
                    value={newTaskDuration}
                    onChange={(e) => setNewTaskDuration(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Assignee"
                    value={assignee}
                    onChange={(e) => setAssignee(e.target.value)}
                />
                <button onClick={assignTask}>Assign Task</button>
            </div>
        </div>
    );
}
