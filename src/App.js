// src/App.js

import React, { useState, useEffect } from 'react';
import KanbanBoard from './components/KanbanBoard';

const data = {
    tickets: [
        {"id":"CAM-1","title":"Update User Profile Page UI","tag":["Feature request"],"userId":"usr-1","status":"Todo","priority":4},
        {"id":"CAM-2","title":"Add Multi-Language Support - Enable multi-language support within the application.","tag":["Feature Request"],"userId":"usr-2","status":"In progress","priority":3},
        {"id":"CAM-3","title":"Optimize Database Queries for Performance","tag":["Feature Request"],"userId":"usr-2","status":"In progress","priority":1},
        {"id":"CAM-4","title":"Implement Email Notification System","tag":["Feature Request"],"userId":"usr-1","status":"In progress","priority":3},
        {"id":"CAM-5","title":"Enhance Search Functionality","tag":["Feature Request"],"userId":"usr-5","status":"In progress","priority":0},
        {"id":"CAM-6","title":"Third-Party Payment Gateway","tag":["Feature Request"],"userId":"usr-2","status":"Todo","priority":1},
        {"id":"CAM-7","title":"Create Onboarding Tutorial for New Users","tag":["Feature Request"],"userId":"usr-1","status":"Backlog","priority":2},
        {"id":"CAM-8","title":"Implement Role-Based Access Control (RBAC)","tag":["Feature Request"],"userId":"usr-3","status":"In progress","priority":3},
        {"id":"CAM-9","title":"Upgrade Server Infrastructure","tag":["Feature Request"],"userId":"usr-5","status":"Todo","priority":2},
        {"id":"CAM-10","title":"Conduct Security Vulnerability Assessment","tag":["Feature Request"],"userId":"usr-4","status":"Backlog","priority":1}
    ],
    users: [
        {"id":"usr-1","name":"Anoop Sharma","available":false},
        {"id":"usr-2","name":"Yogesh","available":true},
        {"id":"usr-3","name":"Shankar Kumar","available":true},
        {"id":"usr-4","name":"Ramesh","available":true},
        {"id":"usr-5","name":"Suresh","available":true}
    ]
};

function App() {
    const [tasks, setTasks] = useState([]);

    useEffect(() => {
        // Mapping tickets with user names
        const tasksWithUsers = data.tickets.map(ticket => {
            const user = data.users.find(u => u.id === ticket.userId);
            return {
                ...ticket,
                assignedTo: user ? user.name : 'Unknown'
            };
        });
        setTasks(tasksWithUsers);
    }, []);

    return (
        <div className="App">
            {/* Removed the "Kanban Board" heading */}
            <KanbanBoard tasks={tasks} />
        </div>
    );
}

export default App;
