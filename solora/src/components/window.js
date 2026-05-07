class SolWindow extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        const title = this.getAttribute('title') || '';
        const content = this.innerHTML;

        this.innerHTML = `
            <div class="window-top">
                <div class="window-top-btns">
                    <span class="window-btn-red close-btn" title="Sluiten"></span>
                    <span class="window-btn-orange minimize-btn" title="Minimaliseren"></span>
                    <span class="window-btn-green maximize-btn" title="Volledig scherm"></span>
                </div>
                ${title ? `<div class="window-title">${title}</div>` : ''}
            </div>
            <div class="window-content">
                ${content}
            </div>
        `;

        this.windowContent = this.querySelector('.window-content');
        this.closeBtn = this.querySelector('.close-btn');
        this.minimizeBtn = this.querySelector('.minimize-btn');
        this.maximizeBtn = this.querySelector('.maximize-btn');

        this.bindEvents();
    }

    bindEvents() {
        this.closeBtn.addEventListener('click', () => {
            this.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.style.opacity = '0';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.remove(), 300);
        });

        this.minimizeBtn.addEventListener('click', () => {
            this.windowContent.classList.toggle('collapsed');
        });

        this.maximizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.dataset.isFullscreen !== "true") {
                const rect = this.getBoundingClientRect();
                this.dataset.origRect = JSON.stringify({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    height: rect.height
                });
                Object.assign(this.style, {
                    position: 'fixed',
                    top: `${rect.top}px`,
                    left: `${rect.left}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    margin: '0',
                    zIndex: '9999',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                });
                void this.offsetWidth;
                Object.assign(this.style, { top: '0', left: '0', width: '100vw', height: '100vh', borderRadius: '0' });
                this.dataset.isFullscreen = "true";
            } else {
                const origRect = JSON.parse(this.dataset.origRect);
                Object.assign(this.style, {
                    top: `${origRect.top - window.scrollY}px`,
                    left: `${origRect.left - window.scrollX}px`,
                    width: `${origRect.width}px`,
                    height: `${origRect.height}px`,
                    borderRadius: '12px'
                });
                this.addEventListener('transitionend', () => {
                    Object.assign(this.style, { position: '', top: '', left: '', width: '', height: '', zIndex: '', transition: '', margin: '', borderRadius: '' });
                    this.dataset.isFullscreen = "false";
                }, { once: true });
            }
        });
    }
}

if (!window._solFsListenerAdded) {
    window._solFsListenerAdded = true;
    window.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'r') {
            Object.keys(sessionStorage).forEach(key => {
                if (key.startsWith('sol-fs-')) {
                    sessionStorage.removeItem(key);
                }
            });
        }
    });
}

export function initWindow() {
    if (!customElements.get('sol-window')) {
        customElements.define('sol-window', SolWindow);
    }
}
