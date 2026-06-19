import { useEffect, useRef } from 'react';
import { createNoise2D } from 'simplex-noise';

const noise2D = createNoise2D();

function initParticles(canvas: HTMLCanvasElement) {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  canvas.width = window.innerWidth * dpr;
  canvas.height = window.innerHeight * dpr;
  const area = window.innerWidth * window.innerHeight;
  const BASE_COUNT = Math.round(area * 0.0032);
  return {
    dpr,
    PARTICLE_COUNT: Math.min(BASE_COUNT, 2800),
    CONNECTION_DIST: 118,
    MOUSE_RADIUS: 169,
    BASE_SPEED: 0.73,
  };
}

interface ParticleData {
  w: number;
  h: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseColor: number;
  alpha: number;
  angle: number;
  color: string;
  noise: ReturnType<typeof createNoise2D>;
}

function createParticle(w: number, h: number, noise: ReturnType<typeof createNoise2D>): ParticleData {
  const p: ParticleData = {
    w, h, x: 0, y: 0, vx: 0, vy: 0,
    radius: 0, baseColor: 0, alpha: 0, angle: 0,
    color: '26, 42, 74', noise,
  };
  resetParticle(p, true);
  return p;
}

function resetParticle(p: ParticleData, initial: boolean) {
  p.x = initial ? Math.random() * p.w : (Math.random() < 0.5 ? -20 : p.w + 20);
  p.y = initial ? Math.random() * p.h : Math.random() * p.h;
  p.angle = p.noise(p.x * 0.005, p.y * 0.005) * Math.PI * 2;
  p.vx = Math.cos(p.angle);
  p.vy = Math.sin(p.angle);
  p.radius = Math.random() * 1.5 + 0.5;
  p.baseColor = Math.random();
  p.alpha = Math.random() * 0.5 + 0.2;
}

interface Theme {
  name: string;
  background: string;
  palette: (hue: number) => string;
}

const THEMES: Record<string, Theme> = {
  NAVY: {
    name: 'navy',
    background: '245, 245, 240',
    palette: (hue: number) => hue < 0.5 ? '26, 42, 74' : '0, 102, 204',
  },
  NAVY_AMBER: {
    name: 'navy_amber',
    background: '245, 245, 240',
    palette: (hue: number) => hue < 0.3 ? '26, 42, 74' : hue < 0.7 ? '0, 102, 204' : '255, 184, 0',
  },
  AMBER: {
    name: 'amber',
    background: '245, 245, 240',
    palette: (hue: number) => hue < 0.4 ? '255, 184, 0' : '26, 42, 74',
  },
};

function updateParticle(
  p: ParticleData,
  speed: number,
  mouse: { x: number; y: number; vx: number; vy: number; active: boolean },
  _connectionDist: number,
  mouseRadius: number,
  time: number,
  colorShift: number,
  activePalette: (hue: number) => string
) {
  const mx = mouse.x;
  const my = mouse.y;
  const mvx = mouse.vx;
  const mvy = mouse.vy;

  const dx = mx - p.x;
  const dy = my - p.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  const noiseAngle = p.noise(p.x * 0.005 + time * 0.0002, p.y * 0.005 + time * 0.0003) * Math.PI * 4;
  const flowAngle = noiseAngle + Math.sin(time * 0.001 + p.baseColor * 10) * 0.5;

  p.vx += (Math.cos(flowAngle) - p.vx) * 0.04;
  p.vy += (Math.sin(flowAngle) - p.vy) * 0.04;

  if (dist < mouseRadius && dist > 1) {
    const force = (mouseRadius - dist) / mouseRadius;
    const angle = Math.atan2(dy, dx);
    p.vx += Math.cos(angle) * force * 0.3 + mvx * 0.15;
    p.vy += Math.sin(angle) * force * 0.3 + mvy * 0.15;
  }

  const vel = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
  if (vel > 1.5) {
    p.vx = (p.vx / vel) * 1.5;
    p.vy = (p.vy / vel) * 1.5;
  }

  p.x += p.vx * speed;
  p.y += p.vy * speed;

  const dCenter = Math.sqrt((p.x - p.w / 2) ** 2 + (p.y - p.h / 2) ** 2);
  const maxDCenter = Math.sqrt((p.w / 2) ** 2 + (p.h / 2) ** 2);
  const distFactor = dCenter / maxDCenter;

  if (colorShift > 0) {
    const mouseHueShift = colorShift * 0.4;
    const distHueShift = distFactor * 0.3;
    const adjustedHue = (p.baseColor + mouseHueShift - distHueShift) % 1;
    p.color = activePalette(adjustedHue);
  } else {
    const adjustedHue = p.baseColor % 1;
    p.color = activePalette(adjustedHue);
  }

  if (p.x < -30 || p.x > p.w + 30 || p.y < -30 || p.y > p.h + 30) {
    resetParticle(p, false);
  }
}

function drawParticle(ctx: CanvasRenderingContext2D, p: ParticleData) {
  ctx.beginPath();
  ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${p.color}, ${p.alpha})`;
  ctx.fill();
}

interface SpatialHash {
  [key: string]: ParticleData[];
}

function updateSpatialHash(particles: ParticleData[], cellSize: number): SpatialHash {
  const hash: SpatialHash = {};
  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const key = (Math.floor(p.x / cellSize) | 0) + ',' + (Math.floor(p.y / cellSize) | 0);
    if (!hash[key]) hash[key] = [];
    hash[key].push(p);
  }
  return hash;
}

function drawConnections(
  ctx: CanvasRenderingContext2D,
  particles: ParticleData[],
  spatialHash: SpatialHash,
  cellSize: number,
  maxDist: number,
  mouse: { x: number; y: number; active: boolean },
  mouseRadius: number
) {
  const maxDistSq = maxDist * maxDist;
  const distAlphaScale = maxDistSq > 0 ? 12 / maxDistSq : 0;
  const mouseX = mouse.x;
  const mouseY = mouse.y;
  const mActive = mouse.active;

  for (let i = 0; i < particles.length; i++) {
    const p = particles[i];
    const cellX = Math.floor(p.x / cellSize) | 0;
    const cellY = Math.floor(p.y / cellSize) | 0;

    for (let ddx = -1; ddx <= 1; ddx++) {
      for (let ddy = -1; ddy <= 1; ddy++) {
        const neighborKey = (cellX + ddx) + ',' + (cellY + ddy);
        const neighbors = spatialHash[neighborKey];
        if (!neighbors) continue;

        for (let j = 0; j < neighbors.length; j++) {
          const n = neighbors[j];
          if (n.x > p.x || (n.x === p.x && n.y >= p.y)) continue;

          const dx = p.x - n.x;
          const dy = p.y - n.y;
          const distSq = dx * dx + dy * dy;

          if (distSq >= maxDistSq) continue;

          const alpha = 1 - distSq * distAlphaScale;

          let mouseBoost = 0;
          if (mActive) {
            const mdx = (p.x + n.x) * 0.5 - mouseX;
            const mdy = (p.y + n.y) * 0.5 - mouseY;
            const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
            if (mDist < mouseRadius) {
              mouseBoost = (1 - mDist / mouseRadius) * 0.5;
            }
          }

          if (alpha + mouseBoost < 0.1) continue;

          ctx.strokeStyle = `rgba(${p.color}, ${(alpha + mouseBoost) * 0.25})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(n.x, n.y);
          ctx.stroke();
        }
      }
    }
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      const ctx = canvas.getContext('2d');
      if (!ctx) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      ctx.scale(dpr, dpr);
      ctx.fillStyle = '#1B2A4A';
      ctx.fillRect(0, 0, window.innerWidth, window.innerHeight);
      return;
    }

    const ctx = canvas.getContext('2d')!;
    let { dpr, PARTICLE_COUNT, CONNECTION_DIST, MOUSE_RADIUS, BASE_SPEED } = initParticles(canvas);

    const isMobile = window.innerWidth < 768;
    if (isMobile) {
      const area = window.innerWidth * window.innerHeight;
      PARTICLE_COUNT = Math.min(Math.round(area * 0.0016), 1200);
      MOUSE_RADIUS = 0;
    }

    const particles: ParticleData[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push(createParticle(canvas.width, canvas.height, noise2D));
    }

    const mouse = {
      x: -1000,
      y: -1000,
      vx: 0,
      vy: 0,
      active: false,
      prevX: -1000,
      prevY: -1000,
    };

    let currentTheme = THEMES.NAVY;
    let colorShift = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.vx = e.clientX - mouse.prevX;
      mouse.vy = e.clientY - mouse.prevY;
      mouse.prevX = e.clientX;
      mouse.prevY = e.clientY;
      mouse.x = (e.clientX - rect.left) * dpr;
      mouse.y = (e.clientY - rect.top) * dpr;
      mouse.active = true;

      if (!isMobile) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = (e.clientY - rect.top) / rect.height;

        if (nx > 0.7 && ny < 0.3) {
          currentTheme = THEMES.AMBER;
        } else if (nx < 0.3 && ny > 0.7) {
          currentTheme = THEMES.NAVY_AMBER;
        } else {
          currentTheme = THEMES.NAVY;
        }

        colorShift = Math.sqrt((nx - 0.5) ** 2 + (ny - 0.5) ** 2) * 2;
      }
    };

    const handleMouseLeave = () => {
      mouse.active = false;
      mouse.vx = 0;
      mouse.vy = 0;
    };

    let animFrameId: number;

    function animate(time: number) {
      ctx.fillStyle = 'rgba(' + currentTheme.background + ', 0.35)';
      ctx.fillRect(0, 0, canvas!.width, canvas!.height);

      const cellSize = CONNECTION_DIST;
      const hash = updateSpatialHash(particles, cellSize);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        updateParticle(p, BASE_SPEED, mouse, CONNECTION_DIST, MOUSE_RADIUS, time, colorShift, currentTheme.palette);
      }

      drawConnections(ctx, particles, hash, cellSize, CONNECTION_DIST, mouse, MOUSE_RADIUS);

      for (let i = 0; i < particles.length; i++) {
        drawParticle(ctx, particles[i]);
      }

      animFrameId = requestAnimationFrame(animate);
    }

    animFrameId = requestAnimationFrame(animate);

    const handleResize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      for (let i = 0; i < particles.length; i++) {
        particles[i].w = canvas.width;
        particles[i].h = canvas.height;
      }
    };

    const handleVisibility = () => {
      if (document.hidden) {
        BASE_SPEED = 0.1;
      } else {
        BASE_SPEED = 0.73;
        if (isMobile) BASE_SPEED = 0.73;
      }
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', handleResize);
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
      cancelAnimationFrame(animFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: 0,
        pointerEvents: 'none',
      }}
    />
  );
}
