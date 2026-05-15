class SolButton extends HTMLElement {
    constructor() {
        super();
        this.button = document.createElement('button');
        this._observer = null;
    }

    connectedCallback() {
        if (!this.contains(this.button)) {
            this.appendChild(this.button);
        }
        
        this.syncChildren();
        this.updateAttributes();
        this.setupMutationObserver();

        if (this.hasAttribute('autofocus')) {
            requestAnimationFrame(() => {
                this.button.focus();
            });
        }
    }

    disconnectedCallback() {
        if (this._observer) {
            this._observer.disconnect();
        }
    }

    setupMutationObserver() {
        this._observer = new MutationObserver((mutations) => {
            let shouldSync = false;
            mutations.forEach(mutation => {
                Array.from(mutation.addedNodes).forEach(node => {
                    if (node !== this.button) {
                        shouldSync = true;
                    }
                });
            });
            if (shouldSync) {
                this.syncChildren();
            }
        });

        this._observer.observe(this, { childList: true });
    }

    syncChildren() {
        if (this._observer) this._observer.disconnect();

        // 1. Verzamel alle directe children die NIET onze interne button zijn
        const nodesToMove = Array.from(this.childNodes).filter(node => node !== this.button);
        
        // 2. Als de interne button is verwijderd (bijv. door textContent = ...), voeg hem weer toe
        if (!this.contains(this.button)) {
            this.appendChild(this.button);
        }

        // 3. Maak de interne button leeg voordat we de nieuwe nodes toevoegen
        // om dubbele tekst/content te voorkomen bij updates.
        this.button.innerHTML = '';

        // 4. Verplaats de 'vreemde' nodes naar binnen in de interne button
        nodesToMove.forEach(node => {
            this.button.appendChild(node);
        });

        if (this._observer) {
            this._observer.observe(this, { childList: true });
        }
    }

    static get observedAttributes() {
        return ['disabled', 'type', 'variant', 'size', 'rounded', 'autofocus', 'bg'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.contains(this.button)) {
            this.updateAttributes();
        }
    }

    updateAttributes() {
        if (this.hasAttribute('disabled')) {
            this.button.setAttribute('disabled', 'disabled');
        } else {
            this.button.removeAttribute('disabled');
        }

        if (this.hasAttribute('autofocus')) {
            this.button.setAttribute('autofocus', 'autofocus');
        } else {
            this.button.removeAttribute('autofocus');
        }

        if (this.hasAttribute('type')) {
            this.button.setAttribute('type', this.getAttribute('type'));
        } else {
            this.button.setAttribute('type', 'button');
        }

        // Variant afhandelen (was color)
        const variant = this.getAttribute('variant') || this.getAttribute('color') || 'primary';
        this.button.className = `btn btn-${variant}`;
        
        // Background afhandelen
        const bg = this.getAttribute('bg');
        if (bg) {
            this.button.classList.add('has-custom-bg');
            if (bg === 'primary') {
                this.button.style.backgroundColor = 'var(--color-primary, #0071e3)';
                this.button.style.color = 'var(--color-text-light, #fff)';
            } else if (bg === 'secondary') {
                this.button.style.backgroundColor = 'var(--color-secondary, #f5f5f5)';
                this.button.style.color = 'var(--color-text-dark, #000)';
            } else if (bg === 'success') {
                this.button.style.backgroundColor = 'var(--color-success, #28a745)';
                this.button.style.color = 'var(--color-text-light, #fff)';
            } else if (bg === 'warning') {
                this.button.style.backgroundColor = 'var(--color-warning, #ffc107)';
                this.button.style.color = 'var(--color-text-dark, #000)';
            } else if (bg === 'danger') {
                this.button.style.backgroundColor = 'var(--color-danger, #dc3545)';
                this.button.style.color = 'var(--color-text-light, #fff)';
            } else {
                this.button.style.backgroundColor = bg;
            }
        } else {
            this.button.classList.remove('has-custom-bg');
            this.button.style.backgroundColor = '';
            this.button.style.color = '';
        }

        const size = this.getAttribute('size');
        if (size) {
            this.button.classList.add(`btn-${size}`);
        }

        if (this.hasAttribute('rounded')) {
            this.button.classList.add('btn-rounded');
        } else {
            this.button.classList.remove('btn-rounded');
        }
    }
}

// De export functie voor handmatige initialisatie
export function initButton() {
    if (!customElements.get('sol-button')) {
        customElements.define('sol-button', SolButton);
    }
}