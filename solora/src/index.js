import './index.css';

import { initButton } from './components/button.js';
import { initInput } from './components/input.js';
import { initCodeblocks } from './components/codeblock.js';
import { initDropdown } from './components/dropdown.js';
import { initContextMenu } from './components/contextMenu.js';
import { initThemeToggle } from './components/darkToggle.js';
import { initSwitch } from './components/switch.js';
import { initIcon } from './components/icon.js';
import { initAlert } from './components/alert.js';
import { initCard } from './components/card.js';
import { initNavbar } from './components/navbar.js';
import { initCheckbox } from './components/checkbox.js';
import { initPopover } from './components/popover.js';

function initAll(config = {}) {
  initButton();
  initInput();
  initCodeblocks();
  initDropdown();
  initSwitch();
  initContextMenu();
  initThemeToggle();
  initIcon();
  initAlert(config.alert || {});
  initCard();
  initNavbar();
  initCheckbox();
  initPopover();
}

export { initAll };
