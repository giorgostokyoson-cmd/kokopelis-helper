// V5.1 — persistent dice-roll popup behavior
(function () {
  let closeListener = null;
  let armTimer = null;

  function escapeRollText(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function closeRollFx() {
    const fx = document.getElementById('rollFx');
    if (fx) fx.classList.remove('show');
    if (closeListener) {
      document.removeEventListener('pointerdown', closeListener, true);
      closeListener = null;
    }
    if (armTimer) {
      clearTimeout(armTimer);
      armTimer = null;
    }
  }

  // Override the original timed roll popup. The popup now remains visible
  // until the next click/tap anywhere on the page.
  window.showFx = function (title, total, sub = '', type = 'damage', faces = []) {
    const fx = document.getElementById('rollFx');
    if (!fx) return;

    closeRollFx();
    fx.className = 'roll-fx';
    void fx.offsetWidth;

    const shownFaces = (faces.length ? faces.slice(0, 14) : [total]);
    fx.innerHTML = `
      <div class="roll-title">${escapeRollText(title)}</div>
      <div class="roll-total">${escapeRollText(total)}</div>
      <div class="roll-sub">${escapeRollText(sub)}</div>
      <div class="dice-burst">${shownFaces.map(x => `<i><span>${escapeRollText(x)}</span></i>`).join('')}</div>
      <div class="roll-close-hint">Click anywhere to close</div>
    `;

    fx.classList.add(type, 'show');

    // Arm after the roll-triggering click has finished so the popup does not
    // immediately dismiss itself.
    armTimer = setTimeout(() => {
      closeListener = function () {
        closeRollFx();
      };
      document.addEventListener('pointerdown', closeListener, { capture: true, once: true });
      armTimer = null;
    }, 60);
  };

  window.closeRollFx = closeRollFx;
})();
