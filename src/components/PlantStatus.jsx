import React from 'react';

const PlantStatus = ({ health, soilMoisture, temperature }) => {
  const getPlantColor = () => {
    if (health >= 80) return '#4CAF50'; // Green
    if (health >= 60) return '#8BC34A'; // Light green
    if (health >= 40) return '#FFC107'; // Yellow
    if (health >= 20) return '#FF9800'; // Orange
    return '#F44336'; // Red
  };

  const getPlantSize = () => {
    return Math.max(20, (health / 100) * 60) + 'px';
  };

  const getStatusMessage = () => {
    if (soilMoisture < 0.3) {
      return "Soil too dry! NASA SMAP data shows low moisture.";
    }
    if (temperature > 35) {
      return "Heat stress detected! Temperature above optimal range.";
    }
    if (health >= 80) {
      return "Plant is thriving! Optimal growing conditions.";
    }
    if (health >= 60) {
      return "Plant is healthy. Good growing conditions.";
    }
    if (health >= 40) {
      return "Plant needs attention. Monitor conditions closely.";
    }
    if (health >= 20) {
      return "Plant is struggling. Immediate action needed.";
    }
    return "Plant is in critical condition!";
  };

  return (
    <div className="text-center">
      <div className="mb-3">
        <div 
          className="plant-icon mx-auto d-flex align-items-center justify-content-center"
          style={{
            width: getPlantSize(),
            height: getPlantSize(),
            backgroundColor: getPlantColor(),
            borderRadius: '50%',
            fontSize: '24px',
            color: 'white',
            transition: 'all 0.3s ease'
          }}
        >
          🌱
        </div>
      </div>
      
      <div className="card bg-light border-0 shadow-sm">
        <div className="card-body">
          <h6 className="card-title text-success">
            <i className="fas fa-seedling me-2"></i>
            Plant Status
          </h6>
          <p className="card-text small mb-2">{getStatusMessage()}</p>
          <div className="progress mb-2" style={{ height: '8px' }}>
            <div 
              className="progress-bar bg-success" 
              role="progressbar" 
              style={{ width: `${health}%` }}
              aria-valuenow={health} 
              aria-valuemin="0" 
              aria-valuemax="100"
            ></div>
          </div>
          <small className="text-muted">Health: {health}%</small>
        </div>
      </div>
    </div>
  );
};

export default PlantStatus;
