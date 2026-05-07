import { calculatePosition } from '../utils/positioning.js';

class SolNavDropdown extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
        this.isOpen = false;
        this._handleOutsideClick = this.handleOutsideClick.bind(this);
        this._updatePosition = this.updatePosition.bind(this);
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        const label = this.getAttribute('label') || 'Menu';
        
        // Bewaar de content (children)
        this.contentWrapper = document.createElement('div');
        this.contentWrapper.className = 'sol-nav-dropdown-content';
        while (this.childNodes.length > 0) {
            this.contentWrapper.appendChild(this.childNodes[0]);
        }

        this.render(label);
        this.bindEvents();
    }

    render(label) {
        this.innerHTML = '';
        
        // Trigger (Ziet eruit als een normale nav-link)
        this.trigger = document.createElement('button');
        this.trigger.className = 'sol-nav-dropdown-trigger';
        this.trigger.innerHTML = `<span>${label}</span><span class="chevron"></span>`;
        
        this.appendChild(this.trigger);
        this.appendChild(this.contentWrapper);
    }

    toggle() {
        if (this.isOpen) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        this.isOpen = true;
        this.classList.add('open');
        
        if (window.innerWidth > 768) {
            this.updatePosition();
            window.addEventListener('scroll', this._updatePosition, true);
            window.addEventListener('resize', this._updatePosition);
        }
        
        document.addEventListener('click', this._handleOutsideClick);
        this.dispatchEvent(new CustomEvent('open', { bubbles: true }));
    }

    close() {
        this.isOpen = false;
        this.classList.remove('open');
        
        window.removeEventListener('scroll', this._updatePosition, true);
        window.removeEventListener('resize', this._updatePosition);
        document.removeEventListener('click', this._handleOutsideClick);
        
        this.dispatchEvent(new CustomEvent('close', { bubbles: true }));
    }

    updatePosition() {
        if (!this.isOpen || window.innerWidth <= 768) return;

        // Op desktop gebruiken we absolute positionering t.o.v. de trigger
        // Maar we willen dat het aanvoelt als een extensie.
        // We kunnen calculatePosition gebruiken of het gewoon met CSS doen
        // Omdat de content IN de DOM zit (geen portal), is CSS makkelijker.
    }

    handleOutsideClick(e) {
        if (!this.contains(e.target)) {
            this.close();
        }
    }

    bindEvents() {
        this.trigger.addEventListener('click', (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Sluit als er op een link binnenin wordt geklikt
        this.contentWrapper.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                this.close();
            }
        });
    }
}

export function initNavDropdown() {
    if (!customElements.get('sol-nav-dropdown')) {
        customElements.define('sol-nav-dropdown', SolNavDropdown);
    }
}
