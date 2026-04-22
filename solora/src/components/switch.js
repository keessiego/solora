class SolSwitch extends HTMLElement {
    constructor() {
        super();
        this.classList.add('sol-switch');
        const input = document.createElement('input');
        input.type = 'checkbox';
        const slider = document.createElement('div');
        slider.className = 'slider';
        this.appendChild(input);
        this.appendChild(slider);
        slider.addEventListener('click', () => {
            input.checked = !input.checked;
            this.dispatchEvent(new Event('change', { bubbles: true }));
        });
        // Handle attributes for colors
        this.updateColors();
    }

    static get observedAttributes() {
        return ['color-primary', 'color-secondary', 'color-bg', 'color-text'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        this.updateColors();
    }

    updateColors() {
        const primary = this.getAttribute('color-primary') || '#34c759';
        const secondary = this.getAttribute('color-secondary') || '#d1d1d6';
        const bg = this.getAttribute('color-bg') || '#e9e9ea';
        const text = this.getAttribute('color-text') || 'white';
        this.style.setProperty('--color-primary', primary);
        this.style.setProperty('--color-secondary', secondary);
        this.style.setProperty('--color-bg', bg);
        this.style.setProperty('--color-text', text);
    }
}

customElements.define('sol-switch', SolSwitch);