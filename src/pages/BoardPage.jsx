import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore } from '../store/gameStore';
import Immersive3DBoard from '../components/Immersive3DBoard';
import PlayerPanels from '../components/PlayerPanels';
import ControlPanel from '../components/ControlPanel';
import GameHUD from '../components/GameHUD';
import PopupEvent from '../components/PopupEvent';
import QuestionCard from '../components/QuestionCard';
import ChallengeCard from '../components/ChallengeCard';
import { checkForChallenges, calculateChallengeReward } from '../utils/challengeManager';
import nasaEvents from '../data/nasaEvents.json';
import nasaQuestions from '../data/nasaQuestions.json';

export default function BoardPage() {
  const navigate = useNavigate();
  const {
    players,
    currentPlayer,
    gameStarted,
    gameEnded,
    turnCount,
    maxTurns,
    showEventPopup,
    currentEvent,
    diceRoll,
    isRolling,
    showQuestion,
    currentQuestion,
    showChallenge,
    currentChallenge,
    consecutiveCorrect,
    totalCorrectAnswers,
    totalQuestions,
    rollDice,
    movePlayer,
    updateEcoCoins,
    nextTurn,
    showEvent,
    hideEvent,
    showQuestionCard,
    hideQuestion,
    showChallengeCard,
    hideChallenge,
    updateQuestionStats,
    getWinner
  } = useGameStore();

  const [highlightedTile, setHighlightedTile] = useState(null);
  const [gameLog, setGameLog] = useState([]);

  // Redirect if game not started
  useEffect(() => {
    if (!gameStarted) {
      navigate('/');
    }
  }, [gameStarted, navigate]);

  // Check for game end
  useEffect(() => {
    if (gameEnded) {
      navigate('/endgame');
    }
  }, [gameEnded, navigate]);

  // Create board tiles with events
  const boardTiles = nasaEvents.slice(0, 12);

  const handleDiceRoll = () => {
    const rolledValue = rollDice();
    const playerData = players[currentPlayer];
    
    // Add to game log
    setGameLog(prev => [...prev, {
      id: Date.now(),
      message: `${playerData.name} rolled a ${rolledValue}!`,
      type: 'roll'
    }]);

    // Show question after rolling animation
    setTimeout(() => {
      const randomQuestion = nasaQuestions[Math.floor(Math.random() * nasaQuestions.length)];
      showQuestionCard(randomQuestion);
    }, 1500);
  };

  const handleQuestionAnswer = (isCorrect) => {
    const playerData = players[currentPlayer];
    const rolledValue = diceRoll;
    
    // Update question statistics
    updateQuestionStats(isCorrect);
    
    if (isCorrect) {
      // Move player if answer is correct
      const newPosition = movePlayer(currentPlayer, rolledValue);
      setHighlightedTile(newPosition);
      
      // Add to game log
      setGameLog(prev => [...prev, {
        id: Date.now(),
        message: `${playerData.name} answered correctly and moved ${rolledValue} spaces!`,
        type: 'positive'
      }]);
      
      // Check for challenges after correct answer
      setTimeout(() => {
        const gameState = {
          players,
          currentPlayer,
          turnCount,
          consecutiveCorrect,
          totalCorrectAnswers,
          totalQuestions: totalQuestions + 1
        };
        
        const challenge = checkForChallenges(gameState, currentPlayer);
        if (challenge) {
          showChallengeCard(challenge);
          return;
        }
        
        // Trigger event after movement if no challenge
        const event = boardTiles[newPosition];
        if (event) {
          updateEcoCoins(currentPlayer, event.effect);
          showEvent(event);
          
          // Add event to log
          setGameLog(prev => [...prev, {
            id: Date.now(),
            message: `${playerData.name} landed on ${event.title} (${event.effect > 0 ? '+' : ''}${event.effect} coins)`,
            type: event.effect > 0 ? 'positive' : 'negative'
          }]);
        }
        
        // Clear highlight and move to next turn
        setTimeout(() => {
          setHighlightedTile(null);
          nextTurn();
        }, 3000);
      }, 1000);
    } else {
      // Stay in place if answer is wrong
      setGameLog(prev => [...prev, {
        id: Date.now(),
        message: `${playerData.name} answered incorrectly and stays in place!`,
        type: 'negative'
      }]);
      
      // Move to next turn after a short delay
      setTimeout(() => {
        nextTurn();
      }, 2000);
    }
    
    hideQuestion();
  };

  const handleEventClose = () => {
    hideEvent();
  };

  const handleChallengeComplete = (challenge, isCorrect = true) => {
    const playerData = players[currentPlayer];
    const reward = calculateChallengeReward(challenge, isCorrect);
    
    // Apply challenge reward/penalty
    updateEcoCoins(currentPlayer, reward);
    
    // Add to game log
    setGameLog(prev => [...prev, {
      id: Date.now(),
      message: `${playerData.name} completed "${challenge.title}" (${reward > 0 ? '+' : ''}${reward} coins)`,
      type: reward > 0 ? 'positive' : 'negative'
    }]);
    
    // If it was a special challenge, continue with normal event flow
    if (challenge.type === 'special') {
      const newPosition = players[currentPlayer].position;
      const event = boardTiles[newPosition];
      
      setTimeout(() => {
        if (event) {
          updateEcoCoins(currentPlayer, event.effect);
          showEvent(event);
          
          setGameLog(prev => [...prev, {
            id: Date.now(),
            message: `${playerData.name} landed on ${event.title} (${event.effect > 0 ? '+' : ''}${event.effect} coins)`,
            type: event.effect > 0 ? 'positive' : 'negative'
          }]);
        }
        
        setTimeout(() => {
          setHighlightedTile(null);
          nextTurn();
        }, 3000);
      }, 1000);
    } else {
      // For regular challenges, just move to next turn
      setTimeout(() => {
        nextTurn();
      }, 2000);
    }
    
    hideChallenge();
  };

  if (!gameStarted) {
    return null;
  }

  return (
    <div 
      className="min-vh-100 position-relative overflow-hidden"
      style={{ 
        background: 'linear-gradient(135deg, #001220 0%, #012a4a 50%, #013a63 100%)'
      }}
    >
      {/* Immersive 3D Board Background */}
      <div className="position-absolute top-0 start-0 w-100 h-100" style={{ zIndex: 1 }}>
        <Immersive3DBoard
          tiles={boardTiles}
          players={players}
          currentPlayer={currentPlayer}
          highlightedTile={highlightedTile}
        />
      </div>

      {/* Glassmorphic UI Overlay */}
      <div className="position-relative" style={{ zIndex: 10 }}>
        {/* Player Panels (Left) */}
        <PlayerPanels
          players={players}
          currentPlayer={currentPlayer}
          turnCount={turnCount}
          maxTurns={maxTurns}
          consecutiveCorrect={consecutiveCorrect}
          totalCorrectAnswers={totalCorrectAnswers}
          totalQuestions={totalQuestions}
        />

        {/* Control Panel (Right) */}
        <ControlPanel
          diceRoll={diceRoll}
          isRolling={isRolling}
          onRoll={handleDiceRoll}
          gameLog={gameLog}
        />

        {/* Bottom HUD */}
        <GameHUD
          turnCount={turnCount}
          maxTurns={maxTurns}
          currentPlayer={currentPlayer}
          players={players}
        />
      </div>

      {/* Popup Modals */}
      <AnimatePresence>
        {showQuestion && (
          <QuestionCard
            question={currentQuestion}
            onAnswer={handleQuestionAnswer}
            playerName={players[currentPlayer].name}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showChallenge && (
          <ChallengeCard
            challenge={currentChallenge}
            onComplete={handleChallengeComplete}
            playerName={players[currentPlayer].name}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showEventPopup && (
          <PopupEvent
            event={currentEvent}
            onClose={handleEventClose}
            playerName={players[currentPlayer].name}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
