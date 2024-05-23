
/*Adding Staff Page*/
/*Feature for adding/creating new staff members - Kamil*/

import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

//Creates function for adding new staff memebers
export default function AddStaff() {
    //all peramters for staff member

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [admin, setadmin] = useState(false);
    const navigate = useNavigate();

    //function for hashing password when created

    const hashPassword = (password) => {
        let hash = 0;
        for (let i = 0; i < password.length; i++) {
            const atbl = password.charCodeAt(i);
            hash += atbl * Math.floor(atbl / 5) * (i + 1);
        }
        return hash;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const hashedPassword = hashPassword(password);

        const newStaff = {
            firstName,
            lastName,
            password: hashedPassword,
            organisation,
            admin,
        };

        try {
            await axios.post('http://localhost:8000/employees', newStaff);
            alert('New staff member added successfully!');
            navigate('/staff-list');  // Redirect to staff list page after successful submission
        } catch (error) {
            console.error('Error adding new staff member:', error);
            alert('Error adding new staff member. Please try again.');
        }
    };

    return (
        //display 'none' prevents the page from appearing at the start after login

        <div style={{ display: "none" }} id="addstaff" class="tabchangerhide">
            <h1>Add New Staff Member</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
                <label>
                    First Name:
                    <input
                        type="text"
                        name="firstName"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        name="lastName"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Organisation:
                    <input
                        type="text"
                        name="orgranisation"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Admin:
                    <input
                        type="checkbox"
                        name="admin"
                        checked={admin}
                        onChange={(e) => setadmin(e.target.checked)}
                    />
                </label>
                <button type="submit">Add Staff Member</button>
            </form>
        </div>
    );
}

