import React from 'react';
import { motion } from 'framer-motion';

export default function GameHUD({ turnCount, maxTurns, currentPlayer, players }) {
  const currentPlayerData = players[currentPlayer];
  const progressPercentage = (turnCount / (maxTurns * 2)) * 100;

  return (
    <div className="position-fixed bottom-0 start-0 end-0 p-4" style={{ zIndex: 20 }}>
      <div className="container-fluid">
        <motion.div
          className="card border-0"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="card-body p-3">
            <div className="row align-items-center">
              {/* Turn Tracker */}
              <div className="col-md-4">
                <div className="text-center">
                  <h6 className="text-white fw-bold mb-2 d-flex align-items-center justify-content-center">
                    <span className="me-2">🎯</span>
                    Mission Progress
                  </h6>
                  
                  {/* Segmented Progress Bar */}
                  <div className="position-relative">
                    <div 
                      className="rounded-pill"
                      style={{
                        height: '12px',
                        background: 'rgba(255, 255, 255, 0.1)',
                        overflow: 'hidden'
                      }}
                    >
                      <motion.div
                        className="h-100 rounded-pill"
                        style={{
                          background: 'linear-gradient(90deg, #00ff99, #38bdf8, #facc15)',
                          boxShadow: '0 0 20px rgba(0, 255, 153, 0.5)'
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progressPercentage}%` }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                      />
                    </div>
                    
                    {/* Progress Text */}
                    <div className="d-flex justify-content-between mt-2">
                      <small className="text-white-50">Turn {Math.ceil(turnCount / 2)} of {maxTurns}</small>
                      <small className="text-white-50">Round {turnCount}</small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Current Player Status */}
              <div className="col-md-4">
                <div className="text-center">
                  <motion.div
                    className="d-flex align-items-center justify-content-center mb-2"
                    animate={{
                      scale: [1, 1.05, 1],
                      filter: 'brightness(1.2)'
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div 
                      className="rounded-circle me-2 d-flex align-items-center justify-content-center"
                      style={{ 
                        width: '40px', 
                        height: '40px', 
                        background: `linear-gradient(45deg, ${currentPlayerData.color}, rgba(255,255,255,0.2))`,
                        fontSize: '1.2rem'
                      }}
                    >
                      {currentPlayer === 'player1' ? '👩‍🌾' : '🧑‍🚀'}
                    </div>
                    <div>
                      <h6 className="text-white fw-bold mb-0">{currentPlayerData.name}'s Turn</h6>
                      <small className="text-white-50">Ready to roll</small>
                    </div>
                  </motion.div>
                  
                  {/* Turn Status */}
                  <motion.div
                    className="d-flex align-items-center justify-content-center"
                    animate={{
                      color: ['#00ff99', '#38bdf8', '#facc15', '#00ff99']
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <span className="me-2">🎲</span>
                    <span className="fw-bold">Mission Active</span>
                  </motion.div>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="col-md-4">
                <div className="row g-2">
                  <div className="col-6">
                    <div 
                      className="rounded p-2 text-center"
                      style={{ background: 'rgba(0, 255, 153, 0.1)' }}
                    >
                      <div className="text-success fw-bold fs-6">
                        {players.player1.ecoCoins}
                      </div>
                      <small className="text-white-50">{players.player1.name}</small>
                    </div>
                  </div>
                  <div className="col-6">
                    <div 
                      className="rounded p-2 text-center"
                      style={{ background: 'rgba(56, 189, 248, 0.1)' }}
                    >
                      <div className="text-info fw-bold fs-6">
                        {players.player2.ecoCoins}
                      </div>
                      <small className="text-white-50">{players.player2.name}</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Animated Status Indicators */}
            <div className="row mt-3">
              <div className="col-12">
                <div className="d-flex justify-content-center">
                  <motion.div
                    className="d-flex align-items-center"
                    animate={{
                      x: [0, 10, 0],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <div className="me-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                        style={{ fontSize: '1rem' }}
                      >
                        🛰️
                      </motion.div>
                    </div>
                    <span className="text-white-50 small">
                      NASA satellite monitoring active
                    </span>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
