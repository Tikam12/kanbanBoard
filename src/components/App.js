import React, { useEffect, useState } from 'react';
import KanbanBoard from './KanbanBoard';
import Header from './Header';
import { fetchTickets } from './API';
import './app.css';

const App = () => {
  const [tickets, setTickets] = useState([]);
  const [groupBy, setGroupBy] = useState('status');
  const [sortBy, setSortBy] = useState('priority');

  useEffect(() => {
    fetchTickets().then(data => {
      setTickets(data);
    });
  }, []);

  return (
    <div>
      <Header setGroupBy={setGroupBy} setSortBy={setSortBy} />
      <KanbanBoard tickets={tickets} groupBy={groupBy} sortBy={sortBy} />
    </div>
  );
};

export default App;
