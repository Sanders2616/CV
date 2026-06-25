<script>
  import { onMount } from 'svelte';

  /** @type {HTMLDivElement} */
  let dotEl;
  /** @type {HTMLDivElement} */
  let ringEl;

  onMount(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (reduced || !fine || !dotEl || !ringEl) return;

    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;
    let raf = 0;

    function onMove(e) {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dotEl.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    }

    function onOver(e) {
      const interactive = e.target.closest('a, button, .neu-card, .neu-pressed');
      ringEl.classList.toggle('is-active', Boolean(interactive));
    }

    function loop() {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;
      ringEl.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      raf = requestAnimationFrame(loop);
    }

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('mouseover', onOver, { passive: true });
    raf = requestAnimationFrame(loop);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      cancelAnimationFrame(raf);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseover', onOver);
    };
  });
</script>

<div class="cursor-dot" bind:this={dotEl} aria-hidden="true"></div>
<div class="cursor-ring" bind:this={ringEl} aria-hidden="true"></div>

<style>
  .cursor-dot,
  .cursor-ring {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 9999;
    pointer-events: none;
    border-radius: 50%;
    will-change: transform;
  }
  .cursor-dot {
    width: 6px;
    height: 6px;
    margin: -3px 0 0 -3px;
    background: var(--color-accent2);
    box-shadow: 0 0 10px var(--color-accent2);
  }
  .cursor-ring {
    width: 34px;
    height: 34px;
    margin: -17px 0 0 -17px;
    border: 1.5px solid rgba(244, 114, 182, 0.5);
    transition: width 0.25s ease, height 0.25s ease, margin 0.25s ease, border-color 0.25s ease, background 0.25s ease;
  }
  .cursor-ring.is-active {
    width: 54px;
    height: 54px;
    margin: -27px 0 0 -27px;
    background: rgba(236, 72, 153, 0.08);
    border-color: rgba(236, 72, 153, 0.7);
  }
</style>
