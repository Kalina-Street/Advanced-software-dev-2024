//Admin side - Search Staff Memeber Page//
//Feature: Page for searching for staff members- Kamil//
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

//Creates the function for searching staff
export default function SearchStaff() {
    //Creats constant variables
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEmployees, setFilteredEmployees] = useState([]);
    const navigate = useNavigate();

    //Fetches employees using useEffect
    useEffect(() => {
        fetchEmployees();
    }, []);

    /*const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8000/employees');
            const lowerSearchName = searchTerm.toLowerCase();
    
            const filteredEmployees = response.data.filter(employee => {
                const fullName = `${employee.firstname} ${employee.lastname}`.toLowerCase();
                return fullName.includes(lowerSearchName);
            });
    
            return filteredEmployees; // Return the filtered list
        } catch (error) {
            console.error('Error fetching employees:', error);
            return []; // Return an empty array in case of an error
        }
    };*/

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('http://localhost:8000/employees');
            const lowerSearchName = searchTerm.toLowerCase();

            const filteredResults = response.data.filter(employee => {
                const fullName = `${employee.firstname} ${employee.lastname}`.toLowerCase();
                return fullName.includes(lowerSearchName);
            });

            setFilteredEmployees(filteredResults);
        } catch (error) {
            console.error('Error fetching employees:', error);
        }
    };

    function setId(id) {
        localStorage.setItem("employeeId", id);
        navigate('/viewprofile');
    };
    
    // Example usage:

    return (
        //display 'none' prevents the page from appearing at the start after login
        <div style={{ display: "none" }} id="searchstaff" className="tabchangerhide">
            <h1>Search Staff</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => { setSearchTerm(e.target.value); fetchEmployees();}}
                style={{ display: "block" }}
            />
            <div style={{ display: "block" }}>

            <div>
            {/* Render the filtered employees */}
            {filteredEmployees.map(employee => (
                <div
                    key={employee.id}
                    onClick={() => setId(employee.id)} // Use backticks for template literals
                    style={{
                        width: 'calc(20% - 10px)',
                        padding: '20px',
                        border: '1px solid #ccc',
                        borderRadius: '8px',
                        textAlign: 'center',
                        cursor: 'pointer',
                        boxSizing: 'border-box'
                    }}
                >
                    {employee.firstname}
                </div>
            ))}
        </div>
            </div>
        </div>
    );
}