import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import storyData from '../data/storyData.json';
import soundEffects from '../utils/soundEffects';
import Character from '../components/Character';

const GamePage = () => {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(60);
  const [score, setScore] = useState(0);
  const [currentAlert, setCurrentAlert] = useState(null);
  const [showFact, setShowFact] = useState(false);
  const [fact, setFact] = useState('');
  const [isGameActive, setIsGameActive] = useState(true);
  const [feedback, setFeedback] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [streak, setStreak] = useState(0);
  const timerRef = useRef(null);
  const alertTimerRef = useRef(null);

  // Game timer
  useEffect(() => {
    if (isGameActive && timeLeft > 0) {
      timerRef.current = setTimeout(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsGameActive(false);
      navigate('/result', { state: { score, streak } });
    }

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [timeLeft, isGameActive, navigate, score, streak]);

  // Generate random alerts
  useEffect(() => {
    if (isGameActive && !currentAlert) {
      const generateAlert = () => {
        const randomEvent = storyData.gameEvents[Math.floor(Math.random() * storyData.gameEvents.length)];
        setCurrentAlert(randomEvent);
        
        // Auto-clear alert after 6 seconds (longer for kids)
        alertTimerRef.current = setTimeout(() => {
          if (currentAlert) {
            handleAction('timeout');
          }
        }, 6000);
      };

      // First alert after 2 seconds
      const initialDelay = setTimeout(generateAlert, 2000);
      
      // Subsequent alerts every 3-5 seconds (slower for kids)
      const interval = setInterval(generateAlert, Math.random() * 2000 + 3000);

      return () => {
        clearTimeout(initialDelay);
        clearInterval(interval);
        if (alertTimerRef.current) clearTimeout(alertTimerRef.current);
      };
    }
  }, [isGameActive, currentAlert]);

  const handleAction = (action) => {
    if (!currentAlert || !isGameActive) return;

    // Clear the alert timer
    if (alertTimerRef.current) {
      clearTimeout(alertTimerRef.current);
    }

    const isCorrect = action === currentAlert.correctAction;
    let points = 0;
    let newStreak = streak;

    if (isCorrect) {
      points = 10 + (streak * 2); // Bonus points for streaks
      newStreak = streak + 1;
      setFeedback(`Great job! +${points} points! 🌟`);
      setFact(currentAlert.nasaFact);
      setShowFact(true);
      soundEffects.playSuccess();
      
      // Hide fact after 4 seconds (longer for kids to read)
      setTimeout(() => setShowFact(false), 4000);
    } else if (action === 'timeout') {
      newStreak = 0;
      setFeedback('Oh no! Too slow! ⏰');
      soundEffects.playAlarm();
    } else {
      newStreak = 0;
      setFeedback('Oops! Try again! 💫');
      soundEffects.playError();
    }

    setScore(score + points);
    setStreak(newStreak);
    setCurrentAlert(null);
    setShowFeedback(true);

    // Hide feedback after 1.5 seconds
    setTimeout(() => setShowFeedback(false), 1500);
  };

  const getActionEmoji = (action) => {
    switch (action) {
      case 'water': return '💧';
      case 'shade': return '☀️';
      case 'fertilize': return '🌾';
      case 'protect': return '🌪️';
      default: return '❓';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-orange-100 relative overflow-hidden">
      {/* Background particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-yellow-300 rounded-full opacity-30"
            initial={{
              x: Math.random() * window.innerWidth,
              y: Math.random() * window.innerHeight,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 p-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-8">
          <motion.div 
            className="text-2xl font-bold text-gray-700 flex items-center gap-3"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Character character="astro" size="small" isTalking={true} />
            <span>Space Farm Adventure!</span>
          </motion.div>
          
          <div className="flex items-center space-x-6">
            {/* Score */}
            <motion.div 
              className="text-center bg-green-100 rounded-2xl p-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div className="text-sm font-bold text-green-600">🌟 POINTS</div>
              <div className="text-2xl font-black text-green-500">{score}</div>
            </motion.div>

            {/* Streak */}
            <motion.div 
              className="text-center bg-orange-100 rounded-2xl p-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="text-sm font-bold text-orange-600">⚡ STREAK</div>
              <div className="text-2xl font-black text-orange-500">{streak}</div>
            </motion.div>

            {/* Timer */}
            <motion.div 
              className="text-center bg-red-100 rounded-2xl p-3"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="text-sm font-bold text-red-600">⏰ TIME</div>
              <motion.div 
                className="text-3xl font-black"
                animate={{ 
                  scale: timeLeft <= 10 ? [1, 1.2, 1] : 1,
                  color: timeLeft <= 10 ? '#ef4444' : '#6b7280'
                }}
                transition={{ duration: 0.5, repeat: timeLeft <= 10 ? Infinity : 0 }}
              >
                {timeLeft}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Current Alert */}
        <AnimatePresence>
          {currentAlert && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5, y: -100 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -100 }}
              className="alert-banner bg-gradient-to-r from-blue-500 to-purple-500 mb-8 max-w-3xl mx-auto"
            >
              <div className="text-center p-6">
                <div className="text-6xl mb-4">{currentAlert.emoji}</div>
                <div className="text-xl mb-4 font-bold">{currentAlert.story}</div>
                <div className="text-lg opacity-90">
                  Help our plants by choosing the right action!
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Action Buttons */}
        <motion.div 
          className="grid grid-cols-2 gap-8 max-w-lg mx-auto mb-8"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <motion.button
            className="w-40 h-40 rounded-3xl flex flex-col items-center justify-center text-white font-bold text-lg transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-xl bg-gradient-to-br from-blue-400 to-blue-600"
            onClick={() => {
              soundEffects.playWater();
              handleAction('water');
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!currentAlert}
          >
            <div className="text-5xl mb-3">💧</div>
            <div>Give Water</div>
          </motion.button>

          <motion.button
            className="w-40 h-40 rounded-3xl flex flex-col items-center justify-center text-white font-bold text-lg transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-xl bg-gradient-to-br from-yellow-400 to-orange-500"
            onClick={() => {
              soundEffects.playClick();
              handleAction('shade');
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!currentAlert}
          >
            <div className="text-5xl mb-3">☀️</div>
            <div>Give Shade</div>
          </motion.button>

          <motion.button
            className="w-40 h-40 rounded-3xl flex flex-col items-center justify-center text-white font-bold text-lg transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-xl bg-gradient-to-br from-green-400 to-green-600"
            onClick={() => {
              soundEffects.playClick();
              handleAction('fertilize');
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!currentAlert}
          >
            <div className="text-5xl mb-3">🌾</div>
            <div>Give Food</div>
          </motion.button>

          <motion.button
            className="w-40 h-40 rounded-3xl flex flex-col items-center justify-center text-white font-bold text-lg transition-all duration-200 transform hover:scale-110 active:scale-95 shadow-xl bg-gradient-to-br from-purple-400 to-pink-500"
            onClick={() => {
              soundEffects.playClick();
              handleAction('protect');
            }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={!currentAlert}
          >
            <div className="text-5xl mb-3">🛡️</div>
            <div>Protect</div>
          </motion.button>
        </motion.div>

        {/* Feedback */}
        <AnimatePresence>
          {showFeedback && (
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              className="score-popup pointer-events-none"
            >
              <motion.div
                animate={{ 
                  y: [-50, -100],
                  opacity: [1, 0],
                  scale: [1, 1.5]
                }}
                transition={{ duration: 1.5 }}
                className="text-6xl font-black text-center"
              >
                {feedback}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* NASA Fact Popup */}
        <AnimatePresence>
          {showFact && (
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-50 max-w-2xl mx-4"
            >
              <div className="party-card p-6 bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                <div className="text-center">
                  <div className="text-4xl mb-4">🛰️ Cool Space Fact! 🛰️</div>
                  <p className="text-lg font-medium leading-relaxed">{fact}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Instructions */}
        <motion.div 
          className="text-center text-gray-600 text-base"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
        >
          <p className="font-medium">Help our space farming friends take care of their plants! 🌱</p>
          <p className="mt-2">When you see a problem, choose the right action to help! 🌟</p>
        </motion.div>
      </div>
    </div>
  );
};

export default GamePage;
