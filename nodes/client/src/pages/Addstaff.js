import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function AddStaff() {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [password, setPassword] = useState('');
    const [organisation, setOrganisation] = useState('');
    const [admin, setadmin] = useState(false);
    const navigate = useNavigate();

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
            id,
            firstName,
            lastName,
            password: hashedPassword,
            organisation,
            admin,
        };

        try {
            await axios.post('/api/employees', newStaff);
            alert('New staff member added successfully!');
            navigate('/staff-list');  // Redirect to staff list page after successful submission
        } catch (error) {
            console.error('Error adding new staff member:', error);
            alert('Error adding new staff member. Please try again.');
        }
    };

    return (
        <div style={{ display: "none" }} id="addstaff" class="tabchangerhide">
            <h1>Add New Staff Member</h1>
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' }}>
                <label>
                    ID:
                    <input
                        type="text"
                        value={id}
                        onChange={(e) => setId(e.target.value)}
                        required
                    />
                </label>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Password:
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Organisation:
                    <input
                        type="text"
                        value={organisation}
                        onChange={(e) => setOrganisation(e.target.value)}
                        required
                    />
                </label>
                <label>
                    Admin:
                    <input
                        type="checkbox"
                        checked={admin}
                        onChange={(e) => setadmin(e.target.checked)}
                    />
                </label>
                <button type="submit">Add Staff Member</button>
            </form>
        </div>
    );
}
