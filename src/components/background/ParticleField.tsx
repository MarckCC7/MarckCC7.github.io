import { useEffect, useRef } from 'react';

import { usePrefersReducedMotion } from '@hooks/useMediaQuery';

interface Particle {
  x: number;
  y: number;
  radius: number;
  /** Vertical drift, px per second. Negative floats upward. */
  vy: number;
  /** Horizontal sway amplitude and phase. */
  amplitude: number;
  phase: number;
  speed: number;
  alpha: number;
  /** 0 = pollen (soft dot), 1 = leaf (rotating quad). */
  kind: 0 | 1;
  rotation: number;
  spin: number;
  hue: 'moss' | 'azure';
}

/** One particle per this many square pixels, hard-capped below. */
const AREA_PER_PARTICLE = 26_000;
const MAX_PARTICLES = 70;
const MAX_DPR = 2;

/**
 * Pollen and leaves drifting through the garden.
 *
 * Written directly against canvas instead of pulling in a particle library:
 * the whole effect is ~120 lines, has no dependencies to keep current for the
 * next decade, and stays fully under our control for the details that matter —
 * pausing off-screen, respecting reduced motion, and capping device pixel ratio
 * so a 4K display does not quietly quadruple the fill cost.
 */
export function ParticleField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const styles = getComputedStyle(document.documentElement);
    const colours = {
      moss: styles.getPropertyValue('--moss-300').trim() || '#8fcaac',
      azure: styles.getPropertyValue('--azure-400').trim() || '#7a9eff',
    };
    const globalAlpha = Number(styles.getPropertyValue('--particle-alpha')) || 0.5;

    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let lastTime = performance.now();
    let running = true;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const rect = canvas.getBoundingClientRect();

      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const target = Math.min(Math.round((width * height) / AREA_PER_PARTICLE), MAX_PARTICLES);
      particles = Array.from({ length: target }, () => spawn(width, height));
    };

    const draw = (time: number) => {
      // Seconds since the last frame, clamped so a backgrounded tab does not
      // teleport every particle when it wakes up.
      const delta = Math.min((time - lastTime) / 1000, 0.05);
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      for (const p of particles) {
        p.y += p.vy * delta;
        p.phase += p.speed * delta;
        p.rotation += p.spin * delta;

        const x = p.x + Math.sin(p.phase) * p.amplitude;

        // Wrap around instead of respawning: keeps density perfectly constant.
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        ctx.globalAlpha = p.alpha * globalAlpha;
        ctx.fillStyle = colours[p.hue];

        if (p.kind === 0) {
          ctx.beginPath();
          ctx.arc(x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // A leaf: a squashed, rotating quad. Cheaper than a bezier and
          // indistinguishable at this size.
          ctx.save();
          ctx.translate(x, p.y);
          ctx.rotate(p.rotation);
          ctx.beginPath();
          ctx.ellipse(0, 0, p.radius * 2.4, p.radius * 0.9, 0, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      ctx.globalAlpha = 1;
      if (running) frame = requestAnimationFrame(draw);
    };

    // Stop burning frames when the tab is hidden.
    const onVisibility = () => {
      running = document.visibilityState === 'visible';
      if (running) {
        lastTime = performance.now();
        frame = requestAnimationFrame(draw);
      } else {
        cancelAnimationFrame(frame);
      }
    };

    resize();

    if (reducedMotion) {
      // Draw a single static frame — the texture stays, the motion goes.
      draw(performance.now());
      cancelAnimationFrame(frame);
      running = false;
    } else {
      frame = requestAnimationFrame(draw);
    }

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [reducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={className}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

function spawn(width: number, height: number): Particle {
  const isLeaf = Math.random() > 0.78;

  return {
    x: Math.random() * width,
    y: Math.random() * height,
    radius: isLeaf ? 1.6 + Math.random() * 1.6 : 0.7 + Math.random() * 1.5,
    // Leaves fall, pollen floats up. Both slowly.
    vy: isLeaf ? 6 + Math.random() * 12 : -(3 + Math.random() * 9),
    amplitude: 12 + Math.random() * 34,
    phase: Math.random() * Math.PI * 2,
    speed: 0.12 + Math.random() * 0.3,
    alpha: 0.18 + Math.random() * 0.5,
    kind: isLeaf ? 1 : 0,
    rotation: Math.random() * Math.PI,
    spin: (Math.random() - 0.5) * 0.5,
    hue: Math.random() > 0.72 ? 'azure' : 'moss',
  };
}
