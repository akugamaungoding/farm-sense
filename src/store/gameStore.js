import { create } from 'zustand';

export const useGameStore = create((set, get) => ({
  // Player data
  players: {
    player1: { name: '', ecoCoins: 100, position: 0, color: '#4CAF50' },
    player2: { name: '', ecoCoins: 100, position: 0, color: '#03A9F4' }
  },
  
  // Game state
  currentPlayer: 'player1',
  gameStarted: false,
  gameEnded: false,
  turnCount: 0,
  maxTurns: 10, // 10 turns per player = 20 total turns
  
  // Board data
  boardTiles: [],
  events: [],
  
  // UI state
  showEventPopup: false,
  currentEvent: null,
  diceRoll: 0,
  isRolling: false,
  showQuestion: false,
  currentQuestion: null,
  showChallenge: false,
  currentChallenge: null,
  
  // Challenge tracking
  consecutiveCorrect: 0,
  totalCorrectAnswers: 0,
  totalQuestions: 0,
  
  // Actions
  setPlayerNames: (player1Name, player2Name) => set({
    players: {
      player1: { ...get().players.player1, name: player1Name },
      player2: { ...get().players.player2, name: player2Name }
    },
    gameStarted: true
  }),
  
  rollDice: () => {
    const diceRoll = Math.floor(Math.random() * 6) + 1;
    set({ diceRoll, isRolling: true });
    
    // Stop rolling animation after a delay
    setTimeout(() => {
      set({ isRolling: false });
    }, 1500);
    
    return diceRoll;
  },
  
  movePlayer: (playerId, steps) => {
    const player = get().players[playerId];
    const newPosition = (player.position + steps) % 12; // 12 tiles on board
    
    set({
      players: {
        ...get().players,
        [playerId]: { ...player, position: newPosition }
      }
    });
    
    return newPosition;
  },
  
  updateEcoCoins: (playerId, amount) => {
    const player = get().players[playerId];
    const newCoins = Math.max(0, player.ecoCoins + amount);
    
    set({
      players: {
        ...get().players,
        [playerId]: { ...player, ecoCoins: newCoins }
      }
    });
  },
  
  nextTurn: () => {
    const current = get().currentPlayer;
    const newPlayer = current === 'player1' ? 'player2' : 'player1';
    const newTurnCount = get().turnCount + 1;
    
    set({
      currentPlayer: newPlayer,
      turnCount: newTurnCount,
      gameEnded: newTurnCount >= get().maxTurns * 2
    });
  },
  
  showEvent: (event) => set({
    showEventPopup: true,
    currentEvent: event
  }),
  
  hideEvent: () => set({
    showEventPopup: false,
    currentEvent: null
  }),
  
  showQuestionCard: (question) => set({
    showQuestion: true,
    currentQuestion: question
  }),
  
  hideQuestion: () => set({
    showQuestion: false,
    currentQuestion: null
  }),
  
  showChallengeCard: (challenge) => set({
    showChallenge: true,
    currentChallenge: challenge
  }),
  
  hideChallenge: () => set({
    showChallenge: false,
    currentChallenge: null
  }),
  
  updateQuestionStats: (isCorrect) => {
    const state = get();
    const newTotalQuestions = state.totalQuestions + 1;
    const newTotalCorrect = isCorrect ? state.totalCorrectAnswers + 1 : state.totalCorrectAnswers;
    const newConsecutive = isCorrect ? state.consecutiveCorrect + 1 : 0;
    
    set({
      totalQuestions: newTotalQuestions,
      totalCorrectAnswers: newTotalCorrect,
      consecutiveCorrect: newConsecutive
    });
  },
  
  resetGame: () => set({
    players: {
      player1: { name: '', ecoCoins: 100, position: 0, color: '#4CAF50' },
      player2: { name: '', ecoCoins: 100, position: 0, color: '#03A9F4' }
    },
    currentPlayer: 'player1',
    gameStarted: false,
    gameEnded: false,
    turnCount: 0,
    showEventPopup: false,
    currentEvent: null,
    diceRoll: 0,
    isRolling: false,
    showQuestion: false,
    currentQuestion: null,
    showChallenge: false,
    currentChallenge: null,
    consecutiveCorrect: 0,
    totalCorrectAnswers: 0,
    totalQuestions: 0
  }),
  
  getWinner: () => {
    const { player1, player2 } = get().players;
    if (player1.ecoCoins > player2.ecoCoins) return 'player1';
    if (player2.ecoCoins > player1.ecoCoins) return 'player2';
    return 'tie';
  }
}));
