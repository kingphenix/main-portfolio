import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// This is a workaround to load the vanta.birds.min.js script
const loadVanta = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(null);
    
    // @ts-ignore - We'll handle the case where window.VANTA might not exist
    if (window.VANTA) return resolve(window.VANTA);
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    script.async = true;
    script.onload = () => {
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
      vantaScript.async = true;
      vantaScript.onload = () => {
        // @ts-ignore
        resolve(window.VANTA);
      };
      document.body.appendChild(vantaScript);
    };
    document.body.appendChild(script);
  });
};

const BirdsBackground = () => {
  const [vantaEffect, setVantaEffect] = useState(null);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect && typeof window !== 'undefined') {
      loadVanta().then((VANTA) => {
        if (!VANTA || !vantaRef.current) return;
        
        const effect = VANTA.BIRDS({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          scale: 1.00,
          scaleMobile: 1.00,
          backgroundColor: 0x70808,
          color1: 0x00ffff,
          birdSize: 1.70,
          wingSpan: 17.00,
          speedLimit: 4.00,
          separation: 58.00,
          alignment: 76.00,
          cohesion: 91.00
        });
        
        setVantaEffect(effect);
      });
    }
    
    return () => {
      if (vantaEffect) {
        // @ts-ignore
        vantaEffect.destroy();
      }
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 z-0 w-full h-full" style={{ pointerEvents: 'none' }} />;
};

export default BirdsBackground;
