class SolInput extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    // Luister naar wijzigingen in deze attributen om live updates te ondersteunen
    static get observedAttributes() {
        return ['type', 'placeholder', 'value', 'label', 'disabled', 'required', 'min', 'max', 'name'];
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        // 1. Label aanmaken
        this.labelEl = document.createElement('label');
        this.labelEl.className = 'sol-label';
        
        // 2. Native input aanmaken
        this.inputEl = document.createElement('input');
        this.inputEl.className = 'sol-input';

        // 3. Error span aanmaken
        this.errorEl = document.createElement('span');
        this.errorEl.className = 'sol-error-message';

        // Toevoegen aan het custom element (host fungeert als sol-input-group)
        this.appendChild(this.labelEl);
        this.appendChild(this.inputEl);
        this.appendChild(this.errorEl);

        this.updateAttributes();
        this.bindEvents();
    }

    attributeChangedCallback() {
        if (this.initialized) {
            this.updateAttributes();
        }
    }

    updateAttributes() {
        // Reguliere eigenschappen doorgeven aan de native input
        const props = ['type', 'placeholder', 'value', 'name', 'min', 'max'];
        props.forEach(prop => {
            if (this.hasAttribute(prop)) {
                this.inputEl.setAttribute(prop, this.getAttribute(prop));
            } else {
                this.inputEl.removeAttribute(prop);
            }
        });

        // Boolean eigenschappen doorgeven (disabled, required)
        if (this.hasAttribute('disabled')) this.inputEl.setAttribute('disabled', 'disabled');
        else this.inputEl.removeAttribute('disabled');

        if (this.hasAttribute('required')) this.inputEl.setAttribute('required', 'required');
        else this.inputEl.removeAttribute('required');

        // Label instellen of verbergen als deze niet bestaat
        if (this.hasAttribute('label')) {
            this.labelEl.textContent = this.getAttribute('label');
            this.labelEl.style.display = 'block';
        } else {
            this.labelEl.style.display = 'none';
        }
    }

    bindEvents() {
        // Waarde up-to-date houden en validatie-fouten verbergen bij het typen
        this.inputEl.addEventListener('input', (e) => {
            // Synchroniseer het value-attribuut
            if (this.inputEl.value !== this.getAttribute('value')) {
                this.setAttribute('value', this.inputEl.value);
            }
            if (this.inputEl.validity.valid) {
                this.hideError();
            }
            // Zorg dat andere JS-scripts gewoon kunnen luisteren naar 'input' events
            this.dispatchEvent(new Event('input', { bubbles: true }));
        });

        this.inputEl.addEventListener('change', () => {
            this.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // Automatische validatie tonen (wanneer form.submit() wordt aangeroepen)
        this.inputEl.addEventListener('invalid', (e) => {
            e.preventDefault(); // Voorkom standaard browser popup
            this.showError();
        });
    }

    showError() {
        let message = "Ongeldige invoer";

        if (this.inputEl.validity.valueMissing) {
            message = "Dit veld is verplicht";
        } else if (this.inputEl.validity.typeMismatch) {
            if (this.inputEl.type === 'email') message = "Voer een geldig e-mailadres in";
            if (this.inputEl.type === 'url') message = "Voer een geldige link in";
        } else if (this.inputEl.validity.rangeUnderflow) {
            message = `Minimum is ${this.inputEl.min}`;
        }

        this.errorEl.textContent = message;
        this.errorEl.style.display = 'block';
        this.inputEl.classList.add('is-invalid');
    }

    hideError() {
        this.errorEl.style.display = 'none';
        this.inputEl.classList.remove('is-invalid');
    }

    // Maakt het mogelijk om de input in JS makkelijk aan te passen: myInput.value = "Test";
    get value() { return this.inputEl ? this.inputEl.value : this.getAttribute('value'); }
    set value(val) { 
        this.setAttribute('value', val); 
        if(this.inputEl) this.inputEl.value = val;
    }
}

// Export functie voor initialisatie
export function initInput() {
    if (!customElements.get('sol-input')) {
        customElements.define('sol-input', SolInput);
    }
}