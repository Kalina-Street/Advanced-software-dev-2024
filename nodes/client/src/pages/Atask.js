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
    const [newTaskDescription, setNewTaskDescription] = useState("");
    const [newTaskCategory, setNewTaskCategory] = useState("routine");
    const [newTaskDuration, setNewTaskDuration] = useState(0);
    const [organisation, setOrganisation] = useState("");

    const navigate = useNavigate();

    //Fetches completed and uncompleted tasks using useEffect
    useEffect(() => {
        fetchCompletedTasks();
        fetchAvailableTasks();
    }, []);

    const fetchCompletedTasks = async () => {
        try {
            const response = await axios.get("http://localhost:8000/tasks/completed");
            setCompletedTasks(response.data);
        } catch (error) {
            console.error("Error fetching completed tasks:", error);
        }
    };

    const fetchAvailableTasks = async () => {
        try {
            const response = await axios.get('http://localhost:8000/tasks');
            setAvailableTasks(response.data);
        } catch (error) {
            console.error("Error fetching available tasks:", error);
        }
    };

    const deleteTask = async (taskId) => {
        try {
            await axios.delete(`http://localhost:8000/tasks/${taskId}`);
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
            type: newTaskCategory,
            duration: newTaskDuration,
            createdDate: new Date().toISOString(),
            organisation,
            status: 'pending'
        };

        //displays fillers when starting
        try {
            await axios.post('http://localhost:8000/tasks', newTask);
            setNewTaskTitle("");
            setNewTaskDescription("");
            setNewTaskCategory("routine");
            setNewTaskDuration(0);
            setOrganisation("");
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
                        {task.title} - {task.organisation}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h2>Available Tasks</h2>
            <ul>
                {availableTasks.map(task => (
                    <li key={task.id}>
                        {task.title} - {task.organisation} - {task.type} - {Math.round(task.duration/1000/60/60*100)/100} hours
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
                <input
                    type="text"
                    placeholder="Task Description"
                    value={newTaskDescription}
                    onChange={(e) => setNewTaskDescription(e.target.value)}
                />
                <select
                    value={newTaskCategory}
                    onChange={(e) => setNewTaskCategory(e.target.value)}
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
                    placeholder="Organisation"
                    value={organisation}
                    onChange={(e) => setOrganisation(e.target.value)}
                />
                <button onClick={assignTask}>Assign Task</button>
            </div>
        </div>
    );
}
