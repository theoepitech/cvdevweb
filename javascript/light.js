document.addEventListener('DOMContentLoaded', function () {
  const el = document.body;
  let time = 0;

  function frame() {
    time += 0.02;

    const base = 0.65;

    const wave1 = Math.sin(time * 1.5) * 0.08;
    const wave2 = Math.sin(time * 0.5) * 0.05;
    const rand = Math.sin(time * 3 + Math.random()) * 0.02;

    const a = Math.max(0.4, Math.min(0.85, base + wave1 + wave2 + rand));

    el.style.setProperty('--lamp-opacity', a.toFixed(2));

    requestAnimationFrame(frame);
  }

  frame();
});