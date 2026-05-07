class SolSidebar extends HTMLElement {
    constructor() {
        super();
        this._navbarObserver = null;
        this._navbarResizeObserver = null;
    }

    connectedCallback() {
        this.updateActiveItem();
        this.setupNavbarObserver();
    }

    disconnectedCallback() {
        this.disconnectObservers();
    }

    static get observedAttributes() {
        return ['variant', 'fixed', 'sticky', 'floating', 'compact'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'sticky') {
            if (newValue !== null) {
                this.setupNavbarObserver();
            } else {
                this.disconnectObservers();
                this.style.removeProperty('--sol-sidebar-top');
            }
        }
    }

    setupNavbarObserver() {
        this.disconnectObservers();

        const updateTop = () => {
            const navbar = document.querySelector('sol-navbar[sticky]');
            let topValue = '0px';
            
            if (navbar) {
                const rect = navbar.getBoundingClientRect();
                // Check if navbar is visible (not display: none, not hidden attribute, and has height)
                const isVisible = rect.height > 0 && 
                                 window.getComputedStyle(navbar).display !== 'none' && 
                                 !navbar.hasAttribute('hidden');
                
                if (isVisible) {
                    topValue = rect.height + 'px';
                }
            }
            
            this.style.setProperty('--sol-sidebar-top', topValue);
        };

        // Initial update
        updateTop();

        // Watch for navbar presence and changes
        const navbar = document.querySelector('sol-navbar');
        if (navbar) {
            this._navbarResizeObserver = new ResizeObserver(updateTop);
            this._navbarResizeObserver.observe(navbar);

            this._navbarObserver = new MutationObserver(updateTop);
            this._navbarObserver.observe(navbar, { 
                attributes: true, 
                attributeFilter: ['hidden', 'style', 'class', 'sticky'] 
            });
        } else {
            // Navbar might be added to the DOM later
            this._bodyObserver = new MutationObserver((mutations) => {
                if (document.querySelector('sol-navbar')) {
                    this.setupNavbarObserver();
                    this._bodyObserver.disconnect();
                    this._bodyObserver = null;
                }
            });
            this._bodyObserver.observe(document.body, { childList: true, subtree: true });
        }
    }

    disconnectObservers() {
        if (this._navbarObserver) {
            this._navbarObserver.disconnect();
            this._navbarObserver = null;
        }
        if (this._navbarResizeObserver) {
            this._navbarResizeObserver.disconnect();
            this._navbarResizeObserver = null;
        }
        if (this._bodyObserver) {
            this._bodyObserver.disconnect();
            this._bodyObserver = null;
        }
    }

    updateActiveItem() {
        const currentPath = window.location.pathname;
        const items = this.querySelectorAll('.sol-sidebar-item');
        
        items.forEach(item => {
            const href = item.getAttribute('href');
            // Support exact match or ending with path
            if (href && (currentPath === href || currentPath.endsWith(href) || (currentPath === '/' && (href === '/index.php' || href === 'index.php')))) {
                item.classList.add('active');
            } else {
                item.classList.remove('active');
            }
        });
    }
}

export function initSidebar() {
    if (!customElements.get('sol-sidebar')) {
        customElements.define('sol-sidebar', SolSidebar);
    }
}
