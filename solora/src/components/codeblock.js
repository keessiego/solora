import Prism from 'prismjs';
import 'prismjs/components/prism-javascript';

export function initCodeblocks() {
  const blocks = document.querySelectorAll('.codeblock');

  blocks.forEach(block => {
    const pre = block.querySelector('pre');
    const copyBtn = block.querySelector('.pre-copy-btn');
    const closeBtn = block.querySelector('.close-btn');
    const minimizeBtn = block.querySelector('.minimize-btn');
    const preContent = block.querySelector('.pre-content');

    if (!pre || !preContent) return;

      if (preContent && copyBtn) {
        // Verplaats de knop naar het begin van preContent
        preContent.insertBefore(copyBtn, preContent.firstChild);
      }

    // --- Copy button logic ---
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
    const lang = pre.dataset.language || 'javascript';
    if (!Prism.languages[lang]) {
      console.warn(`Language '${lang}' not loaded in Prism`);
      return;
    }
    pre.innerHTML = Prism.highlight(code, Prism.languages[lang], lang);

    // --- Draggable logic ---
    if (block.classList.contains('draggable')) {
      makeDraggable(block);
    }

    // --- Close button ---
    if (closeBtn) {
      closeBtn.addEventListener('click', () => {
        block.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        block.style.opacity = 0;
        block.style.transform = 'scale(0.95)';
        setTimeout(() => block.remove(), 300);
      });
    }

    // --- Minimize button ---
    if (minimizeBtn) {
      minimizeBtn.addEventListener('click', () => {
        preContent.classList.toggle('collapsed');
      });
    }


    const maximizeBtn = block.querySelector('.maximize-btn');




    if (maximizeBtn) {
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

    // force reflow
    void block.offsetWidth;

    if (block.dataset.isFullscreen !== "true") {
      // --- naar fullscreen ---
      const rect = block.getBoundingClientRect();
      const startRect = {
        top: rect.top + scrollY,
        left: rect.left + scrollX,
        width: rect.width,
        height: rect.height
      };

      // zet eerst inline styles zodat animatie loopt
      block.style.position = 'fixed';
      block.style.top = `${startRect.top}px`;
      block.style.left = `${startRect.left}px`;
      block.style.width = `${startRect.width}px`;
      block.style.height = `${startRect.height}px`;
      block.style.margin = '0';
      block.style.zIndex = 9999;
      block.style.transition = 'all 0.3s ease';

      // force reflow om animatie te triggeren
      void block.offsetWidth;

      // animatie naar fullscreen
      block.style.top = '0';
      block.style.left = '0';
      block.style.width = '100%';
      block.style.height = '100%';
      block.style.borderRadius = '0';

      block.dataset.isFullscreen = "true";

    } else {
      // --- terug naar normaal ---
      let rectToUse;
      if (block.dataset.currentRect) {
        // ooit verplaatst, animatie naar currentRect
        rectToUse = JSON.parse(block.dataset.currentRect);
        block.style.transition = 'all 0.3s ease';
        block.style.top = `${rectToUse.top}px`;
        block.style.left = `${rectToUse.left}px`;
        block.style.width = `${rectToUse.width}px`;
        block.style.height = `auto`;
        block.style.borderRadius = '12px';

        block.addEventListener('transitionend', () => {
          block.style.transition = '';
          block.style.position = 'absolute';
          block.style.zIndex = '';
          block.dataset.isFullscreen = "false";
        }, { once: true });

      } else {
        // nooit verplaatst, animatie naar origRect maar blijf in flow
        const origRect = JSON.parse(block.dataset.origRect);
        block.style.transition = 'all 0.3s ease';
        block.style.top = `${origRect.top}px`;
        block.style.left = `${origRect.left}px`;
        block.style.width = `${origRect.width}px`;
        block.style.height = `auto`;
        block.style.borderRadius = '12px';

        block.addEventListener('transitionend', () => {
          block.style.transition = '';
          // verwijder fixed/absolute styling om terug te gaan naar normale flow
          block.style.position = '';
          block.style.top = '';
          block.style.left = '';
          block.style.width = '';
          block.style.height = '';
          block.style.zIndex = '';
          block.dataset.isFullscreen = "false";
        }, { once: true });
      }
    }
  });
}




  });
}

function makeDraggable(element) {
  const header = element.querySelector('.pre-top');
  if (!header) return;

  let offsetX = 0;
  let offsetY = 0;
  let isDragging = false;

  header.style.cursor = 'move';

  header.addEventListener('mousedown', onMouseDown);

  const buttons = header.querySelectorAll('span, button');
  buttons.forEach(btn => {
    btn.addEventListener('mousedown', e => e.stopPropagation());
  });

  function onMouseDown(e) {
    isDragging = true;
    const rect = element.getBoundingClientRect();
    offsetX = e.clientX - rect.left;
    offsetY = e.clientY - rect.top;

    element.style.width = `${rect.width}px`;
    element.style.position = 'absolute';
    element.style.zIndex = 9999;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }

  function onMouseMove(e) {
    if (element.dataset.isFullscreen === "true") return;

    if (!isDragging) return;
    const left = e.clientX - offsetX;
    const top = e.clientY - offsetY;
    element.style.left = `${left}px`;
    element.style.top = `${top}px`;

    // bijhouden van de laatste positie
    element.dataset.currentRect = JSON.stringify({
      top: top,
      left: left,
      width: element.offsetWidth,
      height: element.offsetHeight
    });
  }

  function onMouseUp() {
    isDragging = false;
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
  }
}