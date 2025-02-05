import React, { useRef, useState, useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { Float, Text3D, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

const colorPalette = [
    "#0A1210", "#114253", "#FF7F11",
    "#9E83A3", "#85E5A7", "#0157FF",
    "#FCEB20", "#FF99FF"
];

// Calculate positions in a sphere
function calculatePosition(index, total, radius = 10) {
    const phi = Math.acos(-1 + (2 * index) / total);
    const theta = Math.sqrt(total * Math.PI) * phi;
    
    return [
        radius * Math.cos(theta) * Math.sin(phi),
        radius * Math.sin(theta) * Math.sin(phi),
        radius * Math.cos(phi)
    ];
}

function WordObject({ text, size, maxSize, index, total }) {
    const meshRef = useRef();
    const [color] = useState(() =>
        colorPalette[Math.floor(Math.random() * colorPalette.length)]
    );

    // Calculate scale based on size relative to maxSize
    const scale = maxSize > 0 ? Math.max((size / maxSize) * 1.5, 0.5) : 1;
    
    // Calculate position
    const position = calculatePosition(index, total);

    return (
        <Float
            speed={1}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={position}
        >
            <mesh ref={meshRef}>
                <Text3D
                    font="/fonts/helvetiker_regular.typeface.json"
                    size={scale}
                    height={0.2}
                    curveSegments={12}
                >
                    {text}
                    <meshStandardMaterial 
                        color={color}
                        metalness={0.1}
                        roughness={0.6}
                    />
                </Text3D>
            </mesh>
        </Float>
    );
}

function WordCloud3D({ words }) {
    const validWords = words.filter(word => word?.text && word?.size !== undefined);
    const sortedWords = [...validWords].sort((a, b) => b.size - a.size);
    const maxSize = Math.max(...validWords.map(w => w.size || 0), 1);

    // Calculate appropriate camera distance based on number of words
    const cameraDistance = Math.max(20, Math.min(sortedWords.length * 2, 35));

    return (
        <Canvas
            camera={{ 
                position: [0, 0, cameraDistance],
                fov: 75,
                near: 0.1,
                far: 1000
            }}
            style={{ background: 'linear-gradient(to bottom, #f0f0f0, #ffffff)' }}
        >
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            
            <OrbitControls
                enableZoom={true}
                enablePan={true}
                enableRotate={true}
                zoomSpeed={0.5}
                panSpeed={0.5}
                rotateSpeed={0.5}
            />

            <group>
                {sortedWords.map((word, index) => (
                    <WordObject 
                        key={word.text} 
                        text={word.text} 
                        size={word.size} 
                        maxSize={maxSize}
                        index={index}
                        total={sortedWords.length}
                    />
                ))}
            </group>
        </Canvas>
    );
}

export default WordCloud3D;
