import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Sphere, Box, Cone, Text, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Enhanced Earth with farm continents
function FarmEarth({ position, isLaunching }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.003;
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.1) * 0.05;
      
      // Launch animation
      if (isLaunching) {
        meshRef.current.position.y += 0.1;
        meshRef.current.scale.setScalar(1.2);
      } else {
        meshRef.current.scale.setScalar(hovered ? 1.1 : 1);
      }
    }
  });

  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[1.5, 16, 16]}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <meshStandardMaterial
          color="#4A90E2"
          emissive="#001122"
          emissiveIntensity={0.2}
          roughness={0.8}
          metalness={0.2}
        />
      </Sphere>
      
      {/* Farm continents */}
      <Text
        position={[0, 0, 1.6]}
        fontSize={0.3}
        color="#00ff99"
        anchorX="center"
        anchorY="middle"
      >
        🌾
      </Text>
    </group>
  );
}

// Floating satellites
function FloatingSatellite({ position, speed = 1 }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01 * speed;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.3 * speed) * 0.2;
      meshRef.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * 0.2 * speed) * 0.1;
    }
  });

  return (
    <group ref={meshRef} position={position}>
      <Box args={[0.4, 0.3, 0.4]}>
        <meshStandardMaterial
          color="#E0E0E0"
          emissive="#00ff99"
          emissiveIntensity={0.3}
          roughness={0.1}
          metalness={0.9}
        />
      </Box>
      <Box args={[1.2, 0.1, 0.6]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#263238" />
      </Box>
      <Cone args={[0.1, 0.4, 4]} position={[0, 0.35, 0]}>
        <meshStandardMaterial color="#facc15" />
      </Cone>
    </group>
  );
}

// Rocket for launch sequence
function LaunchRocket({ isLaunching }) {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      if (isLaunching) {
        meshRef.current.position.y += 0.5;
        meshRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 10) * 0.1;
      } else {
        meshRef.current.rotation.y += 0.005;
        meshRef.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
      }
    }
  });

  return (
    <group 
      ref={meshRef} 
      position={isLaunching ? [0, 5, -8] : [3, 2, -6]}
    >
      <Cone args={[0.2, 1.2, 8]} position={[0, 0.5, 0]}>
        <meshStandardMaterial
          color="#FFD700"
          emissive="#FFA500"
          emissiveIntensity={isLaunching ? 0.8 : 0.2}
        />
      </Cone>
      <Cone args={[0.1, 0.6, 6]} position={[0, 1.2, 0]}>
        <meshStandardMaterial color="#FF6B6B" />
      </Cone>
      
      {/* Launch trail */}
      {isLaunching && (
        <Cone args={[0.3, 2, 8]} position={[0, -1, 0]}>
          <meshStandardMaterial
            color="#FF4500"
            emissive="#FF4500"
            emissiveIntensity={0.5}
            transparent
            opacity={0.7}
          />
        </Cone>
      )}
    </group>
  );
}

// Enhanced star field with depth
function EnhancedStarField() {
  const meshRef = useRef();
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.0002;
    }
  });

  return (
    <group ref={meshRef}>
      <Stars
        radius={400}
        depth={100}
        count={8000}
        factor={8}
        saturation={0}
        fade
        speed={0.5}
      />
    </group>
  );
}

// Main cinematic scene
function CinematicScene({ isLaunching, mousePosition }) {
  const { camera } = useThree();
  
  useFrame((state) => {
    // Camera drift animation
    camera.position.x = Math.sin(state.clock.elapsedTime * 0.1) * 2;
    camera.position.z = 15 + Math.sin(state.clock.elapsedTime * 0.05) * 1;
    
    // Parallax effect based on mouse
    if (mousePosition) {
      camera.position.x += (mousePosition.x - 0.5) * 2;
      camera.position.y += (mousePosition.y - 0.5) * 1;
    }
  });

  return (
    <>
      {/* Enhanced Lighting */}
      <ambientLight intensity={0.3} color="#001122" />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1.5}
        color="#00ff99"
        castShadow
      />
      <pointLight position={[-10, 10, -10]} intensity={0.8} color="#38bdf8" />
      <pointLight position={[0, 5, 0]} intensity={1.2} color="#facc15" />
      <pointLight position={[5, -5, 5]} intensity={0.6} color="#ffffff" />

      {/* Enhanced star field */}
      <EnhancedStarField />

      {/* 3D Objects */}
      <FarmEarth position={[-6, 0, -10]} isLaunching={isLaunching} />
      <LaunchRocket isLaunching={isLaunching} />
      <FloatingSatellite position={[4, 3, -8]} speed={1.2} />
      <FloatingSatellite position={[-2, 2, -12]} speed={0.8} />
      <FloatingSatellite position={[6, 1, -6]} speed={1.5} />

      {/* Ground plane with glow */}
      <Box args={[30, 0.1, 30]} position={[0, -1, 0]}>
        <meshStandardMaterial
          color="#000814"
          emissive="#000814"
          emissiveIntensity={0.1}
        />
      </Box>
    </>
  );
}

// Main cinematic background component
export default function Cinematic3DBackground({ isLaunching = false }) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div 
      className="position-fixed"
      style={{ 
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        background: 'linear-gradient(180deg, #000814 0%, #001f3f 100%)',
        overflow: 'hidden'
      }}
    >
      <Canvas
        camera={{ position: [0, 5, 15], fov: 75 }}
        style={{ 
          background: 'transparent',
          width: '100%',
          height: '100%',
          display: 'block'
        }}
      >
        <CinematicScene isLaunching={isLaunching} mousePosition={mousePosition} />
      </Canvas>
      
      {/* Aurora-like gradient overlay */}
      <div 
        className="position-absolute"
        style={{
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          opacity: 0.2,
          background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 255, 153, 0.1) 40%, rgba(56, 189, 248, 0.1) 100%)',
          pointerEvents: 'none'
        }}
      />
    </div>
  );
}
