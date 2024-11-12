// src/components/KanbanCard.js

import React from 'react';
import avatar1 from '../assets/avatar1.jpg';
import avatar2 from '../assets/avatar2.jpg';
import avatar3 from '../assets/avatar3.jpg';
import avatar4 from '../assets/avatar4.jpg';
import noPriorityIcon from '../assets/No-priority.svg';
import todoIcon from '../assets/To-do.svg';
import inProgressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import cancelledIcon from '../assets/Cancelled.svg';
import backlogIcon from '../assets/Backlog.svg';

const statusIcons = {
    'Todo': todoIcon,
    'In progress': inProgressIcon,
    'Done': doneIcon,
    'Cancelled': cancelledIcon,
    'Backlog': backlogIcon
};

function KanbanCard({ task, grouping }) {
    const priorityIcons = {
        4: require('../assets/SVG - Urgent Priority colour.svg').default,  // Urgent priority
        3: require('../assets/Img - High Priority.svg').default,          // High priority
        2: require('../assets/Img - Medium Priority.svg').default,        // Medium priority
        1: require('../assets/Img - Low Priority.svg').default,           // Low priority
        0: noPriorityIcon                                                // No priority
    };

    const avatarImages = [avatar1, avatar2, avatar3, avatar4];
    const userPhotoPath = avatarImages[parseInt(task.userId.slice(-1), 10) % avatarImages.length];

    return (
        <div style={{ 
            border: '1px solid #ddd', 
            padding: '15px', 
            backgroundColor: '#fff', 
            borderRadius: '8px', 
            boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.1)', 
            display: 'flex', 
            flexDirection: 'column',
            gap: '10px',
            width: '100%',
            position: 'relative'
        }}>
            {/* User Photo */}
            <img 
                src={userPhotoPath} 
                alt="User" 
                style={{ 
                    width: '30px', 
                    height: '30px', 
                    borderRadius: '50%', 
                    position: 'absolute', 
                    top: '10px', 
                    right: '10px', 
                    border: '2px solid #fff'
                }} 
            />

            <div style={{ fontSize: '12px', color: '#666', fontWeight: '500' }}>{task.id}</div>

            {/* Status and Title */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Status Icon (only in Priority and User groupings) */}
                {(grouping === 'Priority' || grouping === 'User') && (
                    <img src={statusIcons[task.status]} alt={task.status} style={{ width: '20px', height: '20px' }} />
                )}

                <h3 style={{ fontSize: '16px', color: '#333', fontWeight: '500', margin: '0' }}>{task.title}</h3>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {/* Priority Icon or Solid Grey Circle */}
                {grouping === 'Priority' ? (
                    <span style={{
                        display: 'inline-flex',
                        width: '8px',    // Small size
                        height: '8px',   // Small size
                        borderRadius: '50%',
                        backgroundColor: '#a9a9a9'  // Solid grey color
                    }}></span>
                ) : task.priority === 0 ? (
                    <img src={noPriorityIcon} alt="No priority" style={{ width: '20px', height: '20px' }} />
                ) : (
                    <img src={priorityIcons[task.priority]} alt="Priority icon" style={{ width: '24px', height: '24px' }} />
                )}

                {/* Solid Grey Circle for Status and User sections */}
                {(grouping === 'Status' || grouping === 'User') && (
                    <span style={{
                        display: 'inline-flex',
                        width: '8px',    // Small size
                        height: '8px',   // Small size
                        borderRadius: '50%',
                        backgroundColor: '#a9a9a9'  // Solid grey color
                    }}></span>
                )}

                <span style={{
                    fontSize: '12px',
                    color: '#666',
                    padding: '4px 8px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '12px',
                    fontWeight: '500'
                }}>{task.tag[0]}</span>
            </div>
        </div>
    );
}

export default KanbanCard;
