import './index.css';

import { initButton } from './components/button.js';
import { initInput } from './components/input.js';
import { initTextarea } from './components/textarea.js';
import { initCodeblocks } from './components/codeblock.js';
import { initDropdown } from './components/dropdown.js';
import { initContextMenu } from './components/contextMenu.js';
import { initThemeToggle } from './components/darkToggle.js';
import { initSwitch } from './components/switch.js';
import { initIcon } from './components/icon.js';
import { initAlert } from './components/alert.js';
import { initCard } from './components/card.js';
import { initNavbar } from './components/navbar.js';
import { initNavDropdown } from './components/navbarDropdown.js';
import { initCheckbox } from './components/checkbox.js';
import { initPopover } from './components/popover.js';
import { initModal } from './components/modal.js';
import { initWindow } from './components/window.js';
import { initTable } from './components/table.js';
import { initNotification } from './components/notification.js';
import { initSidebar } from './components/sidebar.js';
import { initLayout } from './components/layout.js';
import { initLaravelSupport } from './components/laravelSupport.js';

function initAll(config = {}) {
  initButton();
  initInput();
  initTextarea();
  initCodeblocks();
  initDropdown();
  initSwitch();
  initContextMenu();
  initThemeToggle();
  initIcon();
  initAlert(config.alert || {});
  initCard();
  initNavbar();
  initNavDropdown();
  initCheckbox();
  initPopover();
  initModal();
  initWindow();
  initTable();
  initNotification();
  initSidebar();
  initLayout();
  initLaravelSupport();
}

export { initAll };
