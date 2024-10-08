import React, { useEffect, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import Header from './Header';
import { fetchTickets } from './API';
import './app.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [users, setUsers] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchTickets();
        setTickets(data.tickets);
        setUsers(data.users);
        console.log(tickets);
        console.log(users);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <Header setGroupBy={setGroupBy} setSortBy={setSortBy} />
      <KanbanBoard tickets={tickets} users={users} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
