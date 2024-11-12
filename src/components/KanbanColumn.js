// src/components/KanbanColumn.js

import React from 'react';
import KanbanCard from './KanbanCard';

function KanbanColumn({ title, tasks = [] }) {
    return (
        <div style={{ 
            width: '300px', 
            backgroundColor: '#f7f7f7', 
            padding: '15px', 
            borderRadius: '8px', 
            boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.1)', 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '15px' 
        }}>
            <h2 style={{ 
                fontSize: '18px', 
                textAlign: 'center', 
                marginBottom: '15px', 
                color: '#333', 
                fontWeight: 'bold' 
            }}>
                {title} {tasks.length}
            </h2>
            {tasks.map(task => (
                <KanbanCard key={task.id} task={task} />
