class SolCard extends HTMLElement {
    static get observedAttributes() {
        return ['bg', 'variant'];
    }

    constructor() {
        super();
    }

    show() {
        if (!this.hasAttribute('hidden')) return;

        const transition = this.getAttribute('transition');
        
        if (transition !== null) {
            const variant = transition || 'fade';
            this.classList.add(`sol-animate-${variant}`);
            this.removeAttribute('hidden');
            
            const onAnimationEnd = () => {
                this.classList.remove(`sol-animate-${variant}`);
                this.removeEventListener('animationend', onAnimationEnd);
            };
            this.addEventListener('animationend', onAnimationEnd);
        } else {
            this.removeAttribute('hidden');
        }
    }

    hide() {
        if (this.hasAttribute('hidden')) return;

        const transition = this.getAttribute('transition');

        if (transition !== null) {
            const variant = transition || 'fade';
            // We use a reverse class or just the same animation if it looks okay, 
            // but for a better feel we add a 'reverse' modifier.
            this.classList.add(`sol-animate-${variant}`, 'sol-animate-reverse');
            
            const onAnimationEnd = () => {
                this.classList.remove(`sol-animate-${variant}`, 'sol-animate-reverse');
                this.setAttribute('hidden', '');
                this.removeEventListener('animationend', onAnimationEnd);
            };
            this.addEventListener('animationend', onAnimationEnd);
        } else {
            this.setAttribute('hidden', '');
        }
    }

    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue === newValue) return;
        
        if (name === 'bg') {
            this.updateBackground(newValue);
        } else if (name === 'variant') {
            this.updateVariant(oldValue, newValue);
        }
    }

    updateVariant(oldValue, newValue) {
        if (oldValue) {
            this.classList.remove(`variant-${oldValue}`);
        }
        this.classList.add(`variant-${newValue || 'default'}`);
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
        
        const variant = this.getAttribute('variant') || 'default';
        this.updateVariant(null, variant);
        
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
