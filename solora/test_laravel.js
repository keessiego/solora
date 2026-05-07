import { initLaravelSupport } from './src/components/laravelSupport.js';

// Mock DOM
global.document = {
    readyState: 'loading',
    addEventListener: (event, cb) => {
        if (event === 'DOMContentLoaded') {
            global.document.readyState = 'complete';
            cb();
        }
    },
    querySelectorAll: () => [],
    querySelector: () => ({ content: '{"email": ["Invalid email"]}' })
};

global.window = {};

initLaravelSupport();
global.document.addEventListener('DOMContentLoaded', () => {});
