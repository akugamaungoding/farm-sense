import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import soundEffects from '../utils/soundEffects';
import Character from '../components/Character';
import storyData from '../data/storyData.json';

const ResultPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const score = location.state?.score || 0;
  const streak = location.state?.streak || 0;

  const getResultStatus = () => {
    const achievements = storyData.achievements;
    let selectedAchievement = achievements[achievements.length - 1]; // Default to lowest
    
    for (let achievement of achievements) {
      if (score >= achievement.minScore) {
        selectedAchievement = achievement;
        break;
      }
    }
    
    return {
      status: selectedAchievement.title,
      emoji: selectedAchievement.emoji,
      message: selectedAchievement.description,
      color: score >= 100 ? 'from-yellow-400 to-orange-500' :
             score >= 50 ? 'from-green-400 to-blue-500' :
             score >= 20 ? 'from-purple-400 to-pink-500' :
             'from-blue-400 to-green-500'
    };
  };

  const result = getResultStatus();

  const nasaFacts = [
    "NASA satellites can see when plants need water from space! They help farmers know when to water their crops! 🌱💧",
    "The International Space Station goes around Earth 16 times every day! It watches our planet from space! 🛰️🌍",
    "NASA can see if plants are healthy or sick from space using special cameras! 📸🌿",
    "NASA has been watching Earth's farms from space for over 50 years! That's a really long time! 📅🌟",
    "NASA satellites can see water underground! They help farmers know if they have enough water! 💧🌍",
    "NASA can tell us what the weather will be like 7 days before it happens! That helps farmers plan! ☀️⛈️",
    "NASA has taken over 9 million pictures of Earth from space! That's like taking a picture every day for 25,000 years! 📸🌟",
    "NASA satellites help farmers grow food for almost everyone on Earth! That's billions of people! 🌾👨‍👩‍👧‍👦",
    "NASA can see fires from space and warn farmers to protect their crops! 🔥🛡️",
    "NASA's space technology helps farmers use 50% less water to grow plants! That saves lots of water! 💧🌱"
  ];

  const getRandomFact = () => {
    return nasaFacts[Math.floor(Math.random() * nasaFacts.length)];
  };

  const randomFact = getRandomFact();

  const handlePlayAgain = () => {
    soundEffects.playCheering();
    navigate('/game');
  };

  const handleGoHome = () => {
    soundEffects.playClick();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-party flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="party-card p-12 text-center max-w-4xl w-full"
      >
        {/* Result Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <motion.div 
            className="text-8xl mb-4"
            animate={{ 
              rotate: [0, 10, -10, 0],
              scale: [1, 1.1, 1]
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {result.emoji}
          </motion.div>
          
          <motion.h1 
            className="text-3xl md:text-5xl font-black mb-4 bg-gradient-to-r from-green-500 via-blue-500 to-purple-500 bg-clip-text text-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            Great Job! 🎉
          </motion.h1>
          
          <motion.p 
            className="text-lg text-gray-700 font-medium"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.8 }}
          >
            {result.message}
          </motion.p>
        </motion.div>

        {/* Score Display */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          {/* Final Score */}
          <motion.div 
            className="party-card p-8 bg-gradient-to-br from-green-400 to-blue-500 text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-6xl font-black mb-2">{score}</div>
            <div className="text-2xl font-bold">🌟 TOTAL POINTS</div>
            <div className="text-lg opacity-90">Your Space Farming Score!</div>
          </motion.div>

          {/* Best Streak */}
          <motion.div 
            className="party-card p-8 bg-gradient-to-br from-orange-400 to-pink-500 text-white"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="text-6xl font-black mb-2">{streak}</div>
            <div className="text-2xl font-bold">⚡ BEST STREAK</div>
            <div className="text-lg opacity-90">Right answers in a row!</div>
          </motion.div>
        </motion.div>

        {/* Achievement */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
        >
          <div className={`party-card p-8 bg-gradient-to-r ${result.color} text-white`}>
            <div className="text-4xl mb-4">{result.emoji}</div>
            <div className="text-3xl font-black mb-2">{result.status}</div>
            <div className="text-lg opacity-90">Achievement Unlocked!</div>
          </div>
        </motion.div>

        {/* NASA Fact */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8 }}
        >
          <div className="party-card p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
            <div className="text-center">
              <div className="text-4xl mb-4">🛰️ Cool Space Fact! 🛰️</div>
              <p className="text-lg font-medium leading-relaxed">{randomFact}</p>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div 
          className="flex flex-col md:flex-row gap-6 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.8 }}
        >
          <motion.button
            className="party-button bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-black px-10 py-4 rounded-full shadow-2xl"
            onClick={handlePlayAgain}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            🌟 Play Again! 🌟
          </motion.button>

          <motion.button
            className="party-button bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xl font-black px-10 py-4 rounded-full shadow-2xl"
            onClick={handleGoHome}
            whileHover={{ 
              scale: 1.1,
              boxShadow: "0 20px 40px rgba(0,0,0,0.3)"
            }}
            whileTap={{ scale: 0.95 }}
          >
            🏠 Back Home 🏠
          </motion.button>
        </motion.div>

        {/* Fun message */}
        <motion.div 
          className="mt-8 text-base text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          <p className="font-medium">Thanks for helping our space farming friends! 🚀🌾</p>
          <p className="mt-2">You're learning amazing things about how NASA helps farmers from space! 🌟</p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ResultPage;
