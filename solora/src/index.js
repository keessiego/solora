import './index.css';

import { initCodeblocks } from './components/codeblock.js';

if (typeof window !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
    initCodeblocks();
  });
}

export { initCodeblocks };