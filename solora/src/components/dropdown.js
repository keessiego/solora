class SolDropdown extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    connectedCallback() {
        // Voorkom dubbele rendering
        if (this.initialized) return;
        this.initialized = true;

        // 1. Pak alle huidige children (jouw dropdown-items) en zet ze tijdelijk apart
        const fragment = document.createDocumentFragment();
        while (this.childNodes.length > 0) {
            fragment.appendChild(this.childNodes[0]);
        }

        // 2. Bouw de interne structuur op
        this.btn = document.createElement('div');
        this.btn.className = 'dropdown-btn';
        this.btn.setAttribute('tabindex', '0');
        this.btn.setAttribute('role', 'combobox');
        this.btn.setAttribute('aria-haspopup', 'listbox');

        this.content = document.createElement('div');
        this.content.className = 'dropdown-content';
        this.content.appendChild(fragment); // Zet de items in de popover

        this.hiddenInput = document.createElement('input');
        this.hiddenInput.type = 'hidden';
        this.hiddenInput.name = this.getAttribute('name') || 'dropdown';

        // 3. Voeg de nieuwe opmaak toe aan het sol-dropdown element
        this.appendChild(this.btn);
        this.appendChild(this.content);
        this.appendChild(this.hiddenInput);

        this.placeholder = this.getAttribute('placeholder') || null;

        // 4. Stel functionaliteit in
        this.bindEvents();
        this.initSelection();
    }

    getItems() {
        // Haal alle actieve (niet-disabled) items op
        return Array.from(this.content.querySelectorAll('.dropdown-item:not([aria-disabled="true"]):not(.placeholder)'));
    }

    setValue(item) {
        if (!item || item.getAttribute("aria-disabled") === "true") return;
        
        // Knop tekst en eventuele iconen updaten
        this.btn.innerHTML = item.innerHTML; 
        
        // Active states resetten en zetten
        this.content.querySelectorAll(".dropdown-item").forEach((i) => i.classList.remove("active"));
        item.classList.add("active");
        
        // Value bepalen (eerst data-value checken, anders de textContent)
        this.hiddenInput.value = item.dataset.value !== undefined ? item.dataset.value : item.textContent.trim();
        
        // Trigger een standard event (bubbles: true zodat je in form-scripts kunt luisteren)
        this.dispatchEvent(new CustomEvent('change', { detail: this.hiddenInput.value, bubbles: true }));
    }

    initSelection() {
        const activeItem = this.content.querySelector(".dropdown-item.active");
        
        if (activeItem) {
            this.setValue(activeItem);
        } else if (this.placeholder) {
            this.btn.innerHTML = this.placeholder;
        } else {
            // Als er niks is, pak het eerste beschikbare item
            const firstItem = this.getItems()[0];
            if (firstItem) this.setValue(firstItem);
        }
    }

    toggle() {
        this.classList.toggle("open");
    }

    close() {
        this.classList.remove("open");
    }

    bindEvents() {
        // Knop klik (openen/sluiten)
        this.btn.addEventListener("click", (e) => {
            e.stopPropagation();
            this.toggle();
        });

        // Buiten klikken is sluiten
        document.addEventListener("click", (e) => {
            if (!this.contains(e.target)) this.close();
        });

        // Toetsenbord navigatie
        this.btn.addEventListener("keydown", (e) => {
            if (!["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(e.key)) return;
            
            const items = this.getItems();
            if (items.length === 0) return;

            let currentIndex = items.findIndex((i) => i.classList.contains("active"));

            e.preventDefault();
            this.classList.add("open"); // Altijd open bij gebruik pijltjes

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

            // Update visuele focus (zonder direct de waarde op te slaan)
            items.forEach((i) => i.classList.remove("active"));
            items[currentIndex].classList.add("active");
            items[currentIndex].scrollIntoView({ block: "nearest" });
        });

        // Klik op een item binnenin de content
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