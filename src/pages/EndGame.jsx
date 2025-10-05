import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import { getRandomFact } from '../data/nasaFacts';

export default function EndGame() {
  const navigate = useNavigate();
  const { players, getWinner, resetGame } = useGameStore();
  const [nasaFact, setNasaFact] = useState('');
  const [showCelebration, setShowCelebration] = useState(false);

  useEffect(() => {
    setNasaFact(getRandomFact());
    setShowCelebration(true);
  }, []);

  const winner = getWinner();
  const player1 = players.player1;
  const player2 = players.player2;

  const getWinnerTitle = () => {
    const winnerData = winner === 'player1' ? player1 : player2;
    const coins = winnerData.ecoCoins;
    
    if (coins >= 200) return '🌱 Eco Genius';
    if (coins >= 150) return '🌍 Environmental Champion';
    if (coins >= 100) return '🚀 Space Farmer';
    if (coins >= 50) return '🌾 Crop Master';
    return '🌱 Green Thumb';
  };

  const getLoserTitle = () => {
    const loserData = winner === 'player1' ? player2 : player1;
    const coins = loserData.ecoCoins;
    
    if (coins >= 100) return '🌱 Still Learning';
    if (coins >= 50) return '🌿 Growing Strong';
    if (coins >= 25) return '🌾 On the Path';
    return '🌱 Future Farmer';
  };

  const handlePlayAgain = () => {
    resetGame();
    navigate('/');
  };

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-blue-100 to-yellow-100 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, type: "spring" }}
        className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border-4 border-white/50 p-8 max-w-4xl w-full text-center"
      >
        {/* Celebration Animation */}
        {showCelebration && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: '50%', 
                  y: '50%', 
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  x: `${50 + (Math.random() - 0.5) * 400}%`, 
                  y: `${50 + (Math.random() - 0.5) * 400}%`, 
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 3,
                  delay: i * 0.1,
                  repeat: Infinity,
                  repeatDelay: 5
                }}
                className="absolute text-3xl"
              >
                {['🎉', '🌟', '✨', '🚀', '🌱'][i % 5]}
              </motion.div>
            ))}
          </div>
        )}

        {/* Title */}
        <motion.h1
          initial={{ y: -30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-green-500 via-blue-500 to-yellow-500 bg-clip-text text-transparent"
        >
          🏆 Game Complete! 🏆
        </motion.h1>

        {/* Winner Section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mb-8"
        >
          {winner !== 'tie' ? (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                🎉 {players[winner].name} Wins!
              </h2>
              <div className="text-2xl font-bold text-green-600 mb-4">
                {getWinnerTitle()}
              </div>
              <div className="text-xl text-gray-700">
                Final Score: {players[winner].ecoCoins} eco-coins
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                🤝 It's a Tie!
              </h2>
              <div className="text-xl text-gray-700">
                Both players earned {player1.ecoCoins} eco-coins!
              </div>
            </div>
          )}
        </motion.div>

        {/* Final Scores */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Player 1 */}
          <div className={`p-6 rounded-2xl border-2 ${
            winner === 'player1' 
              ? 'border-green-500 bg-green-50 shadow-lg' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div 
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: player1.color }}
              />
              <h3 className="text-xl font-bold text-gray-800">
                {player1.name}
              </h3>
            </div>
            <div className="text-2xl font-bold text-gray-700 mb-2">
              {player1.ecoCoins} eco-coins
            </div>
            <div className={`text-lg font-bold ${
              winner === 'player1' ? 'text-green-600' : 'text-gray-600'
            }`}>
              {winner === 'player1' ? getWinnerTitle() : getLoserTitle()}
            </div>
          </div>

          {/* Player 2 */}
          <div className={`p-6 rounded-2xl border-2 ${
            winner === 'player2' 
              ? 'border-blue-500 bg-blue-50 shadow-lg' 
              : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center justify-center space-x-3 mb-3">
              <div 
                className="w-6 h-6 rounded-full"
                style={{ backgroundColor: player2.color }}
              />
              <h3 className="text-xl font-bold text-gray-800">
                {player2.name}
              </h3>
            </div>
            <div className="text-2xl font-bold text-gray-700 mb-2">
              {player2.ecoCoins} eco-coins
            </div>
            <div className={`text-lg font-bold ${
              winner === 'player2' ? 'text-blue-600' : 'text-gray-600'
            }`}>
              {winner === 'player2' ? getWinnerTitle() : getLoserTitle()}
            </div>
          </div>
        </motion.div>

        {/* NASA Fact */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="bg-gradient-to-r from-blue-50 to-green-50 rounded-2xl p-6 mb-8 border-2 border-blue-200"
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center justify-center space-x-2">
            <span>🛰️</span>
            <span>NASA Space Fact</span>
          </h3>
          <p className="text-lg text-gray-700 leading-relaxed">
            {nasaFact}
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <motion.button
            onClick={handlePlayAgain}
            className="px-8 py-4 bg-gradient-to-r from-green-500 to-blue-500 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🎮 Play Again!
          </motion.button>
          
          <motion.button
            onClick={handleBackToHome}
            className="px-8 py-4 bg-gradient-to-r from-gray-500 to-gray-600 text-white font-bold text-xl rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            🏠 Back to Home
          </motion.button>
        </motion.div>

        {/* Game Summary */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.3 }}
          className="mt-8 text-sm text-gray-600"
        >
          <p>Thanks for playing FARMPOLY 3D: Space Data Duel! 🌾</p>
          <p className="mt-1">You learned about NASA's role in modern agriculture! 🚀</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
