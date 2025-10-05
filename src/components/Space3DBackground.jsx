import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Box, Cone, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Low-poly Earth component
function LowPolyEarth({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.005;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
    }
  });

  return (
    <Sphere
      ref={meshRef}
      args={[1, 8, 6]}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <meshStandardMaterial
        color="#4A90E2"
        emissive="#001122"
        emissiveIntensity={0.1}
        roughness={0.8}
        metalness={0.1}
      />
    </Sphere>
  );
}

// Rocket component
function Rocket({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
      meshRef.current.scale.setScalar(hovered ? 1.2 : 1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Rocket body */}
      <Cone args={[0.1, 0.6, 6]} position={[0, 0.2, 0]}>
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={hovered ? 0.3 : 0.1}
        />
      </Cone>
      {/* Rocket tip */}
      <Cone args={[0.05, 0.3, 4]} position={[0, 0.5, 0]}>
        <meshStandardMaterial color="#FF6B6B" />
      </Cone>
    </group>
  );
}

// Sprouting plant component
function SproutingPlant({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.008;
      meshRef.current.scale.y = 1 + Math.sin(state.clock.elapsedTime * 0.8) * 0.1;
      meshRef.current.scale.setScalar(hovered ? 1.15 : 1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Plant stem */}
      <Box args={[0.1, 0.8, 0.1]} position={[0, 0.4, 0]}>
        <meshStandardMaterial color="#4CAF50" />
      </Box>
      {/* Plant leaves */}
      <Sphere args={[0.3, 6, 4]} position={[0, 0.8, 0]}>
        <meshStandardMaterial
          color="#66BB6A"
          emissive="#2E7D32"
          emissiveIntensity={hovered ? 0.2 : 0.05}
        />
      </Sphere>
    </group>
  );
}

// Satellite component
function Satellite({ position }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.02;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.2;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.7) * 0.15;
      meshRef.current.scale.setScalar(hovered ? 1.3 : 1);
    }
  });

  return (
    <group
      ref={meshRef}
      position={position}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      {/* Satellite body */}
      <Box args={[0.3, 0.2, 0.3]}>
        <meshStandardMaterial
          color="#E0E0E0"
          emissive="#64B5F6"
          emissiveIntensity={hovered ? 0.4 : 0.1}
        />
      </Box>
      {/* Solar panels */}
      <Box args={[0.8, 0.1, 0.4]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#263238" />
      </Box>
      {/* Antenna */}
      <Box args={[0.05, 0.3, 0.05]} position={[0, 0.25, 0]}>
        <meshStandardMaterial color="#FFD700" />
      </Box>
    </group>
  );
}

// Star particles
function StarField() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0005;
    }
  });

  return (
    <Stars
      ref={meshRef}
      radius={300}
      depth={60}
      count={5000}
      factor={7}
      saturation={0}
      fade
    />
  );
}

// Main 3D scene
function SpaceScene() {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={0.8}
        color="#64B5F6"
      />
      <pointLight position={[-10, 10, -10]} intensity={0.3} color="#4FC3F7" />

      {/* Star field */}
      <StarField />

      {/* 3D Objects */}
      <LowPolyEarth position={[-4, 0, -8]} />
      <Rocket position={[3, 1, -6]} />
      <SproutingPlant position={[0, 0, -4]} />
      <Satellite position={[2, 2, -10]} />

      {/* Camera controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// Main component
export default function Space3DBackground({ isLaunching = false }) {
  return (
    <div 
      className="fixed inset-0 w-full h-full"
      style={{ 
        zIndex: -1,
        background: 'linear-gradient(135deg, #001220 0%, #012a4a 50%, #013a63 100%)'
      }}
    >
      <Canvas
        camera={{ position: [0, 2, 8], fov: 75 }}
        style={{ background: 'transparent' }}
      >
        <SpaceScene />
      </Canvas>
      
      {/* Aurora-like gradient overlay */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(79, 195, 247, 0.1) 70%, rgba(79, 195, 247, 0.2) 100%)'
        }}
      />
    </div>
  );
}
