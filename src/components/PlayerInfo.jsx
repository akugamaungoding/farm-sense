import React from 'react';
import { motion } from 'framer-motion';

export default function PlayerInfo({ players, currentPlayer, turnCount, maxTurns, consecutiveCorrect, totalCorrectAnswers, totalQuestions }) {
  const currentPlayerData = players[currentPlayer];
  const otherPlayerId = currentPlayer === 'player1' ? 'player2' : 'player1';
  const otherPlayerData = players[otherPlayerId];

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl border-2 border-white/50 p-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-2">🌾 FARMPOLY 3D</h2>
        <div className="text-sm text-gray-600">
          Turn {Math.ceil(turnCount / 2)} of {maxTurns} • Round {turnCount}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {/* Current Player */}
        <motion.div
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            currentPlayer === 'player1'
              ? 'border-green-500 bg-green-50 shadow-lg scale-105'
              : 'border-gray-200 bg-gray-50'
          }`}
          animate={{
            scale: currentPlayer === 'player1' ? 1.05 : 1,
            boxShadow: currentPlayer === 'player1' 
              ? '0 10px 25px rgba(34, 197, 94, 0.3)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: players.player1.color }}
            />
            <h3 className="font-bold text-lg text-gray-800">
              {players.player1.name}
            </h3>
            {currentPlayer === 'player1' && (
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-xl"
              >
                👑
              </motion.span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">💰 Eco-coins:</span>
              <span className="font-bold text-green-600">
                {players.player1.ecoCoins}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">📍 Position:</span>
              <span className="font-bold">
                Tile {players.player1.position + 1}
              </span>
            </div>
          </div>
        </motion.div>

        {/* Player 2 */}
        <motion.div
          className={`p-4 rounded-xl border-2 transition-all duration-300 ${
            currentPlayer === 'player2'
              ? 'border-blue-500 bg-blue-50 shadow-lg scale-105'
              : 'border-gray-200 bg-gray-50'
          }`}
          animate={{
            scale: currentPlayer === 'player2' ? 1.05 : 1,
            boxShadow: currentPlayer === 'player2' 
              ? '0 10px 25px rgba(3, 169, 244, 0.3)' 
              : '0 4px 12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <div 
              className="w-4 h-4 rounded-full"
              style={{ backgroundColor: players.player2.color }}
            />
            <h3 className="font-bold text-lg text-gray-800">
              {players.player2.name}
            </h3>
            {currentPlayer === 'player2' && (
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ duration: 0.5, repeat: Infinity }}
                className="text-xl"
              >
                👑
              </motion.span>
            )}
          </div>
          <div className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">💰 Eco-coins:</span>
              <span className="font-bold text-blue-600">
                {players.player2.ecoCoins}
              </span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">📍 Position:</span>
              <span className="font-bold">
                Tile {players.player2.position + 1}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Challenge Stats */}
      <div className="mt-4 pt-3 border-top">
        <h6 className="fw-bold text-dark mb-3">
          <i className="fas fa-trophy me-2"></i>
          Challenge Stats
        </h6>
        <div className="row g-2 text-center">
          <div className="col-4">
            <div className="bg-success bg-opacity-10 rounded p-2">
              <div className="fw-bold text-success">{consecutiveCorrect}</div>
              <small className="text-muted">Streak</small>
            </div>
          </div>
          <div className="col-4">
            <div className="bg-primary bg-opacity-10 rounded p-2">
              <div className="fw-bold text-primary">{totalCorrectAnswers}</div>
              <small className="text-muted">Correct</small>
            </div>
          </div>
          <div className="col-4">
            <div className="bg-warning bg-opacity-10 rounded p-2">
              <div className="fw-bold text-warning">
                {totalQuestions > 0 ? Math.round((totalCorrectAnswers / totalQuestions) * 100) : 0}%
              </div>
              <small className="text-muted">Accuracy</small>
            </div>
          </div>
        </div>
      </div>

      {/* Game Progress */}
      <div className="mt-4 pt-3 border-top">
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="text-muted small">Game Progress</span>
          <span className="text-muted small">{Math.ceil(turnCount / 2)}/{maxTurns} Turns</span>
        </div>
        <div className="progress" style={{ height: '8px' }}>
          <motion.div
            className="progress-bar bg-gradient"
            initial={{ width: 0 }}
            animate={{ width: `${(turnCount / (maxTurns * 2)) * 100}%` }}
            transition={{ duration: 0.5 }}
            style={{ background: 'linear-gradient(90deg, #28a745, #007bff)' }}
          />
        </div>
      </div>

      {/* Current Player Turn Indicator */}
      <motion.div
        className="mt-4 text-center"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="text-sm text-gray-600">
          {currentPlayerData.name}'s turn
        </div>
        <motion.div
          className="text-lg font-bold"
          style={{ color: currentPlayerData.color }}
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          🎯 Ready to Roll!
        </motion.div>
      </motion.div>
    </div>
  );
}
