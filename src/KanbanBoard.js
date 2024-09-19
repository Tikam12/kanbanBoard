import React from 'react';
import KanbanColumn from './KanbanColumn';

// Priority mapping
const priorityMapping = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

// Priority order
const priorityOrder = ['No priority', 'Urgent', 'High', 'Medium', 'Low'];

// Status order (ensures that these 5 columns are always present)
const statusOrder = ['Backlog', 'Todo', 'In progress', 'Done', 'Cancel'];

// Helper function to get the user name from the user ID
const getUserName = (userId, users) => {
  const user = users.find(user => `user-${user.id}` === userId);
  return user ? user.name : 'Unknown User';
};

// Function to group tickets by the selected criterion (status, userId, or priority)
const groupTickets = (tickets, groupBy, users) => {
  const groups = {};

  tickets.forEach(ticket => {
    let groupKey;

    if (groupBy === 'status') {
      // Group by ticket status
      groupKey = ticket.status || 'No Status';
    } else if (groupBy === 'userId') {
      // Group by user name (using userId)
      groupKey = getUserName(`user-${ticket.userId}`, users) || 'No User';
    } else if (groupBy === 'priority') {
      // Group by priority (using the priority mapping)
      groupKey = priorityMapping[ticket.priority] || 'No Priority';
    } else {
      groupKey = 'No Group'; // Default case if groupBy doesn't match
    }

    if (!groups[groupKey]) groups[groupKey] = [];
    groups[groupKey].push(ticket);
  });

  return groups;
};

// Function to ensure 5 columns always exist when groupBy === status
const ensureStatusColumns = (groupedTickets) => {
  const result = { ...groupedTickets };

  // Ensure all status columns are present, even if they have no tickets
  statusOrder.forEach(status => {
    if (!result[status]) {
      result[status] = [];
    }
  });

  return result;
};

// Function to sort the groups based on the groupBy option
const sortGroups = (groups, groupBy) => {
  if (groupBy === 'status') {
    // Sort by predefined status order
    return Object.keys(groups).sort((a, b) => statusOrder.indexOf(a) - statusOrder.indexOf(b));
  } else if (groupBy === 'priority') {
    // Sort by predefined priority order using priorityOrder array
    return Object.keys(groups).sort((a, b) => priorityOrder.indexOf(a) - priorityOrder.indexOf(b));
  } else if (groupBy === 'userId') {
    // Sort by user names alphabetically
    return Object.keys(groups).sort((a, b) => a.localeCompare(b));
  }

  return Object.keys(groups);
};

const KanbanBoard = ({ tickets, users, groupBy, sortBy }) => {
  let groupedTickets = groupTickets(tickets, groupBy, users);

  if (groupBy === 'status') {
    groupedTickets = ensureStatusColumns(groupedTickets);
  }

  const sortedGroups = sortGroups(groupedTickets, groupBy);

  return (
    <div className="kanban-board">
      {sortedGroups.map(group => (
        <KanbanColumn
          key={group}
          title={`${group}`}
          length = {`${groupedTickets[group].length}`}
          users={users}
          tickets={groupedTickets[group]}
          sortBy={sortBy}
        />
      ))}
    </div>
  );
};

export default KanbanBoard;
