class SolInput extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    // Luister naar wijzigingen in deze attributen om live updates te ondersteunen
    static get observedAttributes() {
        return ['type', 'placeholder', 'value', 'label', 'disabled', 'required', 'autofocus', 'min', 'max', 'name', 'variant', 'icon', 'icon-pos', 'multiple', 'accept', 'icon-bg', 'toggle-password'];
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        // 1. Label aanmaken
        this.labelEl = document.createElement('label');
        this.labelEl.className = 'sol-label';
        
        // 2. Container voor alles onder het label
        this.containerEl = document.createElement('div');
        this.containerEl.className = 'sol-input-container';

        // 3. Wrapper specifiek voor de input en "inside" iconen
        this.wrapperEl = document.createElement('div');
        this.wrapperEl.className = 'sol-input-wrapper';

        // 4. Native input aanmaken
        this.inputEl = document.createElement('input');
        this.inputEl.className = 'sol-input';

        // 5. Icon element aanmaken
        this.iconEl = document.createElement('sol-icon');
        this.iconEl.setAttribute('size', '18');
        this.iconEl.className = 'sol-input-icon';

        // 6. Password Toggle aanmaken
        this.toggleEl = document.createElement('button');
        this.toggleEl.type = 'button';
        this.toggleEl.className = 'sol-password-toggle';
        this.toggleEl.innerHTML = '<sol-icon name="eye" size="18"></sol-icon>';
        this.toggleEl.style.display = 'none';
        this.toggleEl.onclick = () => this.togglePasswordVisibility();

        // 7. Error span aanmaken
        this.errorEl = document.createElement('span');
        this.errorEl.className = 'sol-error-message';

        // Structuur opbouwen
        this.appendChild(this.labelEl);
        this.appendChild(this.containerEl);
        this.containerEl.appendChild(this.wrapperEl);
        this.wrapperEl.appendChild(this.inputEl);
        this.wrapperEl.appendChild(this.toggleEl);
        this.appendChild(this.errorEl);

        this.updateAttributes();
        this.bindEvents();

        // Handle autofocus manually for custom elements
        if (this.hasAttribute('autofocus')) {
            requestAnimationFrame(() => {
                this.inputEl.focus();
            });
        }
    }

    togglePasswordVisibility() {
        if (this.inputEl.type === 'password') {
            this.inputEl.type = 'text';
            this.toggleEl.innerHTML = '<sol-icon name="eye-off" size="18"></sol-icon>';
        } else {
            this.inputEl.type = 'password';
            this.toggleEl.innerHTML = '<sol-icon name="eye" size="18"></sol-icon>';
        }
    }

    attributeChangedCallback() {
        if (this.initialized) {
            this.updateAttributes();
        }
    }

    updateAttributes() {
        // Reguliere eigenschappen doorgeven aan de native input
        const props = ['type', 'placeholder', 'value', 'name', 'min', 'max', 'accept'];
        props.forEach(prop => {
            if (this.hasAttribute(prop)) {
                this.inputEl.setAttribute(prop, this.getAttribute(prop));
            } else {
                this.inputEl.removeAttribute(prop);
            }
        });

        // Toggle password afhandelen
        if (this.hasAttribute('toggle-password') && this.getAttribute('type') === 'password') {
            this.toggleEl.style.display = 'flex';
        } else {
            this.toggleEl.style.display = 'none';
        }

        // Variant afhandelen
        const variant = this.getAttribute('variant') || 'default';
        this.dataset.variant = variant;

        // Icoon afhandelen
        const iconName = this.getAttribute('icon');
        const iconPos = this.getAttribute('icon-pos') || 'start';
        const iconBg = this.getAttribute('icon-bg');

        if (iconName) {
            this.iconEl.setAttribute('name', iconName);
            this.dataset.iconPos = iconPos;
            
            if (iconBg) {
                this.dataset.iconBg = iconBg;
            } else {
                delete this.dataset.iconBg;
            }
            
            // Verplaats icoon naar de juiste plek
            if (iconPos === 'start') {
                this.wrapperEl.prepend(this.iconEl);
            } else if (iconPos === 'end') {
                this.wrapperEl.appendChild(this.iconEl);
            } else if (iconPos === 'start-outside') {
                this.containerEl.prepend(this.iconEl);
            } else if (iconPos === 'end-outside') {
                this.containerEl.appendChild(this.iconEl);
            }
            this.iconEl.style.display = 'inline-flex';
        } else {
            this.iconEl.style.display = 'none';
            delete this.dataset.iconPos;
            delete this.dataset.iconBg;
        }

        // Specifieke klasse voor file input
        if (this.getAttribute('type') === 'file') {
            this.classList.add('is-file-input');
        } else {
            this.classList.remove('is-file-input');
        }

        // Boolean eigenschappen doorgeven (disabled, required, multiple)
        if (this.hasAttribute('disabled')) this.inputEl.setAttribute('disabled', 'disabled');
        else this.inputEl.removeAttribute('disabled');

        if (this.hasAttribute('required')) this.inputEl.setAttribute('required', 'required');
        else this.inputEl.removeAttribute('required');

        if (this.hasAttribute('autofocus')) this.inputEl.setAttribute('autofocus', 'autofocus');
        else this.inputEl.removeAttribute('autofocus');

        if (this.hasAttribute('multiple')) this.inputEl.setAttribute('multiple', 'multiple');
        else this.inputEl.removeAttribute('multiple');

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
            // Telefonische validatie: alleen getallen, spaties, plus en minteken toestaan
            if (this.getAttribute('type') === 'tel') {
                this.inputEl.value = this.inputEl.value.replace(/[^0-9\s\+\-]/g, '');
            }

            // Synchroniseer het value-attribuut
            if (this.inputEl.value !== this.getAttribute('value')) {
                this.setAttribute('value', this.inputEl.value);
            }
            if (this.inputEl.validity.valid) {
                this.hideError();
                this.inputEl.setCustomValidity("");
            }
            // Zorg dat andere JS-scripts gewoon kunnen luisteren naar 'input' events
            this.dispatchEvent(new Event('input', { bubbles: true }));
        });

        this.inputEl.addEventListener('change', () => {
            if (this.getAttribute('type') === 'file' && this.hasAttribute('max')) {
                const max = parseInt(this.getAttribute('max'));
                if (this.inputEl.files.length > max) {
                    const msg = `Maximaal ${max} bestanden toegestaan`;
                    this.showError(msg);
                    this.inputEl.setCustomValidity(msg);
                    return;
                } else {
                    this.hideError();
                    this.inputEl.setCustomValidity("");
                }
            }
            this.dispatchEvent(new Event('change', { bubbles: true }));
        });

        // Automatische validatie tonen (wanneer form.submit() wordt aangeroepen)
        this.inputEl.addEventListener('invalid', (e) => {
            e.preventDefault(); // Voorkom standaard browser popup
            this.showError();
        });
    }

    showError(customMessage) {
        let message = customMessage || "Ongeldige invoer";

        if (!customMessage) {
            if (this.inputEl.validity.valueMissing) {
                message = "Dit veld is verplicht";
            } else if (this.inputEl.validity.typeMismatch) {
                if (this.inputEl.type === 'email') message = "Voer een geldig e-mailadres in";
                if (this.inputEl.type === 'url') message = "Voer een geldige link in";
            } else if (this.inputEl.validity.rangeUnderflow) {
                message = `Minimum is ${this.inputEl.min}`;
            } else if (this.inputEl.validity.rangeOverflow) {
                message = `Maximum is ${this.inputEl.max}`;
            }
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
