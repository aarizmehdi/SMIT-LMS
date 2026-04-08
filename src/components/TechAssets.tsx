import React, { useEffect, useRef } from 'react';
import { Terminal, Code2, Server, Globe } from 'lucide-react';
import { motion } from 'framer-motion';
import gsap from 'gsap';

export const TechAssets = () => {
  const globeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (globeRef.current) {
      gsap.to(globeRef.current, {
        rotationY: 360,
        duration: 20,
        repeat: -1,
        ease: 'none',
      });
    }
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {/* Ethereal Aura */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[1200px] h-[1200px] bg-radial-gradient from-smit-blue/20 via-smit-green/10 to-transparent blur-[120px] rounded-full"
      />

      {/* Floating Icons */}
      <FloatingIcon icon={<Terminal className="w-12 h-12 text-smit-green" />} top="10%" left="8%" delay={0} />
      <FloatingIcon icon={<Code2 className="w-14 h-14 text-smit-blue" />} bottom="15%" left="15%" delay={2} />
      <FloatingIcon icon={<Server className="w-10 h-10 text-white/20" />} top="25%" right="15%" delay={4} />

      {/* 3D Global Globe */}
      <div 
        ref={globeRef}
        className="absolute bottom-[8%] right-[10%] w-80 h-80 opacity-60 filter drop-shadow-[0_0_30px_rgba(144,188,78,0.3)]"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full">
          <defs>
            <linearGradient id="globeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0A21C0" />
              <stop offset="100%" stopColor="#90BC4E" />
            </linearGradient>
          </defs>
          <circle cx="50" cy="50" r="48" stroke="url(#globeGrad)" strokeWidth="0.5" fill="none" opacity="0.6"/>
          <path d="M2 50 Q 50 10 98 50 Q 50 90 2 50" stroke="url(#globeGrad)" strokeWidth="0.3" fill="none" opacity="0.4"/>
          <path d="M50 2 Q 10 50 50 98 Q 90 50 50 2" stroke="url(#globeGrad)" strokeWidth="0.3" fill="none" opacity="0.4"/>
          <ellipse cx="50" cy="50" rx="48" ry="15" stroke="url(#globeGrad)" strokeWidth="0.3" fill="none" opacity="0.3"/>
          <ellipse cx="50" cy="50" rx="15" ry="48" stroke="url(#globeGrad)" strokeWidth="0.3" fill="none" opacity="0.3"/>
        </svg>
      </div>
    </div>
  );
};

const FloatingIcon = ({ icon, top, left, right, bottom, delay }: any) => (
  <motion.div
    initial={{ y: 0 }}
    animate={{ y: [-20, 20, -20], rotate: [0, 5, -5, 0] }}
    transition={{ duration: 6, repeat: Infinity, delay, ease: 'easeInOut' }}
    style={{ position: 'absolute', top, left, right, bottom }}
    className="opacity-30 filter drop-shadow-lg"
  >
    {icon}
  </motion.div>
);
