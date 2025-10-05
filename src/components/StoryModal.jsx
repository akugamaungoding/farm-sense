import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const StoryModal = ({ isOpen, chapter, onActionClick, onClose }) => {
  if (!isOpen || !chapter) return null;

  const character = chapter.character;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        >
          <motion.div
            initial={{ scale: 0.8, y: 50 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.8, y: 50 }}
            className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden"
          >
            {/* Character Header */}
            <div className={`bg-gradient-to-r ${
              character === 'astro' ? 'from-blue-400 to-blue-600' :
              character === 'cosmo' ? 'from-purple-400 to-purple-600' :
              character === 'stella' ? 'from-yellow-400 to-orange-500' :
              'from-green-400 to-green-600'
            } text-white p-6 text-center`}>
              <motion.div
                className="text-8xl mb-2"
                animate={{ 
                  rotate: [0, 5, -5, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                {character === 'astro' ? '👨‍🚀' :
                 character === 'cosmo' ? '🤖' :
                 character === 'stella' ? '⭐' :
                 '🌍'}
              </motion.div>
              <h2 className="text-2xl font-bold mb-2">
                {character === 'astro' ? 'Astro the Astronaut' :
                 character === 'cosmo' ? 'Cosmo the Robot' :
                 character === 'stella' ? 'Stella the Star' :
                 'Terra the Earth'}
              </h2>
            </div>

            {/* Story Content */}
            <div className="p-6">
              <h3 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                {chapter.title}
              </h3>
              
              <div className="text-lg text-gray-700 leading-relaxed mb-6 whitespace-pre-line">
                {chapter.story}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3">
                {chapter.actions.map((action, index) => (
                  <motion.button
                    key={index}
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 text-white text-xl font-bold py-4 px-6 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
                    onClick={() => {
                      if (action.startGame) {
                        onActionClick('startGame');
                      } else if (action.nextChapter) {
                        onActionClick('nextChapter', action.nextChapter);
                      } else {
                        onActionClick('action', action);
                      }
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {action.text}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Close button */}
            <div className="absolute top-4 right-4">
              <motion.button
                onClick={onClose}
                className="bg-white bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all duration-300"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                ✕
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StoryModal;
