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
    }

    static get observedAttributes() {
        return ['disabled', 'type'];
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
    }
}

// De export functie voor handmatige initialisatie
export function initButton() {
    if (!customElements.get('sol-button')) {
        customElements.define('sol-button', SolButton);
    }
}