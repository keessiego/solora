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
        return ['disabled', 'type', 'variant', 'size', 'rounded'];
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

        if (this.hasAttribute('type')) {
            this.button.setAttribute('type', this.getAttribute('type'));
        } else {
            this.button.setAttribute('type', 'button');
        }

        // Variant afhandelen (was color)
        const variant = this.getAttribute('variant') || this.getAttribute('color') || 'primary';
        this.button.className = `btn btn-${variant}`;
        
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