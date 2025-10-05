import React, { useState } from 'react';
import { motion } from 'framer-motion';

export default function QuestionCard({ question, onAnswer, playerName }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleAnswer = (answer) => {
    setSelectedAnswer(answer);
    setShowResult(true);
    
    // Show result for 3 seconds then call onAnswer
    setTimeout(() => {
      onAnswer(answer === question.answer);
    }, 3000);
  };

  const isCorrect = selectedAnswer === question.answer;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      className="position-fixed top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999 }}
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="card shadow-lg border-0"
        style={{ maxWidth: '600px', width: '90%' }}
      >
        <div className={`card-header text-center py-4 ${isCorrect !== null ? (isCorrect ? 'bg-success' : 'bg-info') : 'bg-primary'} text-white`}>
          <h2 className="card-title mb-0">
            <i className="fas fa-rocket me-2"></i>
            NASA Knowledge Challenge
          </h2>
          <p className="mb-0 mt-2">{playerName}'s Turn</p>
        </div>
        
        <div className="card-body p-5">
          <div className="text-center mb-4">
            <i className="fas fa-satellite-dish text-primary" style={{ fontSize: '3rem' }}></i>
          </div>
          
          <h4 className="card-text text-center mb-3 fw-bold">
            {question.question}
          </h4>
          
          {/* Source Information */}
          <div className="text-center mb-4">
            <small className="text-muted">
              <i className="fas fa-info-circle me-1"></i>
              Source: {question.source}
            </small>
          </div>
          
          {!showResult ? (
            <div className="row g-3">
              <div className="col-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(true)}
                  className="btn btn-success btn-lg w-100 py-4"
                  style={{ fontSize: '1.2rem' }}
                >
                  <i className="fas fa-check me-2"></i>
                  TRUE
                </motion.button>
              </div>
              <div className="col-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleAnswer(false)}
                  className="btn btn-danger btn-lg w-100 py-4"
                  style={{ fontSize: '1.2rem' }}
                >
                  <i className="fas fa-times me-2"></i>
                  FALSE
                </motion.button>
              </div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center"
            >
              <div className={`alert ${isCorrect ? 'alert-success' : 'alert-danger'} d-flex align-items-center justify-content-center mb-4`}>
                <i className={`fas ${isCorrect ? 'fa-check-circle' : 'fa-times-circle'} me-2`} style={{ fontSize: '2rem' }}></i>
                <h4 className="mb-0">
                  {isCorrect ? 'Correct!' : 'Incorrect!'}
                </h4>
              </div>
              
              <div className="alert alert-info">
                <h6 className="alert-heading">
                  <i className="fas fa-lightbulb me-2"></i>
                  Explanation:
                </h6>
                <p className="mb-0">{question.explanation}</p>
              </div>
              
              <div className="mt-4">
                <div className="spinner-border text-primary me-2" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
                <span className="text-muted">
                  {isCorrect ? 'Moving forward...' : 'Staying in place...'}
                </span>
              </div>
            </motion.div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
