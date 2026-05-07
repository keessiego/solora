class SolTextarea extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    static get observedAttributes() {
        return ['placeholder', 'value', 'label', 'disabled', 'required', 'autofocus', 'name', 'variant', 'rows', 'cols', 'resize'];
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        this.labelEl = document.createElement('label');
        this.labelEl.className = 'sol-label';
        
        this.containerEl = document.createElement('div');
        this.containerEl.className = 'sol-input-container sol-textarea-container';

        this.wrapperEl = document.createElement('div');
        this.wrapperEl.className = 'sol-input-wrapper sol-textarea-wrapper';

        this.inputEl = document.createElement('textarea');
        this.inputEl.className = 'sol-input sol-textarea';

        this.errorEl = document.createElement('span');
        this.errorEl.className = 'sol-error-message';

        this.appendChild(this.labelEl);
        this.appendChild(this.containerEl);
        this.containerEl.appendChild(this.wrapperEl);
        this.wrapperEl.appendChild(this.inputEl);
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
        const props = ['placeholder', 'value', 'name', 'rows', 'cols'];
        props.forEach(prop => {
            if (this.hasAttribute(prop)) {
                this.inputEl.setAttribute(prop, this.getAttribute(prop));
            } else {
                this.inputEl.removeAttribute(prop);
            }
        });

        // Set value from inner text if present and value is not set
        if (!this.hasAttribute('value') && this.textContent.trim().length > 0) {
            this.inputEl.value = this.textContent.trim();
        } else if (this.hasAttribute('value')) {
            this.inputEl.value = this.getAttribute('value');
        }

        const variant = this.getAttribute('variant') || 'default';
        this.dataset.variant = variant;

        const resize = this.getAttribute('resize') || 'vertical';
        this.inputEl.style.resize = resize;

        if (this.hasAttribute('disabled')) this.inputEl.setAttribute('disabled', 'disabled');
        else this.inputEl.removeAttribute('disabled');

        if (this.hasAttribute('required')) this.inputEl.setAttribute('required', 'required');
        else this.inputEl.removeAttribute('required');

        if (this.hasAttribute('autofocus')) this.inputEl.setAttribute('autofocus', 'autofocus');
        else this.inputEl.removeAttribute('autofocus');

        if (this.hasAttribute('label')) {
            this.labelEl.textContent = this.getAttribute('label');
            this.labelEl.style.display = 'block';
        } else {
            this.labelEl.style.display = 'none';
        }
    }

    bindEvents() {
        this.inputEl.addEventListener('input', (e) => {
            if (this.inputEl.value !== this.getAttribute('value')) {
                this.setAttribute('value', this.inputEl.value);
            }
            if (this.inputEl.validity.valid) {
                this.hideError();
                this.inputEl.setCustomValidity("");
            }
            this.dispatchEvent(new Event('input', { bubbles: true }));
        });

        this.inputEl.addEventListener('change', () => {
            this.dispatchEvent(new Event('change', { bubbles: true }));
        });

        this.inputEl.addEventListener('invalid', (e) => {
            e.preventDefault();
            this.showError();
        });
    }

    showError(customMessage) {
        let message = customMessage || "Ongeldige invoer";
        if (!customMessage && this.inputEl.validity.valueMissing) {
            message = "Dit veld is verplicht";
        }
        this.errorEl.textContent = message;
        this.errorEl.style.display = 'block';
        this.inputEl.classList.add('is-invalid');
    }

    hideError() {
        this.errorEl.style.display = 'none';
        this.inputEl.classList.remove('is-invalid');
    }

    get value() { return this.inputEl ? this.inputEl.value : this.getAttribute('value'); }
    set value(val) { 
        this.setAttribute('value', val); 
        if(this.inputEl) this.inputEl.value = val;
    }
}

export function initTextarea() {
    if (!customElements.get('sol-textarea')) {
        customElements.define('sol-textarea', SolTextarea);
    }
}
