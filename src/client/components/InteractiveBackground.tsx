import React, { useEffect, useRef } from 'react';

export type ThemeType = 'cyan' | 'emerald' | 'amethyst' | 'gold' | 'oled';

interface InteractiveBackgroundProps {
  theme?: ThemeType;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
}

export const InteractiveBackground: React.FC<InteractiveBackgroundProps> = ({
  theme = 'cyan',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -1000,
    y: -1000,
    active: false,
  });

  // Color mapping based on active theme
  const getThemeColors = (t: ThemeType) => {
    switch (t) {
      case 'emerald':
        return { particle: '52, 211, 153', glow: '16, 185, 129' };
      case 'amethyst':
        return { particle: '192, 132, 252', glow: '168, 85, 247' };
      case 'gold':
        return { particle: '251, 191, 36', glow: '245, 158, 11' };
      case 'oled':
        return { particle: '148, 163, 184', glow: '94, 234, 212' };
      case 'cyan':
      default:
        return { particle: '34, 211, 238', glow: '59, 130, 246' };
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Initialize particle cluster
    const numParticles = Math.min(65, Math.floor((width * height) / 18000));
    const particles: Particle[] = [];

    for (let i = 0; i < numParticles; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        size: Math.random() * 2 + 1,
        alpha: Math.random() * 0.6 + 0.2,
      });
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;
      mouseRef.current.active = true;
    };

    const handleMouseLeave = () => {
      mouseRef.current.active = false;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const colors = getThemeColors(theme);

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw faint ambient background pulse
      const time = Date.now() * 0.0005;
      const gradient = ctx.createRadialGradient(
        width * 0.5 + Math.sin(time) * 100,
        height * 0.3 + Math.cos(time) * 50,
        50,
        width * 0.5,
        height * 0.5,
        Math.max(width, height) * 0.8
      );
      gradient.addColorStop(0, `rgba(${colors.glow}, 0.05)`);
      gradient.addColorStop(0.5, `rgba(${colors.glow}, 0.02)`);
      gradient.addColorStop(1, 'rgba(3, 7, 18, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Update and render particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        p.x += p.vx;
        p.y += p.vy;

        // Bounce at boundaries
        if (p.x < 0 || p.x > width) p.vx *= -1;
        if (p.y < 0 || p.y > height) p.vy *= -1;

        // Mouse interaction attraction/repulsion
        if (mouseRef.current.active) {
          const dx = mouseRef.current.x - p.x;
          const dy = mouseRef.current.y - p.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 140) {
            const force = (140 - dist) / 140;
            p.x -= (dx / dist) * force * 1.5;
            p.y -= (dy / dist) * force * 1.5;
          }
        }

        // Draw particle dot
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${colors.particle}, ${p.alpha})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${colors.glow}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;

        // Connect nearby particles
        for (let j = i + 1; j < particles.length; j++) {
          const p2 = particles[j];
          const dx = p.x - p2.x;
          const dy = p.y - p2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.18;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.strokeStyle = `rgba(${colors.particle}, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 transition-opacity duration-700"
    />
  );
};
