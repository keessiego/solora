class SolCheck extends HTMLElement {
    constructor() {
        super();
        this.input = document.createElement('input');
        this.input.type = 'checkbox';
        this.input.className = 'sol-check-input';
    }

    connectedCallback() {
        if (this.contains(this.input)) return;

        const labelText = this.innerHTML;
        this.innerHTML = '';

        const box = document.createElement('div');
        box.className = 'sol-check-box';
        box.innerHTML = `<svg viewBox="0 0 24 24"><polyline points="20 6 9 17 4 12"></polyline></svg>`;

        const label = document.createElement('span');
        label.className = 'sol-check-label';
        label.innerHTML = labelText;

        this.errorEl = document.createElement('div');
        this.errorEl.className = 'sol-error-message sol-check-error';
        this.errorEl.style.display = 'none';

        this.appendChild(this.input);
        this.appendChild(box);
        if (labelText.trim()) {
            this.appendChild(label);
        }
        this.appendChild(this.errorEl);

        this.input.checked = this.hasAttribute('checked');
        if (this.hasAttribute('disabled')) {
            this.input.disabled = true;
        }
        if (this.hasAttribute('name')) {
            this.input.name = this.getAttribute('name');
        }

        this.addEventListener('click', (e) => {
            if (this.hasAttribute('disabled')) return;
            // Prevent double-toggling if they click the actual input natively
            if (e.target === this.input) return;
            
            this.input.checked = !this.input.checked;
            this.hideError(); // clear error on change
            this.dispatchEvent(new CustomEvent('change', { 
                detail: { checked: this.input.checked } 
            }));
        });

        this.input.addEventListener('change', () => {
            this.hideError();
        });
    }

    static get observedAttributes() {
        return ['checked', 'disabled', 'name'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked') {
            this.input.checked = this.hasAttribute('checked');
        }
        if (name === 'disabled') {
            this.input.disabled = this.hasAttribute('disabled');
        }
        if (name === 'name') {
            this.input.name = newValue;
        }
    }

    get checked() {
        return this.input.checked;
    }

    set checked(val) {
        if (val) {
            this.setAttribute('checked', '');
        } else {
            this.removeAttribute('checked');
        }
    }

    showError(message = 'Ongeldige invoer') {
        this.classList.add('is-invalid');
        this.errorEl.textContent = message;
        this.errorEl.style.display = 'block';
    }

    hideError() {
        this.classList.remove('is-invalid');
        this.errorEl.style.display = 'none';
    }
}

export function initCheckbox() {
    if (!customElements.get('sol-check')) {
        customElements.define('sol-check', SolCheck);
    }
}
