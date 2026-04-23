import './index.css';

import { initButton } from './components/button.js';
import { initInput } from './components/input.js';
import { initCodeblocks } from './components/codeblock.js';
import { initDropdown } from './components/dropdown.js';
import { initContextMenu } from './components/contextMenu.js';
import { initThemeToggle } from './components/darkToggle.js';
import { initSwitch } from './components/switch.js';

function initAll() {
  initButton();
  initInput();
  initCodeblocks();
  initDropdown();
  initSwitch();
  initContextMenu();
  initThemeToggle();
}

export { initAll };