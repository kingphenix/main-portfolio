import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

declare global {
  interface Window {
    VANTA: {
      BIRDS: (options: any) => {
        destroy: () => void;
      };
    };
  }
}

// This is a workaround to load the vanta.birds.min.js script
const loadVanta = () => {
  return new Promise((resolve) => {
    if (typeof window === 'undefined') return resolve(null);
    
    if ((window as any).VANTA) return resolve((window as any).VANTA);
    
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
    script.async = true;
    script.onload = () => {
      const vantaScript = document.createElement('script');
      vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.birds.min.js';
      vantaScript.async = true;
      vantaScript.onload = () => {
        resolve((window as any).VANTA);
      };
      document.body.appendChild(vantaScript);
    };
    document.body.appendChild(script);
  });
};

const BirdsBackground = () => {
  const [vantaEffect, setVantaEffect] = useState<{ destroy: () => void } | null>(null);
  const vantaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!vantaEffect && typeof window !== 'undefined') {
      loadVanta().then((VANTA: typeof window.VANTA) => {
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
          birdSize: 1.02,
          wingSpan: 10.20,
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
        vantaEffect.destroy();
        setVantaEffect(null);
      }
    };
  }, [vantaEffect]);

  return <div ref={vantaRef} className="absolute inset-0 z-0 w-full h-full" style={{ pointerEvents: 'none' }} />;
};

export default BirdsBackground;
