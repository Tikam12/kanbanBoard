import React from 'react';
import KanbanCard from './KanbanCard';
import addIcon from '././assets/add.svg';
import threeIcon from '././assets/3 dot menu.svg';

const sortTickets = (tickets, sortBy) => {
  if (sortBy === 'priority') {
    return tickets.sort((a, b) => b.priority - a.priority);
  }
  if (sortBy === 'title') {
    return tickets.sort((a, b) => a.title.localeCompare(b.title));
  }
  return tickets;
};

const KanbanColumn = ({ title, length, tickets, sortBy }) => {
  const sortedTickets = sortTickets(tickets, sortBy);

  return (
    <div className="kanban-column">
      <div className="head"> 
        <div className="left">
          <h5>{title}</h5>
          <h5 style={{color:'grey'}}>{length}</h5>
        </div>
        <div className="right">
          <img src={addIcon} alt="Icon 1" />
          <img src={threeIcon} alt="Icon 2" />
        </div>
      </div>
      
      {sortedTickets.map(ticket => (
        <KanbanCard key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default KanbanColumn;
