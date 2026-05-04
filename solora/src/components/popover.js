import { calculatePosition } from '../utils/positioning.js';

class SolPopover extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
        this._handleOutsideClick = this.handleOutsideClick.bind(this);
        this._updatePosition = this.updatePosition.bind(this);
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        // Splits trigger en content
        const triggerSlot = this.querySelector('[slot="trigger"]');
        const contentNodes = Array.from(this.childNodes).filter(node => node !== triggerSlot);

        this.trigger = document.createElement('div');
        this.trigger.className = 'sol-popover-trigger';
        if (triggerSlot) {
            this.trigger.appendChild(triggerSlot);
        } else {
            this.trigger.textContent = 'Klik mij';
        }

        this.content = document.createElement('div');
        this.content.className = 'popover-content';
        contentNodes.forEach(node => this.content.appendChild(node));

        this.innerHTML = '';
        this.appendChild(this.trigger);

        this.bindEvents();
    }

    disconnectedCallback() {
        if (this.content && this.content.parentElement) {
            this.content.parentElement.removeChild(this.content);
        }
        document.removeEventListener("click", this._handleOutsideClick);
        window.removeEventListener("scroll", this._updatePosition, true);
        window.removeEventListener("resize", this._updatePosition);
    }

    toggle() {
        if (this.content.classList.contains("open")) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        if (this.content.parentElement !== document.body) {
            document.body.appendChild(this.content);
        }

        this.classList.add("open");
        this.content.classList.add("open");
        this.updatePosition();

        window.addEventListener("scroll", this._updatePosition, true);
        window.addEventListener("resize", this._updatePosition);
    }

    close() {
        this.classList.remove("open");
        this.content.classList.remove("open");
        window.removeEventListener("scroll", this._updatePosition, true);
        window.removeEventListener("resize", this._updatePosition);
    }

    updatePosition() {
        if (!this.content.classList.contains("open")) return;

        const pos = this.getAttribute('pos') || 'bottom-left';
        const { top, left } = calculatePosition(this.trigger, this.content, pos);

        this.content.style.top = `${top}px`;
        this.content.style.left = `${left}px`;
    }

    handleOutsideClick(e) {
        if (!this.contains(e.target) && !this.content.contains(e.target)) {
            this.close();
        }
    }

    bindEvents() {
        this.trigger.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Event forwarding: Omdat de content in de body staat (Portal),
        // bubbelen events niet naar de sol-popover. We sturen ze handmatig door.
        this.content.addEventListener("click", (e) => {
            const newEvent = new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
                view: window,
                ...e
            });
            this.dispatchEvent(newEvent);
        });

        document.addEventListener("click", this._handleOutsideClick);
    }
}

export function initPopover() {
    if (!customElements.get('sol-popover')) {
        customElements.define('sol-popover', SolPopover);
    }
}
