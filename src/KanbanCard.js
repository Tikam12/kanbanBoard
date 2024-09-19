import React from 'react';
import './app.css'; 

import lowPriorityIcon from '././assets/Img - Low Priority.svg';
import mediumPriorityIcon from '././assets/Img - Medium Priority.svg';
import highPriorityIcon from '././assets/Img - High Priority.svg';
import NoPriorityIcon from '././assets/No-priority.svg';
import urgent from '././assets/SVG - Urgent Priority colour.svg';

// Import different icons from the assets folder
import todoIcon from '././assets/To-do.svg';
import inProgressIcon from '././assets/in-progress.svg';
import backlogIcon from '././assets/Backlog.svg';
import completedIcon from '././assets/down.svg';

const KanbanCard = ({ ticket, user }) => {

  const getTicketIcon = (status) => {
    switch (status) {
      case 'Todo':
        return todoIcon;
      case 'In progress':
        return inProgressIcon;
      case 'Backlog':
        return backlogIcon;
      case 'Completed':
        return completedIcon;
      default:
        return todoIcon; 
    }
  };

  const getPriorityIcon = (priority) => {
    switch (priority) {
      case 0:
        return NoPriorityIcon
      case 1:
        return lowPriorityIcon; // Low priority icon
      case 2:
        return mediumPriorityIcon; // Medium priority icon
      case 3:
        return highPriorityIcon; // High priority icon
      case 4:
        return urgent; // Critical priority icon
      default:
        return lowPriorityIcon; // Default to low priority
    }
  };

  return (
    <div className="kanban-card">
      <div className="kanban-card-header">
        <span className="ticket-id">{ticket.id}</span>
        <img
          className="user-avatar"
          src="https://static-00.iconduck.com/assets.00/slightly-smiling-face-emoji-2048x1974-5msgqz9c.png"
          alt="User Avatar"
        />
      </div>

      <div className="ticket-title-container">
        <img
          className='ticket-icon'
          src={getTicketIcon(ticket.status)}
          alt={`${ticket.status} Icon`}
        />
        <h4 className="ticket-title">{ticket.title}</h4>
      </div>

      <div className="kanban-card-footer">
        <div className="priority-icon-box">
          <img
            className="priority-icon"
            src={getPriorityIcon(ticket.priority)}
            alt={`Priority ${ticket.priority} Icon`}
          />
        </div>

        {ticket.tag.map((t, index) => (
          <div className='tag-box'> 
            <span key={index} className="tag">{t}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanCard;
