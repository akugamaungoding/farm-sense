import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import Cinematic3DBackground from '../components/Cinematic3DBackground';
import TutorialCard from '../components/TutorialCard';
import { soundEffects } from '../utils/soundManager';

const HomePage = () => {
  const navigate = useNavigate();
  const { setPlayerNames, resetGame } = useGameStore();
  const [player1Name, setPlayer1Name] = useState('');
  const [player2Name, setPlayer2Name] = useState('');
  const [showAnimation, setShowAnimation] = useState(false);
  const [isLaunching, setIsLaunching] = useState(false);
  const [showUI, setShowUI] = useState(true);
  const [showTutorial, setShowTutorial] = useState(true);

  const handleStartGame = () => {
    if (player1Name.trim() && player2Name.trim()) {
      // Play launch sound
      soundEffects.playLaunch();
      
      // Start launch sequence
      setIsLaunching(true);
      setShowAnimation(true);
      
      // Hide UI and start transition
      setTimeout(() => {
        setShowUI(false);
        resetGame();
        setPlayerNames(player1Name.trim(), player2Name.trim());
      }, 1500);
      
      // Navigate after launch animation
      setTimeout(() => {
        navigate('/board');
      }, 3000);
    }
  };

  const handleInputHover = () => {
    soundEffects.playHover();
  };

  const handleTutorialComplete = () => {
    setShowTutorial(false);
  };

  const handleShowTutorial = () => {
    setShowTutorial(true);
  };

  return (
    <div className="min-vh-100 position-relative overflow-hidden">
      {/* Cinematic 3D Background */}
      <Cinematic3DBackground isLaunching={isLaunching} />
      
      {/* Hero Section - Dominant Title */}
      <AnimatePresence>
        {showUI && (
          <div className="position-relative z-10 min-vh-100 d-flex flex-column">
            
            {/* Hero Title Section (Top Half) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 1 }}
              className="flex-grow-1 d-flex align-items-center justify-content-center"
              style={{ minHeight: '60vh' }}
            >
              <div className="text-center">
                {/* Main Title - Cinematic Glow */}
                <motion.h1
                  className="display-1 fw-bold mb-4"
                  style={{
                    background: 'linear-gradient(45deg, #00E5FF, #00FF88, #FFFFFF)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 50px rgba(0, 229, 255, 0.8), 0 0 100px rgba(0, 255, 136, 0.6)',
                    filter: 'drop-shadow(0 0 30px rgba(0, 229, 255, 0.5))',
                    fontSize: 'clamp(3rem, 8vw, 6rem)',
                    lineHeight: 1.1
                  }}
                  initial={{ opacity: 0, y: -100, scale: 0.5 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 1.5, ease: "easeOut" }}
                >
                  <motion.span
                    animate={{
                      y: [0, -10, 0],
                      textShadow: [
                        '0 0 50px rgba(0, 229, 255, 0.8), 0 0 100px rgba(0, 255, 136, 0.6)',
                        '0 0 60px rgba(0, 255, 136, 1), 0 0 120px rgba(255, 255, 255, 0.8)',
                        '0 0 50px rgba(0, 229, 255, 0.8), 0 0 100px rgba(0, 255, 136, 0.6)'
                      ]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    FARMPOLY 3D
                  </motion.span>
                </motion.h1>
                
                {/* Subtitle with Shine Animation */}
                <motion.h2
                  className="h2 text-white mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8, duration: 1 }}
                  style={{
                    textShadow: '0 0 20px rgba(255, 255, 255, 0.5)',
                    fontSize: 'clamp(1.2rem, 3vw, 2rem)'
                  }}
                >
                  <motion.span
                    animate={{
                      backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear"
                    }}
                    style={{
                      background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
                      backgroundSize: '200% 100%',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      backgroundClip: 'text'
                    }}
                  >
                    Explore Smart Farming Through NASA’s Eyes
                  </motion.span>
                </motion.h2>
              </div>
            </motion.div>

                {/* Interactive Elements Section (Centered) */}
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.8 }}
                  className="d-flex justify-content-center pb-5"
                >
                  <div className="container-fluid px-4">
                    <div className="row justify-content-center">
                      <div className="col-lg-8 col-xl-6">
                        
                        {/* Tutorial Button */}
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 1.7, duration: 0.6 }}
                          className="text-center mb-4"
                        >
                          <motion.button
                            onClick={handleShowTutorial}
                            className="btn btn-outline-info btn-lg px-4 py-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{
                              background: 'rgba(56, 189, 248, 0.1)',
                              border: '2px solid rgba(56, 189, 248, 0.6)',
                              color: '#38bdf8',
                              backdropFilter: 'blur(10px)',
                              borderRadius: '25px'
                            }}
                          >
                            <i className="fas fa-graduation-cap me-2"></i>
                            View Game Guide
                          </motion.button>
                        </motion.div>
                    
                    {/* Player Input Form */}
                    <motion.div
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.8, duration: 0.8 }}
                      className="mb-4"
                    >
                      <div className="row g-4">
                        {/* Player 1 Input */}
                        <div className="col-md-6">
                          <motion.div
                            className="position-relative"
                            whileHover={{ scale: 1.02 }}
                            onHoverStart={handleInputHover}
                          >
                            <label className="form-label text-white fw-bold mb-3 d-flex align-items-center">
                              <i className="fas fa-user-astronaut me-2 text-success"></i>
                              Player 1 Name:
                            </label>
                            <input
                              type="text"
                              value={player1Name}
                              onChange={(e) => setPlayer1Name(e.target.value)}
                              placeholder="Enter Player 1 name..."
                              className="form-control form-control-lg player-input"
                              style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                border: '2px solid rgba(76, 175, 80, 0.6)',
                                borderRadius: '15px',
                                color: 'white',
                                backdropFilter: 'blur(15px)',
                                boxShadow: '0 0 25px rgba(76, 175, 80, 0.4)',
                                transition: 'all 0.3s ease'
                              }}
                              onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 40px rgba(76, 175, 80, 0.8)';
                                e.target.style.borderColor = 'rgba(76, 175, 80, 1)';
                              }}
                              onBlur={(e) => {
                                e.target.style.boxShadow = '0 0 25px rgba(76, 175, 80, 0.4)';
                                e.target.style.borderColor = 'rgba(76, 175, 80, 0.6)';
                              }}
                            />
                          </motion.div>
                        </div>

                        {/* Player 2 Input */}
                        <div className="col-md-6">
                          <motion.div
                            className="position-relative"
                            whileHover={{ scale: 1.02 }}
                            onHoverStart={handleInputHover}
                          >
                            <label className="form-label text-white fw-bold mb-3 d-flex align-items-center">
                              <i className="fas fa-user-astronaut me-2 text-primary"></i>
                              Player 2 Name:
                            </label>
                            <input
                              type="text"
                              value={player2Name}
                              onChange={(e) => setPlayer2Name(e.target.value)}
                              placeholder="Enter Player 2 name..."
                              className="form-control form-control-lg player-input"
                              style={{
                                background: 'rgba(255, 255, 255, 0.15)',
                                border: '2px solid rgba(147, 51, 234, 0.6)',
                                borderRadius: '15px',
                                color: 'white',
                                backdropFilter: 'blur(15px)',
                                boxShadow: '0 0 25px rgba(147, 51, 234, 0.4)',
                                transition: 'all 0.3s ease'
                              }}
                              onFocus={(e) => {
                                e.target.style.boxShadow = '0 0 40px rgba(147, 51, 234, 0.8)';
                                e.target.style.borderColor = 'rgba(147, 51, 234, 1)';
                              }}
                              onBlur={(e) => {
                                e.target.style.boxShadow = '0 0 25px rgba(147, 51, 234, 0.4)';
                                e.target.style.borderColor = 'rgba(147, 51, 234, 0.6)';
                              }}
                            />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>

                    {/* Start Button */}
                    <motion.div
                      className="text-center mb-5"
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 2.1, duration: 0.8, type: "spring" }}
                    >
                      <motion.button
                        className={`btn btn-lg px-6 py-4 fw-bold position-relative ${
                          player1Name.trim() && player2Name.trim() 
                            ? 'btn-success' 
                            : 'btn-secondary'
                        }`}
                        onClick={handleStartGame}
                        disabled={!player1Name.trim() || !player2Name.trim()}
                        whileHover={player1Name.trim() && player2Name.trim() ? { 
                          scale: 1.08,
                          boxShadow: '0 0 50px rgba(0, 255, 136, 0.8)'
                        } : {}}
                        whileTap={player1Name.trim() && player2Name.trim() ? { scale: 0.95 } : {}}
                        style={{
                          fontSize: '1.4rem',
                          borderRadius: '25px',
                          border: 'none',
                          background: player1Name.trim() && player2Name.trim() 
                            ? 'linear-gradient(45deg, #00FF88, #00E5FF, #FFD700)' 
                            : '#6c757d',
                          boxShadow: player1Name.trim() && player2Name.trim() 
                            ? '0 0 40px rgba(0, 255, 136, 0.6), 0 0 80px rgba(0, 229, 255, 0.4)' 
                            : 'none',
                          transition: 'all 0.3s ease',
                          transform: 'translateZ(0)',
                          perspective: '1000px'
                        }}
                      >
                        <motion.span
                          animate={player1Name.trim() && player2Name.trim() ? {
                            textShadow: [
                              '0 0 10px rgba(255, 255, 255, 0.8)',
                              '0 0 20px rgba(0, 255, 136, 1)',
                              '0 0 10px rgba(255, 255, 255, 0.8)'
                            ]
                          } : {}}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <i className="fas fa-rocket me-3"></i>
                          {showAnimation ? '🚀 Launching Mission...' : '🎮 Start Mission!'}
                        </motion.span>
                      </motion.button>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* How to Play Section (Floating Card - Bottom) */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 2.4, duration: 0.8 }}
              className="d-flex justify-content-center pb-4"
            >
              <div className="card border-0" style={{
                background: 'rgba(255, 255, 255, 0.12)',
                backdropFilter: 'blur(20px)',
                borderRadius: '25px',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                boxShadow: '0 12px 40px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
                maxWidth: '600px',
                width: '90%'
              }}>
                <div className="card-body p-4">
                  <h5 className="card-title text-white fw-bold mb-4 d-flex align-items-center justify-content-center">
                    <span className="me-3">ℹ️</span>
                    Mission Briefing
                  </h5>
                  <div className="row g-3">
                        {[
                          { icon: '🎲', text: 'Roll dice & answer NASA questions' },
                          { icon: '🚶', text: 'Move forward if correct, stay if wrong' },
                          { icon: '💰', text: 'Earn eco-coins from events & challenges' },
                          { icon: '🏆', text: 'Complete 10 turns to win!' }
                        ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="col-md-6 d-flex align-items-center"
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 2.7 + index * 0.15, duration: 0.6 }}
                      >
                        <motion.span 
                          className="me-3" 
                          style={{ fontSize: '1.8rem' }}
                          animate={{
                            scale: [1, 1.1, 1],
                            rotate: [0, 5, -5, 0]
                          }}
                          transition={{
                            duration: 2,
                            repeat: Infinity,
                            delay: index * 0.3
                          }}
                        >
                          {item.icon}
                        </motion.span>
                        <span className="text-white-50 small fw-medium">{item.text}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

          {/* Tutorial Card */}
          <AnimatePresence>
            {showTutorial && (
              <TutorialCard onComplete={handleTutorialComplete} />
            )}
          </AnimatePresence>

          {/* Launch Transition Overlay */}
          <AnimatePresence>
            {isLaunching && (
              <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
            style={{
              background: 'radial-gradient(circle, rgba(0, 229, 255, 0.3) 0%, rgba(0, 31, 63, 0.9) 70%)',
              zIndex: 1000
            }}
          >
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 2, opacity: 0 }}
              className="text-center text-white"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                style={{ fontSize: '5rem', marginBottom: '1.5rem' }}
              >
                🚀
              </motion.div>
              <h1 className="fw-bold mb-3" style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}>
                Launching Mission...
              </h1>
              <p className="text-white-50 fs-5">Preparing 3D farming simulation</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default HomePage;
