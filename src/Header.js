import React, { useState } from 'react';
import DisplayIcon from '././assets/Display.svg';
import DownIcon from '././assets/down.svg'


const Header = ({ setGroupBy, setSortBy }) => {
  const [showDropdown, setShowDropdown] = useState(false);

  const handleGroupByChange = (e) => {
    setGroupBy(e.target.value);
    setShowDropdown(false);
  };

  const handleSortByChange = (e) => {
    setSortBy(e.target.value);
    setShowDropdown(false);
  };

  return (
    <div className="header">
      <div className="dropdown">
      <button onClick={() => setShowDropdown(!showDropdown)} className="dropbtn">
          <img className="icon-left" src={DisplayIcon} alt="Left Icon" />
          Display
          <img className="icon-right" src={DownIcon} alt="Right Icon" />
      </button>
        {showDropdown && (
          <div className="dropdown-content">
            <div className="dropdown-section">
              <label>Grouping:</label>
              <select onChange={handleGroupByChange}>
                <option value="status">Status</option>
                <option value="userId">User</option>
                <option value="priority">Priority</option>
              </select>
            </div>
            <div className="dropdown-section">
              <label>Odring:</label>
              <select onChange={handleSortByChange}>
                <option value="priority">Priority</option>
                <option value="title">Title</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
