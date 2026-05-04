class SolButton extends HTMLElement {
    constructor() {
        super();
        this.button = document.createElement('button');
    }

    connectedCallback() {
        if (this.contains(this.button)) return;

        while (this.childNodes.length > 0) {
            this.button.appendChild(this.childNodes[0]);
        }

        this.appendChild(this.button);
        this.updateAttributes();
        this.setupEventListeners();
    }

    setupEventListeners() {
        // Zorg dat een klik op de interne button de onclick van de host triggert
        this.button.addEventListener('click', (e) => {
            if (this.hasAttribute('onclick')) {
                // Voer de onclick code uit in de context van dit element
                const fn = new Function('event', this.getAttribute('onclick'));
                fn.call(this, e);
            }
        });
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
        
        if (this.hasAttribute('size')) {
            this.button.classList.add(`btn-${this.getAttribute('size')}`);
        }

        if (this.hasAttribute('rounded')) {
            this.button.classList.add('btn-rounded');
        }
    }
}

// De export functie voor handmatige initialisatie
export function initButton() {
    if (!customElements.get('sol-button')) {
        customElements.define('sol-button', SolButton);
    }
}