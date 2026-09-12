import { useEffect, useRef } from "react";

// Compact 2D simplex noise (Gustavson-style port), seeded for deterministic output.
class SimplexNoise {
  private perm = new Uint8Array(512);

  constructor(seed: number) {
    const p = new Uint8Array(256);
    for (let i = 0; i < 256; i++) p[i] = i;
    let n = seed >>> 0 || 1;
    for (let i = 255; i > 0; i--) {
      n = (n * 1664525 + 1013904223) >>> 0;
      const j = n % (i + 1);
      const tmp = p[i];
      p[i] = p[j];
      p[j] = tmp;
    }
    for (let i = 0; i < 512; i++) this.perm[i] = p[i & 255];
  }

  private grad(hash: number, x: number, y: number) {
    const h = hash & 7;
    const u = h < 4 ? x : y;
    const v = h < 4 ? y : x;
    return (h & 1 ? -u : u) + (h & 2 ? -2 * v : 2 * v);
  }

  noise2D(xin: number, yin: number) {
    const F2 = 0.5 * (Math.sqrt(3) - 1);
    const G2 = (3 - Math.sqrt(3)) / 6;
    const s = (xin + yin) * F2;
    const i = Math.floor(xin + s);
    const j = Math.floor(yin + s);
    const t = (i + j) * G2;
    const x0 = xin - (i - t);
    const y0 = yin - (j - t);
    const i1 = x0 > y0 ? 1 : 0;
    const j1 = x0 > y0 ? 0 : 1;
    const x1 = x0 - i1 + G2;
    const y1 = y0 - j1 + G2;
    const x2 = x0 - 1 + 2 * G2;
    const y2 = y0 - 1 + 2 * G2;
    const ii = i & 255;
    const jj = j & 255;
    const gi0 = this.perm[ii + this.perm[jj]];
    const gi1 = this.perm[ii + i1 + this.perm[jj + j1]];
    const gi2 = this.perm[ii + 1 + this.perm[jj + 1]];

    let n0 = 0;
    let t0 = 0.5 - x0 * x0 - y0 * y0;
    if (t0 >= 0) {
      t0 *= t0;
      n0 = t0 * t0 * this.grad(gi0, x0, y0);
    }
    let n1 = 0;
    let t1 = 0.5 - x1 * x1 - y1 * y1;
    if (t1 >= 0) {
      t1 *= t1;
      n1 = t1 * t1 * this.grad(gi1, x1, y1);
    }
    let n2 = 0;
    let t2 = 0.5 - x2 * x2 - y2 * y2;
    if (t2 >= 0) {
      t2 *= t2;
      n2 = t2 * t2 * this.grad(gi2, x2, y2);
    }
    return 70 * (n0 + n1 + n2);
  }
}

const LINE_COUNT = 16;
const SAMPLE_STEP = 8;
const WARP_RADIUS = 200;

export function TopoField({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const noise = new SimplexNoise(7);
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    let width = 0;
    let height = 0;
    let rafId = 0;
    let time = 0;

    const mouse = { x: -9999, y: -9999, lastX: 0, lastY: 0, energy: 0 };

    function resize() {
      const rect = canvas!.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas!.width = width * dpr;
      canvas!.height = height * dpr;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function onPointerMove(e: PointerEvent) {
      const rect = canvas!.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const speed = Math.hypot(x - mouse.lastX, y - mouse.lastY);
      mouse.lastX = x;
      mouse.lastY = y;
      mouse.x = x;
      mouse.y = y;
      const boost = e.buttons ? 0.7 : 0.18;
      mouse.energy = Math.min(1.8, mouse.energy + speed * 0.025 + boost);
    }

    function onPointerLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    function draw() {
      ctx!.clearRect(0, 0, width, height);
      const gap = height / (LINE_COUNT - 1);

      for (let li = 0; li < LINE_COUNT; li++) {
        const baseY = gap * li;
        ctx!.beginPath();
        for (let x = 0; x <= width; x += SAMPLE_STEP) {
          let y =
            baseY + noise.noise2D(x * 0.0032, li * 0.42 + time) * 24;

          const dist = Math.hypot(x - mouse.x, baseY - mouse.y);
          if (dist < WARP_RADIUS) {
            const falloff = (1 - dist / WARP_RADIUS) ** 2;
            y -= falloff * (30 + mouse.energy * 46);
          }

          if (x === 0) ctx!.moveTo(x, y);
          else ctx!.lineTo(x, y);
        }
        const mix = li / (LINE_COUNT - 1);
        const r = Math.round(88 + mix * 90);
        const g = Math.round(199 - mix * 55);
        const b = Math.round(245 - mix * 10);
        ctx!.strokeStyle = `rgba(${r}, ${g}, ${b}, ${0.05 + mix * 0.05})`;
        ctx!.lineWidth = 1;
        ctx!.stroke();
      }
    }

    function loop() {
      time += 0.0026;
      mouse.energy *= 0.94;
      draw();
      rafId = requestAnimationFrame(loop);
    }

    resize();
    window.addEventListener("resize", resize);

    if (reduceMotion) {
      draw();
    } else {
      window.addEventListener("pointermove", onPointerMove, { passive: true });
      window.addEventListener("pointerleave", onPointerLeave);
      rafId = requestAnimationFrame(loop);
    }

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <canvas ref={canvasRef} className={className} aria-hidden="true" />;
}
