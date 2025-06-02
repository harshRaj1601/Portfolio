import React, { useState, useEffect, useMemo, useRef } from 'react';
import './AnimatedBackground.css';

const AnimatedBackground = () => {
  const text = 'Harsh Jaiswal';
  const numberOfElements = 10;
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMoving, setIsMoving] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setMousePosition({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
      setIsMoving(true);
      clearTimeout(window.moveTimeout);
      window.moveTimeout = setTimeout(() => setIsMoving(false), 800);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearTimeout(window.moveTimeout);
    };
  }, []);  const calculateDistanceEffect = (x, y) => {
    const dx = mousePosition.x - x;
    const dy = mousePosition.y - y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    const maxDistance = 500; // Even larger radius of effect
    
    // Enhanced wave-like falloff with multiple waves
    const normalizedDistance = distance / maxDistance;
    const wave1 = Math.cos(normalizedDistance * Math.PI * 2);
    const wave2 = Math.cos(normalizedDistance * Math.PI * 4) * 0.3;
    const combinedWave = (wave1 + wave2) * 0.5 + 0.5;
    const effect = Math.max(0, Math.pow((1 - normalizedDistance), 1.5) * combinedWave);
    
    return { 
      dx, 
      dy, 
      effect,
      distance 
    };
  };

  const floatingElements = useMemo(() => {
    return Array(numberOfElements).fill().map((_, index) => {
      const patterns = ['circle', 'diamond', 'triangle'];
      const pattern = patterns[Math.floor(Math.random() * patterns.length)];
      
      // Random initial positions (in pixels instead of percentages)
      const x = Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1000);
      const y = Math.random() * (typeof window !== 'undefined' ? window.innerHeight : 1000);
      
      const duration = 15 + Math.random() * 20;
      const delay = Math.random() * -20;
      
      const { dx, dy, effect } = calculateDistanceEffect(x, y);
      
      return (
        <span
          key={index}
          className={`floating-text ${pattern} ${isMoving ? 'cursor-moving' : ''}`}
          style={{
            left: `${x}px`,
            top: `${y}px`,
            animationDuration: `${duration}s`,
            animationDelay: `${delay}s`,
            '--effect-strength': effect,
            '--displacement-x': `${dx}px`,
            '--displacement-y': `${dy}px`,
            '--initial-x': `${x}px`,
            '--initial-y': `${y}px`,
          }}
        >
          {text}
        </span>
      );
    });
  }, [mousePosition, isMoving]);

  return (
    <div className="animated-background">
      {floatingElements}
    </div>
  );
};

export default AnimatedBackground;
