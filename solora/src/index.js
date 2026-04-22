import './index.css';

import { initCodeblocks } from './components/codeblock.js';
import { initDropdowns } from './components/dropdown.js';
import { initContextMenu } from './components/contextMenu.js';
import { initThemeToggle } from './components/darkToggle.js';
import { initSwitch } from './components/switch.js';

function initAll() {
  initCodeblocks();
  initDropdowns();
  initSwitch();
  initContextMenu();
  initThemeToggle();
}

export { initAll };