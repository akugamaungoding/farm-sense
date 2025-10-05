import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Box, Sphere, Cone, Text, useTexture, Html } from '@react-three/drei';
import * as THREE from 'three';
import { motion } from 'framer-motion';

// Low-poly 3D tile platform
function BoardTile({ position, index, event, isActive, isHighlighted }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Subtle floating animation
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 2 + index) * 0.05;
      
      // Glow effect for active/highlighted tiles
      if (isActive || isHighlighted) {
        meshRef.current.material.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 3) * 0.1;
      } else {
        meshRef.current.material.emissiveIntensity = 0.05;
      }
      
      // Hover effect
      if (hovered) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  const getTileColor = () => {
    if (isActive || isHighlighted) return '#00ff99';
    if (event?.effect > 0) return '#38bdf8';
    if (event?.effect < 0) return '#facc15';
    return '#64748b';
  };

  return (
    <group position={position}>
      {/* Tile platform */}
      <Box
        ref={meshRef}
        args={[2.5, 0.3, 2.5]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={getTileColor()}
          emissive={getTileColor()}
          emissiveIntensity={0.1}
          roughness={0.3}
          metalness={0.7}
        />
      </Box>
      
      {/* Event icon */}
      {event?.icon && (
        <Html position={[0, 0.4, 0]} center>
          <div style={{
            width: '60px',
            height: '60px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            border: '2px solid rgba(255, 255, 255, 0.3)',
            backdropFilter: 'blur(10px)'
          }}>
            <img 
              src={`/${event.icon}`} 
              alt={event.title}
              style={{
                width: '40px',
                height: '40px',
                objectFit: 'contain'
              }}
            />
          </div>
        </Html>
      )}
      
      {/* 3D Tile number - Top Left Corner */}
      <Text
        position={[-0.8, 0.9, 0.8]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="left"
        anchorY="top"
        strokeWidth={0.02}
        strokeColor="#000000"
        outlineWidth={0.02}
        outlineColor="#000000"
      >
        {index + 1}
      </Text>
    </group>
  );
}

// Player token component
function PlayerToken({ position, color, playerName, isActive, isMoving }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      // Active player bounce
      if (isActive) {
        meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 4) * 0.2;
        meshRef.current.rotation.y += 0.02;
      } else {
        meshRef.current.position.y = position[1];
      }
      
      // Moving animation
      if (isMoving) {
        meshRef.current.scale.setScalar(1.3);
      } else {
        meshRef.current.scale.setScalar(1);
      }
      
      // Hover effect
      if (hovered) {
        meshRef.current.material.emissiveIntensity = 0.4;
      } else {
        meshRef.current.material.emissiveIntensity = 0.1;
      }
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[0.4, 16, 16]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.1}
          roughness={0.2}
          metalness={0.8}
        />
      </Sphere>
      
      {/* Player name above token */}
      <Text
        position={[0, 1.5, 0]}
        fontSize={0.4}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
      >
        {playerName}
      </Text>
    </group>
  );
}

// Floating hologram in center
function CenterHologram() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={[0, 3, 0]}>
      {/* Holographic satellite */}
      <Box args={[0.8, 0.4, 0.8]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#00ff99"
          emissive="#00ff99"
          emissiveIntensity={0.3}
          transparent
          opacity={0.7}
        />
      </Box>
      
      {/* Solar panels */}
      <Box args={[1.6, 0.1, 0.6]} position={[0, 0, 0]}>
        <meshStandardMaterial
          color="#38bdf8"
          emissive="#38bdf8"
          emissiveIntensity={0.2}
          transparent
          opacity={0.8}
        />
      </Box>
      
      {/* Antenna */}
      <Cone args={[0.1, 0.8, 4]} position={[0, 0.6, 0]}>
        <meshStandardMaterial
          color="#facc15"
          emissive="#facc15"
          emissiveIntensity={0.4}
        />
      </Cone>
    </group>
  );
}

// Particle field for atmosphere
function ParticleField() {
  const meshRef = useRef();
  const particlesRef = useRef();

  useFrame((state) => {
    if (particlesRef.current) {
      particlesRef.current.rotation.y += 0.001;
    }
  });

  return (
    <group ref={meshRef}>
      {/* Slow-moving fog particles */}
      <Stars
        ref={particlesRef}
        radius={200}
        depth={50}
        count={300}
        factor={4}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  );
}

// Main 3D board scene
function BoardScene({ tiles, players, currentPlayer, highlightedTile, activePlayer }) {
  // Create circular board layout
  const tilePositions = [];
  const radius = 8;
  
  for (let i = 0; i < 12; i++) {
    const angle = (i / 12) * Math.PI * 2;
    tilePositions.push([
      Math.cos(angle) * radius,
      0,
      Math.sin(angle) * radius
    ]);
  }

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.4} color="#001122" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.2}
        color="#00ff99"
        castShadow
      />
      <pointLight position={[-10, 10, -10]} intensity={0.6} color="#38bdf8" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#facc15" />

      {/* Atmospheric particles */}
      <ParticleField />

      {/* Board tiles */}
      {tiles.map((tile, index) => (
        <BoardTile
          key={index}
          position={tilePositions[index]}
          index={index}
          event={tile}
          isActive={players[currentPlayer]?.position === index}
          isHighlighted={highlightedTile === index}
        />
      ))}
      
      {/* Player tokens */}
      {Object.entries(players).map(([playerId, player], index) => {
        // Add offset for players on same tile
        const offsetX = playerId === 'player1' ? -0.3 : 0.3;
        const offsetZ = playerId === 'player1' ? -0.3 : 0.3;
        
        return (
          <PlayerToken
            key={playerId}
            position={[
              tilePositions[player.position][0] + offsetX,
              tilePositions[player.position][1] + 0.8,
              tilePositions[player.position][2] + offsetZ
            ]}
            color={playerId === 'player1' ? '#00BFFF' : '#FF4500'}
            playerName={player.name}
            isActive={currentPlayer === playerId}
            isMoving={false}
          />
        );
      })}
      
      {/* Center hologram */}
      <CenterHologram />

      {/* Ground plane with glow */}
      <Box args={[25, 0.1, 25]} position={[0, -0.5, 0]}>
        <meshStandardMaterial
          color="#001122"
          emissive="#001122"
          emissiveIntensity={0.1}
        />
      </Box>
    </>
  );
}

// Main immersive board component
export default function Immersive3DBoard({ tiles, players, currentPlayer, highlightedTile }) {
  return (
    <div className="w-100 h-100 position-relative">
      <Canvas
        camera={{ position: [0, 12, 15], fov: 60 }}
        shadows
        style={{ background: 'transparent' }}
      >
        <BoardScene
          tiles={tiles}
          players={players}
          currentPlayer={currentPlayer}
          highlightedTile={highlightedTile}
        />
        
        {/* Camera controls */}
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 2}
          minDistance={12}
          maxDistance={25}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
}
