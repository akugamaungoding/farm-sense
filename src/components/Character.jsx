import React from 'react';
import { motion } from 'framer-motion';

const Character = ({ character, isTalking = false, size = 'normal' }) => {
  const getCharacterData = () => {
    switch (character) {
      case 'astro':
        return {
          emoji: '👨‍🚀',
          name: 'Astro',
          color: 'from-blue-400 to-blue-600'
        };
      case 'cosmo':
        return {
          emoji: '🤖',
          name: 'Cosmo',
          color: 'from-purple-400 to-purple-600'
        };
      case 'stella':
        return {
          emoji: '⭐',
          name: 'Stella',
          color: 'from-yellow-400 to-orange-500'
        };
      case 'terra':
        return {
          emoji: '🌍',
          name: 'Terra',
          color: 'from-green-400 to-green-600'
        };
      default:
        return {
          emoji: '👨‍🚀',
          name: 'Astro',
          color: 'from-blue-400 to-blue-600'
        };
    }
  };

  const characterData = getCharacterData();
  const sizeClasses = {
    small: 'w-16 h-16 text-2xl',
    normal: 'w-24 h-24 text-4xl',
    large: 'w-32 h-32 text-6xl'
  };

  return (
    <motion.div
      className={`${sizeClasses[size]} bg-gradient-to-br ${characterData.color} rounded-full flex items-center justify-center shadow-lg relative`}
      animate={isTalking ? {
        scale: [1, 1.1, 1],
        rotate: [0, 5, -5, 0]
      } : {}}
      transition={{
        duration: 1,
        repeat: isTalking ? Infinity : 0,
        ease: "easeInOut"
      }}
    >
      <span className="drop-shadow-lg">{characterData.emoji}</span>
      
      {/* Speech bubble for talking */}
      {isTalking && (
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center"
        >
          <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default Character;
