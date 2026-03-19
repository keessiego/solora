import './index.css';

import { initCodeblocks } from './components/codeblock.js';
import { initDropdowns } from './components/dropdown.js';
import { initContextMenu } from './components/contextMenu.js';
import { initThemeToggle } from './components/darkToggle.js';

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initCodeblocks();
    initDropdowns();
    initContextMenu();
    initThemeToggle();
  });
}

export { initCodeblocks, initDropdowns, initContextMenu, initThemeToggle };