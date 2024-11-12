// src/components/KanbanBoard.js

import React, { useState, useRef, useEffect } from 'react';
import KanbanCard from './KanbanCard';
import displayIcon from '../assets/Display.svg';

// Icons for Priority and Status
import urgentIcon from '../assets/SVG - Urgent Priority colour.svg';
import highIcon from '../assets/Img - High Priority.svg';
import mediumIcon from '../assets/Img - Medium Priority.svg';
import lowIcon from '../assets/Img - Low Priority.svg';
import noPriorityIcon from '../assets/No-priority.svg';
import backlogIcon from '../assets/Backlog.svg';
import todoIcon from '../assets/To-do.svg';
import inProgressIcon from '../assets/in-progress.svg';
import doneIcon from '../assets/Done.svg';
import cancelledIcon from '../assets/Cancelled.svg';
import addIcon from '../assets/add.svg';
import menuIcon from '../assets/3 dot menu.svg';

const priorityIcons = {
    'No priority': noPriorityIcon,
    'Urgent': urgentIcon,
    'High': highIcon,
    'Medium': mediumIcon,
    'Low': lowIcon
};

const statusIcons = {
    'Backlog': backlogIcon,
    'Todo': todoIcon,
    'In Progress': inProgressIcon,
    'Done': doneIcon,
    'Cancelled': cancelledIcon
};

const usersData = {
    'usr-1': 'Anoop Sharma',
    'usr-2': 'Yogesh',
    'usr-3': 'Shankar Kumar',
    'usr-4': 'Ramesh',
    'usr-5': 'Suresh'
};

function KanbanBoard({ tasks }) {
    const savedGrouping = localStorage.getItem('grouping') || 'Priority';
    const [grouping, setGrouping] = useState(savedGrouping);
    const [ordering, setOrdering] = useState('Priority');
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef();

    useEffect(() => {
        localStorage.setItem('grouping', grouping);
    }, [grouping]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [dropdownRef]);

    const groupTasks = () => {
        switch (grouping) {
            case 'Status':
                return {
                    'Backlog': tasks.filter(task => task.status === 'Backlog'),
                    'Todo': tasks.filter(task => task.status === 'Todo'),
                    'In Progress': tasks.filter(task => task.status === 'In progress'),
                    'Done': tasks.filter(task => task.status === 'Done'),
                    'Cancelled': tasks.filter(task => task.status === 'Cancelled')
                };
            case 'User':
                return Object.keys(usersData).reduce((acc, userId) => {
                    const userName = usersData[userId];
                    acc[userName] = tasks.filter(task => task.userId === userId);
                    return acc;
                }, {});
            case 'Priority':
            default:
                return {
                    'No priority': tasks.filter(task => task.priority === 0),
                    'Urgent': tasks.filter(task => task.priority === 4),
                    'High': tasks.filter(task => task.priority === 3),
                    'Medium': tasks.filter(task => task.priority === 2),
                    'Low': tasks.filter(task => task.priority === 1)
                };
        }
    };

    const sortTasks = (tasksArray) => {
        return tasksArray.sort((a, b) => {
            if (ordering === 'Priority') {
                return b.priority - a.priority;
            } else if (ordering === 'Title') {
                return a.title.localeCompare(b.title);
            }
            return 0;
        });
    };

    const groupedTasks = groupTasks();

    return (
        <div style={{ backgroundColor: '#f0f1f5', padding: '0', minHeight: '100vh' }}>
            <div style={{ 
                display: 'flex', 
                alignItems: 'center', 
                marginBottom: '20px', 
                padding: '15px 0', 
                backgroundColor: '#f8f9fb', 
                width: '100%', 
                borderBottom: '1px solid #e0e0e0',
                justifyContent: 'space-between',
                paddingLeft: '30px',
                paddingRight: '30px'
            }}>
                <button 
                    style={{ padding: '8px 12px', borderRadius: '4px', border: '1px solid #ddd', display: 'flex', alignItems: 'center', backgroundColor: 'transparent' }}
                    onClick={() => setShowDropdown(!showDropdown)}
                >
                    <img src={displayIcon} alt="Display" style={{ width: '20px', marginRight: '8px' }} />
                    Display
                </button>

                {showDropdown && (
                    <div ref={dropdownRef} style={{ position: 'absolute', top: '60px', left: '30px', border: '1px solid #ddd', backgroundColor: '#fff', padding: '10px', borderRadius: '8px', boxShadow: '0px 2px 5px rgba(0,0,0,0.1)', zIndex: 1 }}>
                        <label style={{ display: 'block', marginBottom: '10px' }}>
                            Grouping:
                            <select value={grouping} onChange={(e) => setGrouping(e.target.value)} style={{ marginLeft: '8px', padding: '4px' }}>
                                <option value="Status">Status</option>
                                <option value="User">User</option>
                                <option value="Priority">Priority</option>
                            </select>
                        </label>
                        <label style={{ display: 'block' }}>
                            Ordering:
                            <select value={ordering} onChange={(e) => setOrdering(e.target.value)} style={{ marginLeft: '8px', padding: '4px' }}>
                                <option value="Priority">Priority</option>
                                <option value="Title">Title</option>
                            </select>
                        </label>
                    </div>
                )}
            </div>

            <div style={{ display: 'flex', gap: '30px', overflowX: 'auto', alignItems: 'flex-start', paddingBottom: '10px', paddingLeft: '30px', paddingRight: '30px' }}>
                {Object.keys(groupedTasks).map((group) => (
                    <div key={group} style={{ minWidth: '260px', maxWidth: '300px', marginRight: '15px' }}>
                        <div style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            fontWeight: 'bold', 
                            marginBottom: '15px', 
                            padding: '0', 
                            width: '100%', 
                            justifyContent: 'space-between'
                        }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexGrow: 1 }}>
                                {grouping === 'Priority' && priorityIcons[group] && <img src={priorityIcons[group]} alt={`${group} icon`} style={{ width: '20px', height: '20px' }} />}
                                {grouping === 'Status' && statusIcons[group] && <img src={statusIcons[group]} alt={`${group} icon`} style={{ width: '20px', height: '20px' }} />}
                                <span style={{ textAlign: 'left' }}>{`${group} ${groupedTasks[group].length}`}</span>
                            </div>
                            <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
                                <img src={addIcon} alt="Add" style={{ width: '20px', cursor: 'pointer' }} />
                                <img src={menuIcon} alt="Menu" style={{ width: '20px', cursor: 'pointer' }} />
                            </div>
                        </div>
                        
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                            {sortTasks(groupedTasks[group]).map(task => (
                                <KanbanCard key={task.id} task={task} grouping={grouping} style={{ padding: '10px', borderRadius: '6px' }} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default KanbanBoard;
