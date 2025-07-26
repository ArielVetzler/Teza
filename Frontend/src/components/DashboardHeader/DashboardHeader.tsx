import React from 'react';
import './DashboardHeader.css';

const DashboardHeader = React.memo(() => {
  return (
    <div className="dashboard-header">
      <div className="header-top-row">
        <div className="header-title-section">
          <h1 className="dashboard-title">Real-time News Matching Dashboard</h1>
          <p className="dashboard-summary">
            This dashboard provides a real-time news matching simulation, displaying live article and user feeds, and real-time matches based on interest overlap.
          </p>
        </div>
        
      </div>
      
    </div>
  );
});

export default DashboardHeader;