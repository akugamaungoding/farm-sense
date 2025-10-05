import React from 'react';
import { motion } from 'framer-motion';

export default function PopupEvent({ event, onClose, playerName }) {
  if (!event) return null;

  const isPositive = event.effect > 0;
  const effectColor = isPositive ? 'text-green-600' : 'text-red-600';
  const effectIcon = isPositive ? '💰' : '💸';
  const bgGradient = isPositive 
    ? 'from-green-100 to-emerald-100' 
    : 'from-red-100 to-pink-100';

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.5, opacity: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className={`bg-gradient-to-br ${bgGradient} rounded-3xl shadow-2xl border-4 border-white/50 p-8 max-w-md w-full text-center`}
      >
        {/* Event Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="text-6xl mb-4"
        >
          {event.icon}
        </motion.div>

        {/* Event Title */}
        <motion.h2
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-2xl font-bold text-gray-800 mb-3"
        >
          {event.title}
        </motion.h2>

        {/* Player Name */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-lg text-gray-600 mb-4"
        >
          <span className="font-semibold">{playerName}</span> encountered:
        </motion.div>

        {/* Event Message */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-lg text-gray-700 mb-6 leading-relaxed"
        >
          {event.message}
        </motion.div>

        {/* Effect Display */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          className={`inline-flex items-center space-x-2 px-6 py-3 rounded-full bg-white/80 shadow-lg mb-6`}
        >
          <span className="text-2xl">{effectIcon}</span>
          <span className={`text-xl font-bold ${effectColor}`}>
            {isPositive ? '+' : ''}{event.effect} eco-coins
          </span>
        </motion.div>

        {/* NASA Fact */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="bg-white/60 rounded-xl p-4 mb-6 text-sm text-gray-700"
        >
          <div className="flex items-start space-x-2">
            <span className="text-lg">🛰️</span>
            <div className="text-left">
              <div className="font-bold text-gray-800 mb-1">NASA Fact:</div>
              <div>{event.fact}</div>
            </div>
          </div>
        </motion.div>

        {/* Close Button */}
        <motion.button
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8 }}
          onClick={onClose}
          className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white font-bold rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
        >
          Continue Game 🚀
        </motion.button>

        {/* Animated particles for positive events */}
        {isPositive && (
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ 
                  x: '50%', 
                  y: '50%', 
                  scale: 0,
                  opacity: 1 
                }}
                animate={{ 
                  x: `${50 + (Math.random() - 0.5) * 200}%`, 
                  y: `${50 + (Math.random() - 0.5) * 200}%`, 
                  scale: [0, 1, 0],
                  opacity: [1, 1, 0]
                }}
                transition={{ 
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  repeatDelay: 3
                }}
                className="absolute text-2xl"
              >
                ✨
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
