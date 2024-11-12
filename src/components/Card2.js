import React from 'react'
import backlog from '../assets/icons_FEtask/Backlog.svg';
import todo from '../assets/icons_FEtask/To-do.svg';
import inProgress from '../assets/icons_FEtask/in-progress.svg';
import done from '../assets/icons_FEtask/Done.svg';
import cancelled from '../assets/icons_FEtask/Cancelled.svg';

const statusIcons = {
    Backlog: backlog,
    Todo: todo,
    'In progress': inProgress,
    Done: done,
    Cancelled: cancelled,
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

const Card2 = ({ id, title, tag, status, user }) => {

    const statusIcon = statusIcons[status];
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
            <div className='card-middle'>
                <img src={statusIcon} alt={`Status ${status}`} className="status-logo" />
                <p>{title}</p>
            </div>
            <div className='card-bottom'>
                <div>
                    <div className='circle'></div>
                    <p>{tag}</p>
                </div>
            </div>
        </div>
    )
}

export default Card2
