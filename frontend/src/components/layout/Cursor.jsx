import { useState, useEffect } from 'react';

const Cursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show custom cursor after the user moves their mouse
    const addEventListeners = () => {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mousedown', onMouseDown);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('mouseenter', onMouseEnter);
      document.addEventListener('mouseleave', onMouseLeave);
    };

    const removeEventListeners = () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('mouseenter', onMouseEnter);
      document.removeEventListener('mouseleave', onMouseLeave);
    };

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      
      // Check if hovering over a clickable element
      const target = e.target;
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('clickable')
      ) {
        setIsActive(true);
      } else {
        setIsActive(false);
      }
    };

    const onMouseDown = () => {
      setIsActive(true);
    };

    const onMouseUp = () => {
      setIsActive(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    addEventListeners();
    return () => removeEventListeners();
  }, []);

  // Only render on client-side and if not on mobile
  const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  
  if (isMobile) return null;

  return (
    <div
      style={{
        position: 'fixed',
        width: isActive ? '40px' : '30px',
        height: isActive ? '40px' : '30px',
        borderRadius: '50%',
        backgroundColor: isActive ? 'rgba(99, 102, 241, 0.3)' : 'rgba(99, 102, 241, 0.2)',
        border: '1px solid var(--color-primary)',
        pointerEvents: 'none',
        zIndex: 300,
        transform: 'translate(-50%, -50%)',
        transition: 'width 0.2s, height 0.2s, background-color 0.2s',
        mixBlendMode: 'difference',
        left: `${position.x}px`,
        top: `${position.y}px`,
        opacity: isVisible ? 1 : 0
      }}
    />
  );
};

export default Cursor; 