// src/components/Sidebar.js
import React from 'react';

const Sidebar = ({ showContent }) => (
  <div className="sidebar">
    <h3>Global SmartKidz Preschool</h3>
    <ul className="nav flex-column">
      <li className="nav-item">
        <a className="nav-link active" onClick={() => showContent('feesCollection')}>Dashboard</a>
      </li>
      <li className="nav-item">
        <a className="nav-link" onClick={() => showContent('addFees')}>Add Fees</a>
      </li>
    </ul>
  </div>
);

export default Sidebar;
