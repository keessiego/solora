class SolCard extends HTMLElement {
    static get observedAttributes() {
        return ['bg'];
    }

    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'bg' && oldValue !== newValue) {
            this.updateBackground(newValue);
        }
    }

    updateBackground(bg) {
        this.classList.remove('custom-bg');
        if (!bg || bg === 'glass') {
            this.style.backgroundColor = '';
        } else if (bg.includes('/')) {
            const [color, opacity] = bg.split('/');
            const amount = parseFloat(opacity);
            if (!isNaN(amount)) {
                // color/30 means 30% of the color and 70% transparency
                this.style.backgroundColor = `color-mix(in srgb, ${color}, transparent ${100 - amount}%)`;
            }
        } else {
            this.style.backgroundColor = bg;
            // Only add custom-bg for solid colors to disable the default glass blur if needed
            // If it's a hex with alpha or rgba, we might still want to keep the blur
            // but for simplicity, we treat non-slash colors as custom solid backgrounds.
            if (bg !== 'transparent' && !bg.startsWith('rgba') && !bg.startsWith('hsla')) {
                this.classList.add('custom-bg');
            }
        }
    }

    render() {
        if (!this.classList.contains('sol-card')) {
            this.classList.add('sol-card');
        }
        
        const bg = this.getAttribute('bg');
        this.updateBackground(bg);
        
        if (!this.querySelector('.card-glass-highlight')) {
            const highlight = document.createElement('div');
            highlight.className = 'card-glass-highlight';
            this.prepend(highlight);
        }
    }
}

export function initCard() {
    if (!customElements.get('sol-card')) {
        customElements.define('sol-card', SolCard);
    }
}
