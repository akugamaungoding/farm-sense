import React from 'react';
import { motion } from 'framer-motion';

export default function PlayerPanels({ players, currentPlayer, turnCount, maxTurns, consecutiveCorrect, totalCorrectAnswers, totalQuestions }) {
  const currentPlayerData = players[currentPlayer];
  const otherPlayerId = currentPlayer === 'player1' ? 'player2' : 'player1';

  return (
    <div className="position-fixed start-0 top-0 h-100 d-flex flex-column justify-content-start p-4" style={{ zIndex: 20, width: '320px', paddingTop: '80px' }}>
      {/* Player 1 Panel */}
      <motion.div
        className={`card border-0 mb-3 ${
          currentPlayer === 'player1' ? 'shadow-lg' : 'shadow'
        }`}
        style={{
          background: currentPlayer === 'player1' 
            ? 'rgba(0, 255, 153, 0.15)' 
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: currentPlayer === 'player1' 
            ? '2px solid rgba(0, 255, 153, 0.5)' 
            : '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: currentPlayer === 'player1'
            ? '0 0 30px rgba(0, 255, 153, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
        animate={{
          scale: currentPlayer === 'player1' ? 1.05 : 1,
          boxShadow: currentPlayer === 'player1'
            ? '0 0 40px rgba(0, 255, 153, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-body p-4">
          {/* Player Header */}
          <div className="d-flex align-items-center mb-3">
            <div 
              className="rounded-circle me-3 d-flex align-items-center justify-content-center"
              style={{ 
                width: '50px', 
                height: '50px', 
                background: `linear-gradient(45deg, ${players.player1.color}, rgba(255,255,255,0.2))`,
                fontSize: '1.5rem'
              }}
            >
              👩‍🌾
            </div>
            <div>
              <h5 className="mb-1 text-white fw-bold">{players.player1.name}</h5>
              <small className="text-white-50">Farmer</small>
            </div>
            {currentPlayer === 'player1' && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ms-auto"
              >
                <span className="text-warning fs-4">👑</span>
              </motion.div>
            )}
          </div>

          {/* Eco Coins */}
          <motion.div
            className="d-flex justify-content-between align-items-center mb-3"
            animate={{
              color: players.player1.ecoCoins > 100 ? '#00ff99' : '#ffffff'
            }}
          >
            <span className="text-white-50">💰 Eco-coins:</span>
            <motion.span
              className="fw-bold fs-5"
              animate={{
                scale: [1, 1.1, 1],
                textShadow: '0 0 10px currentColor'
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {players.player1.ecoCoins}
            </motion.span>
          </motion.div>

          {/* Position */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-white-50">📍 Position:</span>
            <span className="text-white fw-bold">Tile {players.player1.position + 1}</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <small className="text-white-50">Progress</small>
              <small className="text-white-50">{Math.ceil(turnCount / 2)}/{maxTurns}</small>
            </div>
            <div className="progress" style={{ height: '6px', background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="progress-bar"
                style={{
                  background: 'linear-gradient(90deg, #00ff99, #38bdf8)',
                  boxShadow: '0 0 10px rgba(0, 255, 153, 0.5)'
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(turnCount / (maxTurns * 2)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Player 2 Panel */}
      <motion.div
        className={`card border-0 ${
          currentPlayer === 'player2' ? 'shadow-lg' : 'shadow'
        }`}
        style={{
          background: currentPlayer === 'player2' 
            ? 'rgba(56, 189, 248, 0.15)' 
            : 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: currentPlayer === 'player2' 
            ? '2px solid rgba(56, 189, 248, 0.5)' 
            : '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: currentPlayer === 'player2'
            ? '0 0 30px rgba(56, 189, 248, 0.3)'
            : '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
        animate={{
          scale: currentPlayer === 'player2' ? 1.05 : 1,
          boxShadow: currentPlayer === 'player2'
            ? '0 0 40px rgba(56, 189, 248, 0.4)'
            : '0 8px 32px rgba(0, 0, 0, 0.3)'
        }}
        transition={{ duration: 0.3 }}
      >
        <div className="card-body p-4">
          {/* Player Header */}
          <div className="d-flex align-items-center mb-3">
            <div 
              className="rounded-circle me-3 d-flex align-items-center justify-content-center"
              style={{ 
                width: '50px', 
                height: '50px', 
                background: `linear-gradient(45deg, ${players.player2.color}, rgba(255,255,255,0.2))`,
                fontSize: '1.5rem'
              }}
            >
              🧑‍🚀
            </div>
            <div>
              <h5 className="mb-1 text-white fw-bold">{players.player2.name}</h5>
              <small className="text-white-50">Astronaut</small>
            </div>
            {currentPlayer === 'player2' && (
              <motion.div
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="ms-auto"
              >
                <span className="text-warning fs-4">👑</span>
              </motion.div>
            )}
          </div>

          {/* Eco Coins */}
          <motion.div
            className="d-flex justify-content-between align-items-center mb-3"
            animate={{
              color: players.player2.ecoCoins > 100 ? '#00ff99' : '#ffffff'
            }}
          >
            <span className="text-white-50">💰 Eco-coins:</span>
            <motion.span
              className="fw-bold fs-5"
              animate={{
                scale: [1, 1.1, 1],
                textShadow: '0 0 10px currentColor'
              }}
              transition={{ duration: 0.5, repeat: Infinity }}
            >
              {players.player2.ecoCoins}
            </motion.span>
          </motion.div>

          {/* Position */}
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-white-50">📍 Position:</span>
            <span className="text-white fw-bold">Tile {players.player2.position + 1}</span>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="d-flex justify-content-between mb-1">
              <small className="text-white-50">Progress</small>
              <small className="text-white-50">{Math.ceil(turnCount / 2)}/{maxTurns}</small>
            </div>
            <div className="progress" style={{ height: '6px', background: 'rgba(255,255,255,0.1)' }}>
              <motion.div
                className="progress-bar"
                style={{
                  background: 'linear-gradient(90deg, #38bdf8, #facc15)',
                  boxShadow: '0 0 10px rgba(56, 189, 248, 0.5)'
                }}
                initial={{ width: 0 }}
                animate={{ width: `${(turnCount / (maxTurns * 2)) * 100}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Challenge Stats */}
      <motion.div
        className="card border-0 mt-1"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="card-body p-3">
          <h6 className="text-white fw-bold mb-3 d-flex align-items-center">
            <span className="me-2">🏆</span>
            Mission Stats
          </h6>
          <div className="row g-2 text-center">
            <div className="col-4">
              <div 
                className="rounded p-2"
                style={{ background: 'rgba(0, 255, 153, 0.1)' }}
              >
                <div className="fw-bold text-success">{consecutiveCorrect}</div>
                <small className="text-white-50">Streak</small>
              </div>
            </div>
            <div className="col-4">
              <div 
                className="rounded p-2"
                style={{ background: 'rgba(56, 189, 248, 0.1)' }}
              >
                <div className="fw-bold text-info">{totalCorrectAnswers}</div>
                <small className="text-white-50">Correct</small>
              </div>
            </div>
            <div className="col-4">
              <div 
                className="rounded p-2"
                style={{ background: 'rgba(250, 204, 21, 0.1)' }}
              >
                <div className="fw-bold text-warning">
                  {totalQuestions > 0 ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0}%
                </div>
                <small className="text-white-50">Accuracy</small>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
