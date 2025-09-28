document.addEventListener('DOMContentLoaded', () => {
  let layer = document.getElementById('bgfx');
  if (!layer) {
    layer = document.createElement('div');
    layer.id = 'bgfx';
    layer.setAttribute('aria-hidden', 'true');
    document.body.prepend(layer);
  }

  document.addEventListener('pointerover', (e) => {
    const col = e.target.closest('.zoom-card');
    if (!col) return;

    if (col.__rippleEntered) return;
    col.__rippleEntered = true;

    const inner = col.querySelector('.card');
    const target = inner || col;
    spawnRippleFor(target);

    const onLeave = (leaveEvt) => {
      if (!col.contains(leaveEvt.relatedTarget)) {
        col.__rippleEntered = false;
        col.removeEventListener('pointerout', onLeave, true);
      }
    };
    col.addEventListener('pointerout', onLeave, true);
  }, true);

  function spawnRippleFor(targetEl) {
    const rect = targetEl.getBoundingClientRect();

    const cx = rect.left + rect.width / 2;
    const cy = rect.top  + rect.height / 2;

    const diag = Math.hypot(rect.width, rect.height);
    const diameter = Math.ceil(diag * 2.2);

    const ripple = document.createElement('span');
    ripple.className = 'bg-ripple';
    ripple.style.left   = cx + 'px';
    ripple.style.top    = cy + 'px';
    ripple.style.width  = diameter + 'px';
    ripple.style.height = diameter + 'px';

    layer.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  }
});
