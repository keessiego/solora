import { calculatePosition } from '../utils/positioning.js';

class SolDropdown extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
        this._handleOutsideClick = this.handleOutsideClick.bind(this);
        this._updatePosition = this.updatePosition.bind(this);
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        const fragment = document.createDocumentFragment();
        while (this.childNodes.length > 0) {
            fragment.appendChild(this.childNodes[0]);
        }

        this.btn = document.createElement('div');
        this.btn.className = 'dropdown-btn';
        this.btn.setAttribute('tabindex', '0');
        this.btn.setAttribute('role', 'combobox');
        this.btn.setAttribute('aria-haspopup', 'listbox');

        this.content = document.createElement('div');
        this.content.className = 'dropdown-content';
        this.content.appendChild(fragment);

        this.hiddenInput = document.createElement('input');
        this.hiddenInput.type = 'hidden';
        this.hiddenInput.name = this.getAttribute('name') || 'dropdown';

        this.appendChild(this.btn);
        this.appendChild(this.hiddenInput);
        // We voegen this.content NIET toe aan this, maar later aan document.body (portal)

        this.placeholder = this.getAttribute('placeholder') || null;

        this.bindEvents();
        this.initSelection();
    }

    disconnectedCallback() {
        if (this.content && this.content.parentElement) {
            this.content.parentElement.removeChild(this.content);
        }
        document.removeEventListener("click", this._handleOutsideClick);
        window.removeEventListener("scroll", this._updatePosition, true);
        window.removeEventListener("resize", this._updatePosition);
    }

    getItems() {
        return Array.from(this.content.querySelectorAll('.dropdown-item:not([aria-disabled="true"]):not(.placeholder)'));
    }

    setValue(item) {
        if (!item || item.getAttribute("aria-disabled") === "true") return;
        this.btn.innerHTML = item.innerHTML; 
        this.content.querySelectorAll(".dropdown-item").forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        this.hiddenInput.value = item.dataset.value !== undefined ? item.dataset.value : item.textContent.trim();
        this.dispatchEvent(new CustomEvent('change', { detail: this.hiddenInput.value, bubbles: true }));
    }

    initSelection() {
        const activeItem = this.content.querySelector(".dropdown-item.active");
        if (activeItem) {
            this.setValue(activeItem);
        } else if (this.placeholder) {
            this.btn.innerHTML = this.placeholder;
        } else {
            const firstItem = this.getItems()[0];
            if (firstItem) this.setValue(firstItem);
        }
    }

    toggle() {
        if (this.classList.contains("open")) {
            this.close();
        } else {
            this.open();
        }
    }

    open() {
        // Portal: Verplaats content naar body als dat nog niet is gebeurd
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
        if (!this.classList.contains("open")) return;

        const pos = this.getAttribute('pos') || 'bottom-left';
        
        // Positionering van de content (portal)
        this.content.style.position = 'fixed';
        this.content.style.width = `${this.btn.offsetWidth}px`;
        this.content.style.minWidth = '10rem';

        const { top, left } = calculatePosition(this.btn, this.content, pos, 5);

        this.content.style.top = `${top}px`;
        this.content.style.left = `${left}px`;
    }

    handleOutsideClick(e) {
        if (!this.contains(e.target) && !this.content.contains(e.target)) {
            this.close();
        }
    }

    bindEvents() {
        this.btn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggle();
        });

        document.addEventListener("click", this._handleOutsideClick);

        this.btn.addEventListener("keydown", (e) => {
            if (!["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) return;
            
            const items = this.getItems();
            if (items.length === 0) return;

            let currentIndex = items.findIndex((i) => i.classList.contains("active"));

            e.preventDefault();
            if (!this.classList.contains("open")) this.open();

            if (e.key === "ArrowDown") {
                currentIndex = (currentIndex + 1) % items.length;
            } else if (e.key === "ArrowUp") {
                currentIndex = (currentIndex - 1 + items.length) % items.length;
            } else if (e.key === "Enter") {
                if (currentIndex >= 0) this.setValue(items[currentIndex]);
                this.close();
                return;
            } else if (e.key === "Escape") {
                this.close();
                return;
            }

            items.forEach((i) => i.classList.remove("active"));
            items[currentIndex].classList.add("active");
            items[currentIndex].scrollIntoView({ block: "nearest" });
        });

        this.content.addEventListener("click", (e) => {
            const item = e.target.closest(".dropdown-item");
            if (item) {
                this.setValue(item);
                this.close();
            }
        });
    }
}

// Export functie voor handmatige initialisatie
export function initDropdown() {
    if (!customElements.get('sol-dropdown')) {
        customElements.define('sol-dropdown', SolDropdown);
    }
}