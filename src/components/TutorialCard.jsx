import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TutorialCard({ onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTutorial, setShowTutorial] = useState(true);

  const tutorialSteps = [
    {
      title: "🌾 Welcome to FARMPOLY 3D!",
      content: "An educational game about sustainable farming using NASA data. You'll learn about agricultural monitoring from space!",
      icon: "🚀"
    },
    {
      title: "🎲 How to Play",
      content: "1. Roll dice to get a number\n2. Answer NASA questions (True/False)\n3. If correct: move forward to next tile\n4. If wrong: stay on current tile",
      icon: "🎯"
    },
    {
      title: "🌍 NASA Events",
      content: "Each tile has agricultural events based on NASA data like:\n• Drought Detection\n• Perfect Rainfall\n• Vegetation Boost\n• Extreme Heat Events",
      icon: "🛰️"
    },
    {
      title: "💰 Eco-Coins System",
      content: "Earn eco-coins from:\n• Correct answers to questions\n• Positive events (rain, harvest, etc.)\n• Challenge bonuses\n• Streak rewards\n\nLose coins from negative events!",
      icon: "💎"
    },
    {
      title: "🏆 Challenges & Streaks",
      content: "• Streak: Consecutive correct answers\n• Challenge: Special rewards for good performance\n• Accuracy: Percentage of correct answers\n\nBetter performance = More rewards!",
      icon: "⭐"
    },
    {
      title: "🎮 Game Objectives",
      content: "• Learn about sustainable farming\n• Understand NASA data for agriculture\n• Become the best digital farmer\n• Collect the most eco-coins in 10 turns!",
      icon: "🏅"
    },
    {
      title: "🚀 Ready to Start?",
      content: "Now you understand how to play!\n\nEnter both player names and begin your space farming adventure!",
      icon: "🌟"
    }
  ];

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowTutorial(false);
      onComplete();
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const skipTutorial = () => {
    setShowTutorial(false);
    onComplete();
  };

  if (!showTutorial) return null;

  const currentTutorial = tutorialSteps[currentStep];
  const progress = ((currentStep + 1) / tutorialSteps.length) * 100;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 9999 }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="card shadow-lg border-0"
        style={{ 
          maxWidth: '700px', 
          width: '90%',
          background: 'linear-gradient(135deg, rgba(0, 31, 63, 0.95) 0%, rgba(0, 18, 32, 0.95) 100%)',
          backdropFilter: 'blur(20px)',
          border: '2px solid rgba(0, 255, 153, 0.3)'
        }}
      >
        {/* Header */}
        <div 
          className="card-header text-center py-4 border-0"
          style={{ background: 'rgba(0, 255, 153, 0.1)' }}
        >
          <div className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-white-50">Tutorial</span>
            <button
              onClick={skipTutorial}
              className="btn btn-sm btn-outline-light"
              style={{ fontSize: '0.8rem' }}
            >
              Skip Tutorial
            </button>
          </div>
          
          {/* Progress Bar */}
          <div className="progress mb-3" style={{ height: '6px', background: 'rgba(255,255,255,0.1)' }}>
            <motion.div
              className="progress-bar"
              style={{
                background: 'linear-gradient(90deg, #00ff99, #38bdf8)',
                boxShadow: '0 0 10px rgba(0, 255, 153, 0.5)'
              }}
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          
          <h3 className="text-white fw-bold mb-0">
            <span className="me-3" style={{ fontSize: '2rem' }}>{currentTutorial.icon}</span>
            {currentTutorial.title}
          </h3>
          <p className="text-white-50 mb-0 mt-2">
            Step {currentStep + 1} of {tutorialSteps.length}
          </p>
        </div>
        
        {/* Content */}
        <div className="card-body p-5">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              style={{ minHeight: '200px' }}
            >
              <div className="text-white" style={{ whiteSpace: 'pre-line', lineHeight: '1.6' }}>
                {currentTutorial.content}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        
        {/* Footer */}
        <div 
          className="card-footer border-0 py-3"
          style={{ background: 'rgba(0, 255, 153, 0.05)' }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <button
              onClick={prevStep}
              disabled={currentStep === 0}
              className={`btn ${currentStep === 0 ? 'btn-secondary' : 'btn-outline-primary'}`}
            >
              <i className="fas fa-arrow-left me-2"></i>
              Previous
            </button>
            
            <div className="text-center">
              <small className="text-white-50">
                {currentStep === tutorialSteps.length - 1 ? 'Complete!' : 'Continue to next step'}
              </small>
            </div>
            
            <button
              onClick={nextStep}
              className={`btn ${
                currentStep === tutorialSteps.length - 1 
                  ? 'btn-success' 
                  : 'btn-primary'
              }`}
            >
              {currentStep === tutorialSteps.length - 1 ? (
                <>
                  <i className="fas fa-rocket me-2"></i>
                  Start Game!
                </>
              ) : (
                <>
                  Next
                  <i className="fas fa-arrow-right ms-2"></i>
                </>
              )}
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
