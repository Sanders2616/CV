const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const counters = document.querySelectorAll('.counter');

if (!reduced && counters.length) {
  const targets = new Map();

  counters.forEach((el) => {
    const raw = el.textContent.trim();
    const target = parseFloat(raw);
    if (Number.isNaN(target)) return;
    const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
    targets.set(el, { target, decimals });
    el.textContent = decimals ? (0).toFixed(decimals) : '0';
  });

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        const el = entry.target;
        const data = targets.get(el);
        if (!data) continue;
        observer.unobserve(el);

        const { target, decimals } = data;
        const duration = 1200;
        const start = performance.now();

        function tick(now) {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const value = eased * target;
          el.textContent = decimals ? value.toFixed(decimals) : Math.round(value).toString();
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      }
    },
    { threshold: 0.4 }
  );

  counters.forEach((el) => observer.observe(el));
}
