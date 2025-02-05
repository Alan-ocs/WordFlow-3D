import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text3D, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { animated, useSpring } from '@react-spring/three';

const colorPalette = [
    "#60A5FA", "#93C5FD", "#3B82F6", 
    "#8B5CF6", "#A78BFA", "#7C3AED",
    "#F472B6", "#FB7185", "#EC4899"
];

const AnimatedText3D = animated(Text3D);

function WordObject({ text, size, maxSize, isNew, index }) {
    const meshRef = useRef();
    const [active, setActive] = useState(false);
    const [color] = useState(() =>
        colorPalette[Math.floor(Math.random() * colorPalette.length)]
    );

    // Calculate position and scale
    const scale = maxSize > 0 ? (size / maxSize) * 2 : 1;
    const delay = index * 0.1;

    // Spring animation for new words
    const { scaleSpring, opacitySpring } = useSpring({
        from: { scaleSpring: 0.2, opacitySpring: 0 },
        to: { scaleSpring: scale, opacitySpring: 1 },
        delay: delay * 1000,
        config: { mass: 1, tension: 280, friction: 20 }
    });

    // Hover animation
    const { hoverScale } = useSpring({
        hoverScale: active ? 1.2 : 1,
        config: { mass: 1, tension: 280, friction: 20 }
    });

    // Pulse effect for new words
    useEffect(() => {
        if (isNew) {
            meshRef.current.material.emissiveIntensity = 2;
            const timeout = setTimeout(() => {
                if (meshRef.current) {
                    meshRef.current.material.emissiveIntensity = 0;
                }
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [isNew]);

    useFrame((state) => {
        if (meshRef.current) {
            // Add subtle floating animation
            meshRef.current.position.y += Math.sin(state.clock.elapsedTime + index) * 0.0005;
        }
    });

    const position = [
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15,
        (Math.random() - 0.5) * 15
    ];

    return (
        <Float
            speed={1}
            rotationIntensity={0.5}
            floatIntensity={0.5}
            position={position}
        >
            <animated.mesh
                ref={meshRef}
                scale={hoverScale.to(s => [s * scaleSpring.get(), s * scaleSpring.get(), s * scaleSpring.get()])}
                onPointerOver={() => setActive(true)}
                onPointerOut={() => setActive(false)}
            >
                <AnimatedText3D
                    font="/fonts/helvetiker_regular.typeface.json"
                    size={1}
                    height={0.2}
                    curveSegments={12}
                >
                    {text}
                    <meshPhysicalMaterial
                        color={color}
                        emissive={color}
                        emissiveIntensity={0}
                        metalness={0.1}
                        roughness={0.2}
                        transparent
                        opacity={opacitySpring}
                    />
                </AnimatedText3D>
            </animated.mesh>
        </Float>
    );
}

function WordCloud3D({ words }) {
    const validWords = words.filter(word => word?.text && word?.size !== undefined);
    const sortedWords = [...validWords].sort((a, b) => b.size - a.size);
    const maxSize = Math.max(...validWords.map(w => w.size || 0));

    return (
        <Canvas shadows dpr={[1, 2]}>
            <PerspectiveCamera makeDefault position={[0, 0, 30]} fov={75} />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={1} castShadow />
            <spotLight 
                position={[-10, -10, -10]} 
                angle={0.3} 
                penumbra={1} 
                intensity={1} 
                castShadow 
            />
            <OrbitControls
                enableZoom
                enablePan
                enableRotate
                zoomSpeed={0.5}
                panSpeed={0.5}
                rotateSpeed={0.5}
                minDistance={10}
                maxDistance={50}
            />
            <fog attach="fog" args={['#1e293b', 20, 90]} />
            <group>
                {sortedWords.map((word, index) => (
                    <WordObject
                        key={`${word.text}-${index}`}
                        text={word.text}
                        size={word.size}
                        maxSize={maxSize}
                        isNew={word.isNew}
                        index={index}
                    />
                ))}
            </group>
        </Canvas>
    );
}

export default WordCloud3D;
