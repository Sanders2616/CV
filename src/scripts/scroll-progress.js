const bar = document.getElementById('scroll-progress');

function update() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const pct = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  bar.style.width = `${pct}%`;
}

window.addEventListener('scroll', update, { passive: true });
window.addEventListener('resize', update, { passive: true });
update();
