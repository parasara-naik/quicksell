import React from 'react';
import priority0 from '../assets/icons_FEtask/No-priority.svg';
import priority1 from '../assets/icons_FEtask/Img - Low Priority.svg';
import priority2 from '../assets/icons_FEtask/Img - Medium Priority.svg';
import priority3 from '../assets/icons_FEtask/Img - High Priority.svg';
import priority4 from '../assets/icons_FEtask/SVG - Urgent Priority grey.svg';

const priorityIcons = {
    0: priority0,
    1: priority1,
    2: priority2,
    3: priority3,
    4: priority4,
};

const getInitials = (name) => {
    const [firstName, lastName] = name.split(' ');
    const firstInitial = firstName?.charAt(0) || '';
    const lastInitial = lastName?.charAt(0) || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
};

const getColorFromName = (name) => {
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    const color = '#' + ((hash >> 24) & 0xFF).toString(16).padStart(2, '0') +
        ((hash >> 16) & 0xFF).toString(16).padStart(2, '0') +
        ((hash >> 8) & 0xFF).toString(16).padStart(2, '0');
    return color;
};

const Card1 = ({ id, title, tag, priority, user }) => {
    const priorityIcon = priorityIcons[priority];
    const initials = getInitials(user?.name || 'Unassigned');
    const profileColor = getColorFromName(user?.name || 'Unassigned');

    return (
        <div className='card'>
            <div className='card-top'>
                <p>{id}</p>
                <div 
                    className="profile" 
                    style={{
                        position: 'relative',  
                        backgroundColor: profileColor,
                        width: '26px', 
                        height: '26px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: '14px',
                        overflow: 'hidden', 
                    }}
                >
                    {initials}
                    <div
                        className="status-dot"
                        style={{
                            position: 'absolute',
                            bottom: '0px',  
                            right: '0px',   
                            width: '10px',
                            height: '10px',
                            borderRadius: '50%',
                            backgroundColor: user?.available ? '#90EE90' : 'white', 
                        }}
                    />
                </div>               
            </div>
            <p>{title}</p>
            <div className='card-bottom'>
                <div className='priority-container'>
                    <img src={priorityIcon} alt={`Priority ${priority}`} className="priority-logo" />
                </div>
                <div>
                    <div className='circle'></div>
                    <p>{tag}</p>
                </div>
            </div>
        </div>
    );
};

export default Card1;
