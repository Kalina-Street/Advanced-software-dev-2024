import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function ViewProfile() {
    //const { id } = useParams(); // Get the employee ID from the URL
    //let { id } = useParams();
    const id = localStorage.getItem('employeeId');
    const [employee, setEmployee] = useState([]);
    const navigate = useNavigate();

    console.log("This is the id: ${id}");

    useEffect(() => {
        fetchEmployeeDetails();
    }, []);

    const fetchEmployeeDetails = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/employees/${id}`);
            console.log(response.data);
            setEmployee(response.data);
        } catch (error) {
            console.error("Error fetching employee details:", error);
        }
    };

    const deleteEmployee = async () => {
        try {
            await axios.delete(`http://localhost:8000/employees/${id}`);
            alert('Employee deleted successfully!');
            navigate('/searchstaff'); // Redirect back to the search staff page
        } catch (error) {
            console.error("Error deleting employee:", error);
            alert('Error deleting employee. Please try again.');
        }
    };

    /*if (!employee) {
        return <div>Loading...</div>;
    }*/

    return (
        <div>
            <h1>Employee Profile</h1>
            {employee.map(employeedata => (
                <div>
                <p><strong>ID:</strong> {employeedata.id}</p>
                <p><strong>First Name:</strong> {employeedata.firstname}</p>
                <p><strong>Last Name:</strong> {employeedata.lastname}</p>
                <p><strong>Organisation:</strong> {employeedata.organisation}</p>
                <p><strong>Admin:</strong> {employeedata.admin ? 'Yes' : 'No'}</p>
                </div>
            )) }
            <button onClick={deleteEmployee}>Delete Employee</button>
                    <button onClick={() => navigate('/AHome')}>
                        Go Back
                    </button>
        </div>
    );
}