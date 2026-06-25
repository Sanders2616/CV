<script>
  import { onMount } from 'svelte';

  /** @type {HTMLCanvasElement} */
  let canvasEl;
  /** @type {HTMLDivElement} */
  let wrapEl;

  const glyphs = '01ACCTEXPBALDUE$#01010110'.split('');
  const fontSize = 15;
  const orbColors = ['249, 168, 212', '192, 132, 252', '244, 114, 182'];

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced || !canvasEl) return;

    const canvas = canvasEl;
    const ctx = canvas.getContext('2d');
    let columns = 0;
    let drops = [];
    let raf = 0;
    let width = 0;
    let height = 0;
    let t = 0;
    let hasPointer = false;

    // "Antigravity" swarm: a handful of soft glowing orbs that drift weightlessly
    // and ease toward the cursor, each at its own lag, like dust caught in a field.
    const orbs = Array.from({ length: 10 }, (_, i) => ({
      x: 0,
      y: 0,
      lag: 0.02 + Math.random() * 0.05,
      amp: 8 + Math.random() * 14,
      freq: 0.4 + Math.random() * 0.6,
      phase: Math.random() * Math.PI * 2,
      radius: 14 + Math.random() * 22,
      color: orbColors[i % orbColors.length]
    }));
    const target = { x: 0, y: 0 };

    function setup() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Math.max(1, Math.floor(width / fontSize));
      drops = Array.from({ length: columns }, () => Math.random() * -100);
      target.x = width / 2;
      target.y = height / 2;
      for (const o of orbs) {
        o.x = target.x;
        o.y = target.y;
      }
    }

    function frame() {
      t += 1;
      ctx.fillStyle = 'rgba(15, 11, 18, 0.16)';
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px "Space Mono", monospace`;
      ctx.textBaseline = 'top';

      for (let i = 0; i < columns; i++) {
        const x = i * fontSize;
        const y = drops[i] * fontSize;
        const glyph = glyphs[Math.floor(Math.random() * glyphs.length)];

        if (y > 0 && y < height) {
          ctx.fillStyle = 'rgba(249, 168, 212, 0.9)';
          ctx.fillText(glyph, x, y);
          ctx.fillStyle = 'rgba(192, 132, 252, 0.35)';
          ctx.fillText(glyphs[Math.floor(Math.random() * glyphs.length)], x, y - fontSize);
        }

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0;
        } else {
          drops[i] += 0.35 + Math.random() * 0.25;
        }
      }

      // when no real pointer yet, let the swarm wander on its own slow orbit
      if (!hasPointer) {
        target.x = width / 2 + Math.cos(t * 0.006) * width * 0.22;
        target.y = height / 2 + Math.sin(t * 0.008) * height * 0.18;
      }

      ctx.globalCompositeOperation = 'lighter';
      for (const o of orbs) {
        o.x += (target.x - o.x) * o.lag;
        o.y += (target.y - o.y) * o.lag;
        const fx = o.x + Math.cos(t * 0.02 * o.freq + o.phase) * o.amp;
        const fy = o.y + Math.sin(t * 0.02 * o.freq + o.phase) * o.amp;

        const gradient = ctx.createRadialGradient(fx, fy, 0, fx, fy, o.radius);
        gradient.addColorStop(0, `rgba(${o.color}, 0.22)`);
        gradient.addColorStop(1, `rgba(${o.color}, 0)`);
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(fx, fy, o.radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalCompositeOperation = 'source-over';

      raf = requestAnimationFrame(frame);
    }

    function onMouseMove(e) {
      if (!wrapEl) return;
      const ratio = e.clientX / window.innerWidth - 0.5;
      wrapEl.style.transform = `translate3d(${ratio * -10}px, 0, 0)`;

      const rect = canvas.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      hasPointer = true;
    }

    setup();
    raf = requestAnimationFrame(frame);

    const resizeObserver = new ResizeObserver(() => setup());
    resizeObserver.observe(canvas);
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      window.removeEventListener('mousemove', onMouseMove);
    };
  });
</script>

<div class="canvas-wrap" bind:this={wrapEl} aria-hidden="true">
  <canvas bind:this={canvasEl}></canvas>
</div>

<style>
  .canvas-wrap {
    position: absolute;
    inset: -2% -6%;
    z-index: 0;
    transition: transform 0.3s ease-out;
  }
  canvas {
    width: 100%;
    height: 100%;
    display: block;
  }
</style>
