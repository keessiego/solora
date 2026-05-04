const iconCache = new Map();

class SolIcon extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    static get observedAttributes() {
        return ['name', 'size', 'color', 'stroke-width'];
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.initialized && oldValue !== newValue) {
            this.render();
        }
    }

    async render() {
        const name = this.getAttribute('name');
        if (!name) {
            this.innerHTML = '';
            return;
        }

        const size = this.getAttribute('size') || '24';
        const color = this.getAttribute('color') || 'currentColor';
        const strokeWidth = this.getAttribute('stroke-width') || '2';

        try {
            let svgText;
            if (iconCache.has(name)) {
                svgText = iconCache.get(name);
            } else {
                // Gebruik jsdelivr (betrouwbaarder voor CORS) en een moderne versie
                const response = await fetch(`https://cdn.jsdelivr.net/npm/lucide-static@latest/icons/${name}.svg`);
                if (!response.ok) throw new Error(`Icon "${name}" not found`);
                svgText = await response.text();
                iconCache.set(name, svgText);
            }

            // Pas de attributen van de SVG aan
            const parser = new DOMParser();
            const doc = parser.parseFromString(svgText, 'image/svg+xml');
            const svg = doc.querySelector('svg');

            if (svg) {
                svg.setAttribute('width', size);
                svg.setAttribute('height', size);
                svg.setAttribute('stroke', color);
                svg.setAttribute('stroke-width', strokeWidth);
                
                // Wis huidige inhoud en voeg nieuwe SVG toe
                this.innerHTML = '';
                this.appendChild(svg);
            }
        } catch (error) {
            console.error(`SolIcon: Fout bij laden van icoon "${name}":`, error);
            this.innerHTML = ''; // Leeg bij fout
        }
    }
}

export function initIcon() {
    if (!customElements.get('sol-icon')) {
        customElements.define('sol-icon', SolIcon);
    }
}
