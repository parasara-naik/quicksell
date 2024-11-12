const BASE_URL = 'https://api.quicksell.co/v1/internal/frontend-assignment';

export const fetchTicketsAndUsers = async () => {
    try {
        const response = await fetch(BASE_URL);
        const data = await response.json();
        return { tickets: data.tickets, users: data.users };
    } catch (error) {
        console.error('Error fetching data:', error);
        throw error;
    }
};
