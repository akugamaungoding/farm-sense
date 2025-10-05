import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';
import * as THREE from 'three';

// 3D Dice component
function Dice3D({ value, isRolling }) {
  const meshRef = useRef();
  const [displayValue, setDisplayValue] = useState(1);

  useFrame((state) => {
    if (meshRef.current) {
      if (isRolling) {
        // Rolling animation
        meshRef.current.rotation.x += 0.2;
        meshRef.current.rotation.y += 0.3;
        meshRef.current.rotation.z += 0.1;
        
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
        args={[1, 1, 1]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color={isRolling ? "#FFD700" : "#FFFFFF"} 
          emissive={isRolling ? "#FFD700" : "#000000"}
          emissiveIntensity={isRolling ? 0.2 : 0}
        />
      </Box>
      
      {/* Dots on each face */}
      {getDiceDots(displayValue).map((dot, index) => (
        <Box
          key={index}
          args={[0.15, 0.15, 0.02]}
          position={[dot[0], dot[1], 0.51]}
        >
          <meshStandardMaterial color="#000000" />
        </Box>
      ))}
    </group>
  );
}

// Main Dice component
export default function Dice({ value, isRolling, onRoll }) {
  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 3D Dice */}
      <div className="w-24 h-24">
        <Canvas camera={{ position: [0, 0, 3], fov: 50 }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={0.8} />
          <Dice3D value={value} isRolling={isRolling} />
        </Canvas>
      </div>
      
      {/* Roll button */}
      <button
        onClick={onRoll}
        disabled={isRolling}
        className={`px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 active:scale-95 ${
          isRolling
            ? 'bg-gray-400 text-gray-600 cursor-not-allowed'
            : 'bg-gradient-to-r from-yellow-400 to-orange-500 text-white shadow-lg hover:shadow-xl'
        }`}
      >
        {isRolling ? '🎲 Rolling...' : '🎲 Roll Dice!'}
      </button>
      
      {/* Value display */}
      {!isRolling && value > 0 && (
        <div className="text-2xl font-bold text-gray-700">
          Rolled: {value}
        </div>
      )}
    </div>
  );
}
