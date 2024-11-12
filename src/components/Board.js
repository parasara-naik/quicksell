import React, { useEffect, useState } from 'react';
import backlog from '../assets/icons_FEtask/Backlog.svg';
import todo from '../assets/icons_FEtask/To-do.svg';
import inProgress from '../assets/icons_FEtask/in-progress.svg';
import done from '../assets/icons_FEtask/Done.svg';
import cancelled from '../assets/icons_FEtask/Cancelled.svg';
import add from '../assets/icons_FEtask/add.svg';
import threedot from '../assets/icons_FEtask/3 dot menu.svg';
import displayLogo from '../assets/icons_FEtask/Display.svg';
import dropdownIcon from '../assets/icons_FEtask/down.svg';
import priority0 from '../assets/icons_FEtask/No-priority.svg'
import priority1 from '../assets/icons_FEtask/Img - Low Priority.svg'
import priority2 from '../assets/icons_FEtask/Img - Medium Priority.svg'
import priority3 from '../assets/icons_FEtask/Img - High Priority.svg'
import priority4 from '../assets/icons_FEtask/SVG - Urgent Priority colour.svg'
import Card1 from './Card1';
import Card2 from './Card2';
import { fetchTicketsAndUsers } from '../api/Api'

const statuses = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancelled'];
const statusIcons = [backlog, todo, inProgress, done, cancelled];

const priorityIcons = {
    0: priority0,
    1: priority1,
    2: priority2,
    3: priority3,
    4: priority4,
};

const priorityNames = {
    0: 'No Priority',
    1: 'Low',
    2: 'Medium',
    3: 'High',
    4: 'Urgent',
};

const getInitials = (name) => {
    const [firstName, lastName] = name.split(' ');
    const firstInitial = firstName?.charAt(0) || '';
    const lastInitial = lastName?.charAt(0) || '';
    return `${firstInitial}${lastInitial}`.toUpperCase();
};

const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};


const Board = () => {

    const [tickets, setTickets] = useState(() => {
        const savedTickets = localStorage.getItem('tickets');
        return savedTickets ? JSON.parse(savedTickets) : [];
    });

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const [grouping, setGrouping] = useState(() => {
        const savedGrouping = localStorage.getItem('grouping');
        return savedGrouping ? savedGrouping : 'Status';
    });

    const [ordering, setOrdering] = useState(() => {
        const savedOrdering = localStorage.getItem('ordering');
        return savedOrdering ? savedOrdering : 'Priority';
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchTicketsAndUsers();
                setTickets(data.tickets);
                setUsers(data.users);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        if (!tickets.length || !users.length) {
            fetchData();
        }
    }, [tickets, users]);

    useEffect(() => {
        localStorage.setItem('tickets', JSON.stringify(tickets));
    }, [tickets]);

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    useEffect(() => {
        localStorage.setItem('grouping', grouping);
    }, [grouping]);

    useEffect(() => {
        localStorage.setItem('ordering', ordering);
    }, [ordering]);

    const getGroupedTickets = (groupBy) => {
        const grouped = {};

        tickets.forEach(ticket => {
            let key;
            if (groupBy === 'Status') {
                key = ticket.status;
            } else if (groupBy === 'User') {
                key = users.find(user => user.id === ticket.userId)?.name || 'Unassigned';
            } else if (groupBy === 'Priority') {
                key = ticket.priority || 'No Priority';
            }

            if (!grouped[key]) {
                grouped[key] = [];
            }
            grouped[key].push(ticket);
        });

        return grouped;
    };

    const sortTickets = (tickets) => {
        if (ordering === 'Priority') {
            return [...tickets].sort((a, b) => b.priority - a.priority);
        } else if (ordering === 'Title') {
            return [...tickets].sort((a, b) => a.title.localeCompare(b.title));
        }
        return tickets;
    };

    const customColumn = (groupBy) => {

        if (groupBy === 'Status') {
            return statuses.map((status, index) => {
                const ticketsForStatus = getGroupedTickets('Status')[status] || [];
                const sortedTickets = sortTickets(ticketsForStatus);
                return (
                    <div key={status} className='column'>
                        <div className='header'>
                            <div className='header-left'>
                                <img src={statusIcons[index]} alt={status} className="navbar-logo" />
                                <p>{status}</p>
                                <p className='count'>{ticketsForStatus.length}</p>
                            </div>
                            <div className='header-right'>
                                <img src={add} alt="Add" className="navbar-logo" />
                                <img src={threedot} alt="Options" className="navbar-logo" />
                            </div>
                        </div>
                        {sortedTickets.map(ticket => (
                            <Card1
                                key={ticket.id}
                                id={ticket.id}
                                title={ticket.title}
                                tag={ticket.tag[0]}
                                priority={ticket.priority}
                                user={users.find(user => user.id === ticket.userId)}
                            />
                        ))}
                    </div>
                );
            });
        } else {
            const groupedTickets = getGroupedTickets(groupBy);
            return Object.entries(groupedTickets).map(([key, tickets]) => {
                const sortedTickets = sortTickets(tickets);
                const priority = tickets[0]?.priority;
                const priorityIcon = priorityIcons[priority];
                const priorityName = priorityNames[priority];
                const initials = getInitials(key); 
                const backgroundColor = getRandomColor();

                return (
                    <div key={key} className='column'>
                        <div className='header'>
                            <div className='header-left'>
                                {
                                    groupBy === "User" ? (
                                        <>
                                            <div
                                                style={{
                                                    backgroundColor: backgroundColor,
                                                    color: '#fff',
                                                    fontWeight: 'bold',
                                                    display: 'flex',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                    borderRadius: '50%',
                                                    width: '26px',
                                                    height: '26px',
                                                    fontSize: '14px',
                                                }}
                                            >
                                                {initials}
                                            </div>
                                            <p>{key}</p>
                                            <p className='count'>{tickets.length}</p>
                                        </>
                                    ) : (
                                        <>
                                            <img src={priorityIcon} alt={`Priority ${tickets.priority}`} className="navbar-logo" />
                                            <p>{priorityName}</p>
                                            <p className='count'>{tickets.length}</p>
                                        </>
                                    )
                                }
                            </div>
                            <div className='header-right'>
                                <img src={add} alt="Add" className="navbar-logo" />
                                <img src={threedot} alt="Options" className="navbar-logo" />
                            </div>
                        </div>
                        {sortedTickets.map(ticket => (
                            <Card2
                                key={ticket.id}
                                id={ticket.id}
                                title={ticket.title}
                                tag={ticket.tag[0]}
                                status={ticket.status}
                                user={users.find(user => user.id === ticket.userId)}
                            />
                        ))}
                    </div>
                );
            });
        }
    };

    return (
        <>
            <div className="nav-container">
                <details className="display">
                    <summary className="display-summary">
                        <img src={displayLogo} alt="Display Logo" className="navbar-logo" />
                        <p>Display</p>
                        <img src={dropdownIcon} alt="Dropdown Icon" className="dropdown-icon" />
                    </summary>
                    <div className="dropdown-menu">
                        <ul>
                            <li>
                                <p>Grouping</p>
                                <select
                                    className='status'
                                    value={grouping}
                                    onChange={(e) => setGrouping(e.target.value)}
                                >
                                    <option value="Status">Status</option>
                                    <option value="User">User</option>
                                    <option value="Priority">Priority</option>
                                </select>
                            </li>
                            <li>
                                <p>Ordering</p>
                                <select
                                    className='status'
                                    value={ordering}
                                    onChange={(e) => setOrdering(e.target.value)}
                                >
                                    <option value="Priority">Priority</option>
                                    <option value="Title">Title</option>
                                </select>
                            </li>
                        </ul>
                    </div>
                </details>
            </div>
            <div className='board-container'>
                {customColumn(grouping)}
            </div>
        </>
    );
};

export default Board;
