import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Text, Box, Sphere } from '@react-three/drei';
import * as THREE from 'three';

// Individual tile component
function Tile({ position, index, event, isHighlighted }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      // Subtle rotation animation
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + index) * 0.1;
      
      // Highlight animation
      if (isHighlighted) {
        meshRef.current.scale.setScalar(1.1 + Math.sin(state.clock.elapsedTime * 4) * 0.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={position}>
      <Box
        ref={meshRef}
        args={[2, 0.2, 2]}
        position={[0, 0, 0]}
      >
        <meshStandardMaterial 
          color={isHighlighted ? "#FFD700" : event?.icon ? "#4CAF50" : "#8BC34A"}
          emissive={isHighlighted ? "#FFD700" : "#000000"}
          emissiveIntensity={isHighlighted ? 0.3 : 0}
        />
      </Box>
      
      {/* Event icon */}
      {event?.icon && (
        <Text
          position={[0, 0.3, 0]}
          fontSize={0.8}
          color="#333"
          anchorX="center"
          anchorY="middle"
        >
          {event.icon}
        </Text>
      )}
      
      {/* Tile number */}
      <Text
        position={[0, 0.15, 0]}
        fontSize={0.3}
        color="#666"
        anchorX="center"
        anchorY="middle"
      >
        {index + 1}
      </Text>
    </group>
  );
}

// Player token component
function PlayerToken({ position, color, playerName, isActive }) {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current && isActive) {
      // Bounce animation for active player
      meshRef.current.position.y = 0.5 + Math.sin(state.clock.elapsedTime * 3) * 0.2;
    } else if (meshRef.current) {
      meshRef.current.position.y = 0.5;
    }
  });

  return (
    <group position={position}>
      <Sphere ref={meshRef} args={[0.3, 16, 16]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={isActive ? 0.2 : 0} />
      </Sphere>
      
      {/* Player name above token */}
      <Text
        position={[0, 1.2, 0]}
        fontSize={0.4}
        color="#333"
        anchorX="center"
        anchorY="middle"
      >
        {playerName}
      </Text>
    </group>
  );
}

// Main board component
function Board({ tiles, players, currentPlayer, highlightedTile }) {
  const boardRef = useRef();
  
  // Create circular board layout
  const tilePositions = [];
  const radius = 6;
  
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    tilePositions.push([
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ]);
  }

  return (
    <group ref={boardRef}>
      {/* Ground plane */}
      <Box args={[20, 0.1, 20]} position={[0, -0.5, 0]}>
        <meshStandardMaterial color="#90EE90" />
      </Box>
      
      {/* Board tiles */}
      {tiles.map((tile, index) => (
        <Tile
          key={index}
          position={tilePositions[index]}
          index={index}
          event={tile}
          isHighlighted={highlightedTile === index}
        />
      ))}
      
      {/* Player tokens */}
      {Object.entries(players).map(([playerId, player]) => (
        <PlayerToken
          key={playerId}
          position={tilePositions[player.position]}
          color={player.color}
          playerName={player.name}
          isActive={currentPlayer === playerId}
        />
      ))}
    </group>
  );
}

// Main 3D Board component
export default function Board3D({ tiles, players, currentPlayer, highlightedTile }) {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-sky-200 to-green-200 rounded-xl overflow-hidden">
      <Canvas
        camera={{ position: [0, 8, 12], fov: 50 }}
        shadows
      >
        {/* Lighting */}
        <ambientLight intensity={0.6} />
        <directionalLight
          position={[10, 10, 5]}
          intensity={1}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-10, 10, -10]} intensity={0.5} />
        
        {/* Board */}
        <Board 
          tiles={tiles}
          players={players}
          currentPlayer={currentPlayer}
          highlightedTile={highlightedTile}
        />
        
        {/* Controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2}
          minDistance={8}
          maxDistance={20}
        />
      </Canvas>
    </div>
  );
}
