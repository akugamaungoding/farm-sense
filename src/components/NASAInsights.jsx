import React from 'react';

const NASAInsights = ({ day }) => {
  const nasaFacts = [
    "NASA's SMAP mission helps monitor soil moisture for better drought prediction.",
    "Vegetation health indices (NDVI) can identify crop stress from space.",
    "Extreme heat impacts crop yield — data from NASA MODIS shows temperature trends globally.",
    "NASA's Landsat satellites track agricultural productivity and land use changes.",
    "Soil moisture data from space helps farmers optimize irrigation timing.",
    "NASA's GRACE mission monitors groundwater depletion affecting agriculture.",
    "Satellite imagery can detect crop diseases before they spread across fields.",
    "NASA's weather data helps predict optimal planting and harvesting windows.",
    "Remote sensing technology enables precision agriculture and sustainable farming.",
    "NASA's Earth observation data supports global food security initiatives."
  ];

  const randomFact = nasaFacts[day % nasaFacts.length];

  return (
    <div className="card bg-light border-0 shadow-sm">
      <div className="card-body">
        <h6 className="card-title text-primary">
          <i className="fas fa-satellite me-2"></i>
          NASA Insight
        </h6>
        <p className="card-text small">{randomFact}</p>
      </div>
    </div>
  );
};

export default NASAInsights;
