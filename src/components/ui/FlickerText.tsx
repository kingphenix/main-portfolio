import { useState, useRef, useCallback } from 'react';

interface FlickerTextProps {
  text: string;
  className?: string;
  flickerDuration?: number;
}

const FlickerText = ({ text, className = '', flickerDuration = 1000 }: FlickerTextProps) => {
  const [displayText, setDisplayText] = useState(text);
  const animationRef = useRef<number>();
  const startTime = useRef<number>();
  const isHovering = useRef(false);

  // Generate random binary string
  const generateBinary = useCallback((length: number) => {
    return Array.from({ length }, () => (Math.random() > 0.5 ? '1' : '0')).join('');
  }, []);

  const stopAnimation = useCallback(() => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = undefined;
    }
    setDisplayText(text);
  }, [text]);

  const startAnimation = useCallback(() => {
    isHovering.current = true;
    startTime.current = performance.now();
    
    const animate = (timestamp: number) => {
      if (!startTime.current) startTime.current = timestamp;
      
      const elapsed = timestamp - startTime.current;
      const flickerSpeed = 50; // milliseconds between binary changes
      
      if (isHovering.current) {
        // Change binary at regular intervals while hovering
        if (elapsed % flickerSpeed < 16) { // ~60fps
          setDisplayText(generateBinary(text.length));
        }
        animationRef.current = requestAnimationFrame(animate);
      } else {
        // Hover ended, show original text
        stopAnimation();
      }
    };

    if (!animationRef.current) {
      animationRef.current = requestAnimationFrame(animate);
    }
  }, [text, generateBinary, stopAnimation]);

  const handleMouseEnter = () => {
    isHovering.current = true;
    startAnimation();
  };

  const handleMouseLeave = () => {
    isHovering.current = false;
    stopAnimation();
  };

  return (
    <span 
      className={`${className} cursor-default inline-block`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={text}
    >
      {displayText}
    </span>
  );
};

export default FlickerText;
