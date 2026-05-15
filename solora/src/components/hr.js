class SolHr extends HTMLElement {
    static get observedAttributes() {
        return ['color', 'opacity', 'weight', 'vertical', 'inset', 'variant'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        this.render();
    }

    render() {
        const color = this.getAttribute('color');
        const opacity = this.getAttribute('opacity');

        if (color) {
            this.style.setProperty('--sol-hr-color', color);
        } else {
            this.style.removeProperty('--sol-hr-color');
        }

        if (opacity) {
            this.style.opacity = opacity;
        } else {
            this.style.opacity = '';
        }

        // Accessibility
        if (!this.getAttribute('role')) {
            this.setAttribute('role', 'separator');
        }
        
        if (this.hasAttribute('vertical')) {
            this.setAttribute('aria-orientation', 'vertical');
        } else {
            this.setAttribute('aria-orientation', 'horizontal');
        }
    }
}

export function initHr() {
    if (!customElements.get('sol-hr')) {
        customElements.define('sol-hr', SolHr);
    }
}
