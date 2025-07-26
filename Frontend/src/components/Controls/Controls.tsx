import React from 'react';
import './Controls.css';

const Controls = ({ onToggleGeneration, onReset, isRunning }) => {
  return (
    <div className="controls-container">
      <button onClick={onToggleGeneration} className="control-button toggle-button">
        {isRunning ? 'Pause' : 'Play'}
      </button>
      <button onClick={onReset} className="control-button reset-button">
        Reset
      </button>
    </div>
  );
};

export default Controls;