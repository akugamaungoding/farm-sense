import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Text } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import * as THREE from 'three';

// 3D Dice component
function Dice3D({ value, isRolling, onRoll }) {
  const meshRef = useRef();
  const [displayValue, setDisplayValue] = useState(1);

  useFrame((state) => {
    if (meshRef.current) {
      if (isRolling) {
        // Rolling animation
        meshRef.current.rotation.x += 0.3;
        meshRef.current.rotation.y += 0.4;
        meshRef.current.rotation.z += 0.2;
        
        // Change displayed value during rolling
        setDisplayValue(Math.floor(Math.random() * 6) + 1);
      } else {
        // Settle to final position
        meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, 0, 0.1);
        meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, 0, 0.1);
        meshRef.current.rotation.z = THREE.MathUtils.lerp(meshRef.current.rotation.z, 0, 0.1);
        
        // Show actual value
        setDisplayValue(value);
      }
    }
  });

  // Dice dot patterns
  const getDiceDots = (val) => {
    const dots = [];
    const positions = {
      1: [[0, 0]],
      2: [[-0.3, -0.3], [0.3, 0.3]],
      3: [[-0.3, -0.3], [0, 0], [0.3, 0.3]],
      4: [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0.3], [0.3, 0.3]],
      5: [[-0.3, -0.3], [0.3, -0.3], [0, 0], [-0.3, 0.3], [0.3, 0.3]],
      6: [[-0.3, -0.3], [0.3, -0.3], [-0.3, 0], [0.3, 0], [-0.3, 0.3], [0.3, 0.3]]
    };
    
    return positions[val] || positions[1];
  };

  return (
    <group>
      {/* Main dice cube */}
      <Box
        ref={meshRef}
        args={[1.5, 1.5, 1.5]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color={isRolling ? "#facc15" : "#ffffff"} 
          emissive={isRolling ? "#facc15" : "#00ff99"}
          emissiveIntensity={isRolling ? 0.4 : 0.2}
          roughness={0.1}
          metalness={0.9}
        />
      </Box>
      
      {/* Dots on each face */}
      {getDiceDots(displayValue).map((dot, index) => (
        <Box
          key={index}
          args={[0.2, 0.2, 0.02]}
          position={[dot[0], dot[1], 0.76]}
        >
          <meshStandardMaterial color="#000000" />
        </Box>
      ))}
    </group>
  );
}

// Main control panel component
export default function ControlPanel({ diceRoll, isRolling, onRoll, gameLog }) {
  const [showLog, setShowLog] = useState(false);

  return (
    <div className="position-fixed end-0 top-0 h-100 d-flex flex-column justify-content-center p-4" style={{ zIndex: 20, width: '320px' }}>
      
      {/* 3D Dice */}
      <motion.div
        className="card border-0 mb-4"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '2px solid rgba(250, 204, 21, 0.3)',
          boxShadow: '0 0 30px rgba(250, 204, 21, 0.2)'
        }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="card-body p-4 text-center">
          <h5 className="text-white fw-bold mb-3 d-flex align-items-center justify-content-center">
            <span className="me-2">🎲</span>
            Mission Dice
          </h5>
          
          {/* 3D Dice Canvas */}
          <div style={{ height: '120px', marginBottom: '20px' }}>
            <Canvas camera={{ position: [0, 0, 4], fov: 50 }}>
              <ambientLight intensity={0.6} />
              <directionalLight position={[5, 5, 5]} intensity={0.8} />
              <pointLight position={[0, 0, 5]} intensity={0.5} color="#facc15" />
              <Dice3D value={diceRoll} isRolling={isRolling} />
            </Canvas>
          </div>
          
          {/* Roll Button */}
          <motion.button
            className="btn btn-lg w-100 fw-bold"
            onClick={onRoll}
            disabled={isRolling}
            style={{
              background: isRolling 
                ? 'linear-gradient(45deg, #6c757d, #495057)' 
                : 'linear-gradient(45deg, #00ff99, #38bdf8)',
              border: 'none',
              borderRadius: '15px',
              color: 'white',
              fontSize: '1.1rem',
              boxShadow: isRolling 
                ? 'none' 
                : '0 0 20px rgba(0, 255, 153, 0.4)'
            }}
            whileHover={!isRolling ? { 
              scale: 1.05,
              boxShadow: '0 0 30px rgba(0, 255, 153, 0.6)'
            } : {}}
            whileTap={!isRolling ? { scale: 0.95 } : {}}
          >
            {isRolling ? (
              <>
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="me-2"
                >
                  🎲
                </motion.span>
                Rolling...
              </>
            ) : (
              <>
                <span className="me-2">🚀</span>
                Roll Mission
              </>
            )}
          </motion.button>
          
          {/* Dice Result */}
          <AnimatePresence>
            {!isRolling && diceRoll > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                className="mt-3"
              >
                <div 
                  className="rounded p-2"
                  style={{
                    background: 'rgba(0, 255, 153, 0.2)',
                    border: '1px solid rgba(0, 255, 153, 0.5)'
                  }}
                >
                  <span className="text-white fw-bold">Rolled: {diceRoll}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>

      {/* Game Log */}
      <motion.div
        className="card border-0"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          maxHeight: showLog ? '400px' : '60px',
          overflow: 'hidden',
          transition: 'max-height 0.3s ease'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Log Header */}
        <div 
          className="card-header border-0 d-flex align-items-center justify-content-between"
          style={{ background: 'transparent', cursor: 'pointer' }}
          onClick={() => setShowLog(!showLog)}
        >
          <h6 className="text-white fw-bold mb-0 d-flex align-items-center">
            <span className="me-2">📜</span>
            Mission Log
          </h6>
          <motion.span
            animate={{ rotate: showLog ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <i className="fas fa-chevron-down text-white-50"></i>
          </motion.span>
        </div>
        
        {/* Log Content */}
        <AnimatePresence>
          {showLog && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="card-body p-3"
              style={{ maxHeight: '300px', overflowY: 'auto' }}
            >
              {gameLog.slice(-8).reverse().map((log, index) => (
                <motion.div
                  key={log.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`alert alert-sm mb-2 border-0 ${
                    log.type === 'positive' 
                      ? 'alert-success' 
                      : log.type === 'negative'
                      ? 'alert-danger'
                      : 'alert-info'
                  }`}
                  style={{
                    background: log.type === 'positive' 
                      ? 'rgba(0, 255, 153, 0.2)' 
                      : log.type === 'negative'
                      ? 'rgba(239, 68, 68, 0.2)'
                      : 'rgba(56, 189, 248, 0.2)',
                    border: log.type === 'positive' 
                      ? '1px solid rgba(0, 255, 153, 0.3)' 
                      : log.type === 'negative'
                      ? '1px solid rgba(239, 68, 68, 0.3)'
                      : '1px solid rgba(56, 189, 248, 0.3)'
                  }}
                >
                  <small className="text-white">{log.message}</small>
                </motion.div>
              ))}
              
              {gameLog.length === 0 && (
                <div className="text-center text-white-50">
                  <small>No mission events yet...</small>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Mission Instructions */}
      <motion.div
        className="card border-0 mt-3"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(20px)',
          borderRadius: '15px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="card-body p-3">
          <h6 className="text-white fw-bold mb-3 d-flex align-items-center">
            <span className="me-2">ℹ️</span>
            Mission Brief
          </h6>
          <div className="text-white-50 small">
            <div className="mb-2">🎲 Roll dice & answer NASA questions</div>
            <div className="mb-2">🚶 Move if correct, stay if wrong</div>
            <div className="mb-2">🌍 Face events & earn eco-coins</div>
            <div>🏆 First to 10 turns wins!</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
