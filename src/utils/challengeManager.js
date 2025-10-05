import challenges from '../data/challenges.json';

export const checkForChallenges = (gameState, playerId) => {
  const player = gameState.players[playerId];
  const availableChallenges = [];

  challenges.forEach(challenge => {
    let shouldTrigger = false;

    switch (challenge.condition) {
      case 'high_score':
        shouldTrigger = player.ecoCoins >= challenge.trigger;
        break;
      
      case 'low_score':
        shouldTrigger = player.ecoCoins <= challenge.trigger;
        break;
      
      case 'consecutive_correct':
        shouldTrigger = gameState.consecutiveCorrect >= challenge.trigger;
        break;
      
      case 'turn_number':
        shouldTrigger = gameState.turnCount >= challenge.trigger;
        break;
      
      case 'high_efficiency':
        const efficiency = gameState.totalQuestions > 0 ? 
          (gameState.totalCorrectAnswers / gameState.totalQuestions) * 100 : 0;
        shouldTrigger = efficiency >= challenge.trigger;
        break;
      
      case 'exact_position':
        shouldTrigger = player.position === challenge.trigger;
        break;
      
      case 'random':
        shouldTrigger = Math.random() < challenge.trigger;
        break;
      
      case 'special_event':
        // Special events like eclipses, etc.
        shouldTrigger = Math.random() < 0.1; // 10% chance for special events
        break;
      
      default:
        shouldTrigger = false;
    }

    if (shouldTrigger) {
      availableChallenges.push(challenge);
    }
  });

  // Return a random challenge if multiple are available
  return availableChallenges.length > 0 ? 
    availableChallenges[Math.floor(Math.random() * availableChallenges.length)] : 
    null;
};

export const getChallengeMessage = (challenge, playerName) => {
  const messages = {
    bonus: `🎉 Congratulations ${playerName}! You've earned a bonus!`,
    challenge: `⚠️ ${playerName}, you've encountered a challenge!`,
    special: `🌟 Special event for ${playerName}!`
  };
  
  return messages[challenge.type] || `🎯 Challenge for ${playerName}!`;
};

export const calculateChallengeReward = (challenge, isCorrect = true) => {
  if (challenge.type === 'special') {
    return isCorrect ? 20 : -10;
  }
  return challenge.reward;
};
