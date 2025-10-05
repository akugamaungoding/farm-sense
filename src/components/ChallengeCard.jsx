import React from 'react';
import { motion } from 'framer-motion';

export default function ChallengeCard({ challenge, onComplete, playerName, isSpecial = false }) {
  const isBonus = challenge.type === 'bonus';
  const isChallenge = challenge.type === 'challenge';
  const isSpecialChallenge = challenge.type === 'special';

  const handleComplete = () => {
    onComplete(challenge);
  };

  const getCardStyle = () => {
    if (isBonus) return 'border-success bg-success-subtle';
    if (isChallenge) return 'border-danger bg-danger-subtle';
    if (isSpecialChallenge) return 'border-warning bg-warning-subtle';
    return 'border-primary bg-primary-subtle';
  };

  const getHeaderStyle = () => {
    if (isBonus) return 'bg-success text-white';
    if (isChallenge) return 'bg-danger text-white';
    if (isSpecialChallenge) return 'bg-warning text-dark';
    return 'bg-primary text-white';
  };

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
        className={`card shadow-lg border-3 ${getCardStyle()}`}
        style={{ maxWidth: '600px', width: '90%' }}
      >
        <div className={`card-header text-center py-4 ${getHeaderStyle()}`}>
          <h2 className="card-title mb-2">
            <span className="me-2" style={{ fontSize: '2rem' }}>{challenge.icon}</span>
            {challenge.title}
          </h2>
          <p className="mb-0 fw-bold">{playerName}'s Challenge</p>
        </div>
        
        <div className="card-body p-5 text-center">
          <div className="mb-4">
            <span className="display-1">{challenge.icon}</span>
          </div>
          
          <h4 className="card-text mb-4 fw-bold text-dark">
            {challenge.description}
          </h4>
          
          <div className="alert alert-info mb-4">
            <h6 className="alert-heading">
              <i className="fas fa-info-circle me-2"></i>
              Challenge Details:
            </h6>
            <p className="mb-0">{challenge.message}</p>
          </div>

          {/* Special Question for Special Challenges */}
          {isSpecialChallenge && challenge.specialQuestion && (
            <div className="alert alert-warning mb-4">
              <h6 className="alert-heading">
                <i className="fas fa-question-circle me-2"></i>
                Special Question:
              </h6>
              <p className="mb-3 fw-bold">{challenge.specialQuestion}</p>
              <div className="row g-2">
                <div className="col-6">
                  <button className="btn btn-success w-100" onClick={() => handleComplete()}>
                    <i className="fas fa-check me-2"></i>
                    TRUE
                  </button>
                </div>
                <div className="col-6">
                  <button className="btn btn-danger w-100" onClick={() => handleComplete()}>
                    <i className="fas fa-times me-2"></i>
                    FALSE
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Reward/Penalty Display */}
          {!isSpecialChallenge && (
            <div className={`alert ${isBonus ? 'alert-success' : 'alert-danger'} mb-4`}>
              <h6 className="alert-heading">
                <i className={`fas ${isBonus ? 'fa-gift' : 'fa-exclamation-triangle'} me-2`}></i>
                {isBonus ? 'Reward' : 'Penalty'}:
              </h6>
              <p className="mb-0 fw-bold fs-5">
                {challenge.reward > 0 ? '+' : ''}{challenge.reward} eco-coins
              </p>
            </div>
          )}

          {/* Complete Button */}
          {!isSpecialChallenge && (
            <motion.button
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              onClick={handleComplete}
              className={`btn btn-lg px-5 py-3 fw-bold ${
                isBonus ? 'btn-success' : 'btn-danger'
              }`}
              style={{ fontSize: '1.2rem' }}
            >
              <i className={`fas ${isBonus ? 'fa-gift' : 'fa-exclamation-triangle'} me-2`}></i>
              {isBonus ? 'Claim Reward!' : 'Accept Penalty'}
            </motion.button>
          )}

          {/* Animated particles for bonus challenges */}
          {isBonus && (
            <div className="position-absolute top-0 start-0 w-100 h-100 overflow-hidden" style={{ pointerEvents: 'none' }}>
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ 
                    x: '50%', 
                    y: '50%', 
                    scale: 0,
                    opacity: 1 
                  }}
                  animate={{ 
                    x: `${50 + (Math.random() - 0.5) * 300}%`, 
                    y: `${50 + (Math.random() - 0.5) * 300}%`, 
                    scale: [0, 1, 0],
                    opacity: [1, 1, 0]
                  }}
                  transition={{ 
                    duration: 2,
                    delay: i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 4
                  }}
                  className="position-absolute text-2xl"
                >
                  ✨
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}
