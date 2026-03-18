import Prism from 'prismjs';

// --- Optioneel: alle talen importeren (vergeet dit niet in je bundler te ondersteunen) ---
import 'prismjs/components/index.js'; // Dit laadt alle standaard talen

export function initCodeblocks() {
  const blocks = document.querySelectorAll('.codeblock');

  blocks.forEach(block => {
    const pre = block.querySelector('pre');
    const copyBtn = block.querySelector('.pre-copy-btn');
    const closeBtn = block.querySelector('.close-btn');
    const minimizeBtn = block.querySelector('.minimize-btn');
    const preContent = block.querySelector('.pre-content');

    if (!pre || !preContent) return;

    // Verplaats de copy button naar het begin van preContent
    if (copyBtn) preContent.insertBefore(copyBtn, preContent.firstChild);

    // --- Copy button ---
    if (copyBtn && !copyBtn.dataset.bound) {
      copyBtn.dataset.bound = 'true';
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(pre.innerText);
          const oldText = copyBtn.innerText;
          copyBtn.innerText = 'Copied!';
          setTimeout(() => copyBtn.innerText = oldText, 1200);
        } catch (err) {
          console.error('Copy failed:', err);
        }
      });
    }

    // --- Prism syntax highlighting ---
    const code = pre.textContent;
    const lang = (pre.dataset.language || 'javascript').toLowerCase();

    if (!Prism.languages[lang]) {
      console.warn(`Language '${lang}' not loaded in Prism, using plaintext fallback.`);
      pre.textContent = code; // fallback
    } else {
      pre.innerHTML = Prism.highlight(code, Prism.languages[lang], lang);
    }

    // --- Draggable ---
    if (block.classList.contains('draggable')) makeDraggable(block);

    // --- Close button ---
    if (closeBtn) closeBtn.addEventListener('click', () => {
      block.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      block.style.opacity = 0;
      block.style.transform = 'scale(0.95)';
      setTimeout(() => block.remove(), 300);
    });

    // --- Minimize button ---
    if (minimizeBtn) minimizeBtn.addEventListener('click', () => {
      preContent.classList.toggle('collapsed');
    });

    // --- Maximize button ---
    const maximizeBtn = block.querySelector('.maximize-btn');
    if (maximizeBtn) initMaximizeButton(block, maximizeBtn);
  });
}

// --- Maximize logic los van initCodeblocks ---
function initMaximizeButton(block, maximizeBtn) {
  maximizeBtn.addEventListener('click', e => {
    e.stopPropagation();

    const scrollX = window.scrollX || window.pageXOffset;
    const scrollY = window.scrollY || window.pageYOffset;

    if (!block.dataset.origRect) {
      const rect = block.getBoundingClientRect();
      block.dataset.origRect = JSON.stringify({
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        width: rect.width,
        height: rect.height
      });
    }

    void block.offsetWidth; // force reflow

    if (block.dataset.isFullscreen !== "true") {
      const rect = block.getBoundingClientRect();
      const startRect = { top: rect.top + scrollY, left: rect.left + scrollX, width: rect.width, height: rect.height };

      Object.assign(block.style, {
        position: 'fixed',
        top: `${startRect.top}px`,
        left: `${startRect.left}px`,
        width: `${startRect.width}px`,
        height: `${startRect.height}px`,
        margin: '0',
        zIndex: 9999,
        transition: 'all 0.3s ease'
      });

      void block.offsetWidth; // trigger animation
      Object.assign(block.style, { top: '0', left: '0', width: '100%', height: '100%', borderRadius: '0' });
      block.dataset.isFullscreen = "true";

    } else {
      const origRect = JSON.parse(block.dataset.origRect);
      Object.assign(block.style, {
        transition: 'all 0.3s ease',
        top: `${origRect.top}px`,
        left: `${origRect.left}px`,
        width: `${origRect.width}px`,
        height: 'auto',
        borderRadius: '12px'
      });

      block.addEventListener('transitionend', () => {
        Object.assign(block.style, {
          transition: '',
          position: '',
          top: '',
          left: '',
          width: '',
          height: '',
          zIndex: ''
        });
        block.dataset.isFullscreen = "false";
      }, { once: true });
    }
  });
}

// --- Draggable helper ---
function makeDraggable(element) {
  const header = element.querySelector('.pre-top');
  if (!header) return;

  let offsetX = 0, offsetY = 0, isDragging = false;
  header.style.cursor = 'move';

  header.addEventListener('mousedown', onMouseDown);

  header.querySelectorAll('span, button').forEach(btn => {
    btn.addEventListener('mousedown', e => e.stopPropagation());
  });

  function onMouseDown(e) {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    Object.assign(element.style, { width: `${rect.width}px`, position: 'absolute', zIndex: 9999 });
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (element.dataset.isFullscreen === "true" || !isDragging) return;

    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;

    Object.assign(element.style, { left: `${left}px`, top: `${top}px` });
    element.dataset.currentRect = JSON.stringify({ top, left, width: element.offsetWidth, height: element.offsetHeight });
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}