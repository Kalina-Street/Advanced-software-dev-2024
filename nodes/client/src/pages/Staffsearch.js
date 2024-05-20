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
    const navigate = useNavigate();

    //Fetches employees using useEffect
    useEffect(() => {
        fetchEmployees();
    }, []);

    const fetchEmployees = async () => {
        try {
            const response = await axios.get('/api/employees');
            //compares the first name and lastname using localeCompare so admin can search using either
            const sortedEmployees = response.data.sort((a, b) => a.name.localeCompare(b.name));
            setEmployees(sortedEmployees);
        } catch (error) {
            console.error("Error fetching employees:", error);
        }
    };

    const filteredEmployees = employees.filter(employee =>
        employee.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        //display 'none' prevents the page from appearing at the start after login
        <div style={{ display: "none" }} id="searchstaff" className="tabchangerhide">
            <h1>Search Staff</h1>
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ display: "block" }}
            />
            <div style={{ display: "block" }}>

                {filteredEmployees.map(employee => (
                    <div
                        key={employee.id}
                        //On click opens up the staff member profile
                        onClick={() => navigate('/viewprofile/${employee.id}')}
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
                        {employee.name}
                    </div>
                ))}
            </div>
        </div>
    );
}