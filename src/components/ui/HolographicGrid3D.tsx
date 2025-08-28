"use client";

import React, { useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Line, Text } from '@react-three/drei';
import * as THREE from 'three';

interface HolographicGrid3DProps {
  size?: number;
  divisions?: number;
  color?: string;
  opacity?: number;
  animated?: boolean;
  perspective?: boolean;
  className?: string;
  showLabels?: boolean;
}

// 3D Grid Lines Component
function GridLines({ size = 20, divisions = 20, color = "#00d4ff", opacity = 0.3, animated = true, perspective = true }) {
  const gridRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.LineBasicMaterial>(null);

  // Generate grid points for perspective grid
  const { lines, perspectiveLines } = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    const perspectiveLines: THREE.Vector3[][] = [];
    const step = size / divisions;

    // Horizontal lines (X-axis)
    for (let i = 0; i <= divisions; i++) {
      const z = -size / 2 + i * step;
      lines.push([
        new THREE.Vector3(-size / 2, 0, z),
        new THREE.Vector3(size / 2, 0, z)
      ]);
    }

    // Vertical lines (Z-axis)  
    for (let i = 0; i <= divisions; i++) {
      const x = -size / 2 + i * step;
      lines.push([
        new THREE.Vector3(x, 0, -size / 2),
        new THREE.Vector3(x, 0, size / 2)
      ]);
    }

    // Perspective depth lines (Y-axis going into distance)
    if (perspective) {
      for (let i = 0; i <= divisions; i += 2) {
        const x = -size / 2 + i * step;
        for (let j = 0; j <= divisions; j += 2) {
          const z = -size / 2 + j * step;
          perspectiveLines.push([
            new THREE.Vector3(x, 0, z),
            new THREE.Vector3(x * 0.6, -8, z * 0.6) // Vanishing point effect
          ]);
        }
      }
    }

    return { lines, perspectiveLines };
  }, [size, divisions, perspective]);

  // Animation loop
  useFrame((state) => {
    if (animated && gridRef.current && materialRef.current) {
      // Pulsing opacity effect
      const time = state.clock.elapsedTime;
      const pulseOpacity = opacity + Math.sin(time * 2) * 0.1;
      materialRef.current.opacity = Math.max(0.1, pulseOpacity);

      // Subtle rotation for depth
      gridRef.current.rotation.y = Math.sin(time * 0.1) * 0.02;
      
      // Gentle floating effect
      gridRef.current.position.y = Math.sin(time * 0.5) * 0.1;
    }
  });

  return (
    <group ref={gridRef}>
      {/* Main grid lines */}
      {lines.map((linePoints, index) => (
        <Line
          key={`grid-${index}`}
          points={linePoints}
          color={color}
          lineWidth={1}
          transparent
          opacity={opacity}
          ref={index === 0 ? materialRef : undefined}
        />
      ))}

      {/* Perspective depth lines */}
      {perspective && perspectiveLines.map((linePoints, index) => (
        <Line
          key={`perspective-${index}`}
          points={linePoints}
          color={color}
          lineWidth={0.5}
          transparent
          opacity={opacity * 0.4}
        />
      ))}

      {/* Holographic scan lines */}
      {animated && (
        <HolographicScanLines color={color} opacity={opacity * 0.5} />
      )}
    </group>
  );
}

// Animated scan lines effect
function HolographicScanLines({ color, opacity }: { color: string; opacity: number }) {
  const scanRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (scanRef.current) {
      const time = state.clock.elapsedTime;
      scanRef.current.position.z = -10 + (time * 2) % 20;
    }
  });

  const scanLinePoints = useMemo(() => [
    new THREE.Vector3(-10, 0, 0),
    new THREE.Vector3(10, 0, 0)
  ], []);

  return (
    <group ref={scanRef}>
      <Line
        points={scanLinePoints}
        color={color}
        lineWidth={2}
        transparent
        opacity={opacity}
      />
    </group>
  );
}

// Data nodes/points for Tony Stark style
function DataNodes({ count = 8, color = "#00d4ff" }) {
  const nodesRef = useRef<THREE.Group>(null);

  const nodePositions = useMemo(() => {
    const positions: THREE.Vector3[] = [];
    for (let i = 0; i < count; i++) {
      positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 15,
          Math.random() * 2,
          (Math.random() - 0.5) * 15
        )
      );
    }
    return positions;
  }, [count]);

  useFrame((state) => {
    if (nodesRef.current) {
      const time = state.clock.elapsedTime;
      nodesRef.current.children.forEach((child, index) => {
        child.position.y = nodePositions[index].y + Math.sin(time + index) * 0.2;
        const scale = 1 + Math.sin(time * 2 + index) * 0.1;
        child.scale.setScalar(scale);
      });
    }
  });

  return (
    <group ref={nodesRef}>
      {nodePositions.map((position, index) => (
        <mesh key={index} position={position}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial 
            color={color} 
            transparent 
            opacity={0.8} 
          />
          {/* Glow effect */}
          <mesh scale={2}>
            <sphereGeometry args={[0.05, 8, 8]} />
            <meshBasicMaterial 
              color={color} 
              transparent 
              opacity={0.2} 
            />
          </mesh>
        </mesh>
      ))}
    </group>
  );
}

// Main component
export default function HolographicGrid3D({
  size = 20,
  divisions = 20,
  color = "#00d4ff",
  opacity = 0.3,
  animated = true,
  perspective = true,
  className = "",
  showLabels = false
}: HolographicGrid3DProps) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        camera={{ 
          position: [15, 8, 15], 
          fov: 60,
          near: 0.1,
          far: 1000 
        }}
        style={{ background: 'transparent' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.2} />
        <pointLight position={[10, 10, 10]} intensity={0.5} color={color} />

        {/* Grid System */}
        <GridLines 
          size={size}
          divisions={divisions}
          color={color}
          opacity={opacity}
          animated={animated}
          perspective={perspective}
        />

        {/* Data Nodes */}
        <DataNodes color={color} count={12} />

        {/* HUD Labels */}
        {showLabels && (
          <>
            <Text
              position={[-size/2 - 2, 1, 0]}
              rotation={[0, Math.PI / 2, 0]}
              fontSize={0.5}
              color={color}
              anchorX="center"
              anchorY="middle"
              font="/fonts/orbitron.woff"
            >
              GRID SYSTEM ONLINE
            </Text>
            <Text
              position={[0, 1, -size/2 - 2]}
              fontSize={0.5}
              color={color}
              anchorX="center"
              anchorY="middle"
              font="/fonts/orbitron.woff"
            >
              HOLOGRAPHIC INTERFACE
            </Text>
          </>
        )}

        {/* Interactive controls (optional) */}
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={animated}
          autoRotate={animated}
          autoRotateSpeed={0.5}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 4}
        />
      </Canvas>
    </div>
  );
}

// Export variants for different use cases
export const StarkGridBackground = (props: Partial<HolographicGrid3DProps>) => (
  <HolographicGrid3D
    size={25}
    divisions={25}
    color="#00d4ff"
    opacity={0.2}
    animated={true}
    perspective={true}
    className="absolute inset-0 -z-10"
    {...props}
  />
);

export const JarvisGrid = (props: Partial<HolographicGrid3DProps>) => (
  <HolographicGrid3D
    size={30}
    divisions={30}
    color="#00ffff"
    opacity={0.4}
    animated={true}
    perspective={true}
    showLabels={true}
    {...props}
  />
);