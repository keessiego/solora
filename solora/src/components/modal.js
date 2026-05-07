class SolModal extends HTMLElement {
    constructor() {
        super();
        this.overlay = document.createElement('div');
        this.overlay.className = 'sol-modal-overlay';
        
        this.container = document.createElement('div');
        this.container.className = 'sol-modal-container';
        
        this.content = document.createElement('div');
        this.content.className = 'sol-modal-content';
        
        this.footer = document.createElement('div');
        this.footer.className = 'sol-modal-footer';
        
        this.overlay.appendChild(this.container);
        this.container.appendChild(this.content);
        this.container.appendChild(this.footer);
    }

    connectedCallback() {
        if (!document.body.contains(this.overlay)) {
            document.body.appendChild(this.overlay);
        }
        
        this.render();
        this.setupObservers();
    }

    setupObservers() {
        const observer = new MutationObserver(() => this.render());
        observer.observe(this, { childList: true, attributes: true, subtree: true });
    }

    static get observedAttributes() {
        return ['variant', 'open', 'size'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'open') {
            if (newValue !== null) {
                this.open();
            } else {
                this.close();
            }
        } else {
            this.render();
        }
    }

    open() {
        this.overlay.style.display = 'flex';
        this.overlay.offsetHeight; // force reflow
        this.overlay.classList.add('visible');
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.overlay.classList.remove('visible');
        setTimeout(() => {
            if (!this.overlay.classList.contains('visible')) {
                this.overlay.style.display = 'none';
                document.body.style.overflow = '';
                this.removeAttribute('open');
            }
        }, 200);
    }

    render() {
        if (this._isRendering) return;
        this._isRendering = true;

        const variant = this.getAttribute('variant') || 'default';
        const size = this.getAttribute('size') || 'sm';
        this.container.className = `sol-modal-container variant-${variant} size-${size}`;
        
        // 1. Verplaats alle modal-buttons (ook genest) naar de footer
        // We doen dit alleen als ze nog niet in de footer zitten
        const buttons = Array.from(this.querySelectorAll('sol-modal-button'));
        buttons.forEach(btn => {
            if (!this.footer.contains(btn)) {
                this.footer.appendChild(btn);
            }
        });

        // 2. De rest van de directe kinderen naar de content verplaatsen
        // We slaan de overlay over (mocht die per ongeluk in de host zitten)
        const children = Array.from(this.childNodes);
        children.forEach(node => {
            if (node !== this.overlay) {
                this.content.appendChild(node);
            }
        });

        // Add event listeners to buttons in the footer
        Array.from(this.footer.querySelectorAll('sol-modal-button')).forEach(btn => {
            if (!btn._hasModalListener) {
                btn.addEventListener('click', () => {
                    if (btn.hasAttribute('close-modal')) {
                        this.close();
                    }
                });
                btn._hasModalListener = true;
            }
        });

        // Close on overlay click
        this.overlay.onclick = (e) => {
            if (e.target === this.overlay) this.close();
        };

        this._isRendering = false;
    }
}

class SolModalButton extends HTMLElement {
    constructor() {
        super();
        this.button = document.createElement('button');
        this.initialized = false;
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        // Verplaats de originele inhoud (bijv. tekst "OK") naar binnen de button
        while (this.childNodes.length > 0) {
            this.button.appendChild(this.childNodes[0]);
        }

        this.appendChild(this.button);
        this.updateAttributes();
    }

    static get observedAttributes() {
        return ['variant', 'bold', 'type', 'form'];
    }

    attributeChangedCallback() {
        this.updateAttributes();
    }

    updateAttributes() {
        const variant = this.getAttribute('variant') || 'default';
        const isBold = this.hasAttribute('bold');
        
        this.button.className = `sol-modal-button variant-${variant}`;
        if (isBold) this.button.classList.add('bold');

        if (this.hasAttribute('type')) {
            this.button.setAttribute('type', this.getAttribute('type'));
        }
        if (this.hasAttribute('form')) {
            this.button.setAttribute('form', this.getAttribute('form'));
        }
    }
}

export function initModal() {
    if (!customElements.get('sol-modal')) {
        customElements.define('sol-modal', SolModal);
    }
    if (!customElements.get('sol-modal-button')) {
        customElements.define('sol-modal-button', SolModalButton);
    }

    // Global toggle logic for sol-buttons
    document.addEventListener('click', (e) => {
        const btn = e.target.closest('sol-button[toggle-modal]');
        if (btn) {
            const modalId = btn.getAttribute('toggle-modal');
            const modal = document.getElementById(modalId);
            if (modal && modal.tagName === 'SOL-MODAL') {
                modal.setAttribute('open', '');
            }
        }
    });
}
