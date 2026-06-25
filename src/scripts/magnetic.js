const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if (!reduced) {
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });

    btn.addEventListener('pointerleave', () => {
      btn.style.transform = '';
    });
  });
}
