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

        this.appendChild(this.input);
        this.appendChild(box);
        if (labelText.trim()) {
            this.appendChild(label);
        }

        this.input.checked = this.hasAttribute('checked');
        if (this.hasAttribute('disabled')) {
            this.input.disabled = true;
        }

        this.addEventListener('click', (e) => {
            if (this.hasAttribute('disabled')) return;
            this.input.checked = !this.input.checked;
            this.dispatchEvent(new CustomEvent('change', { 
                detail: { checked: this.input.checked } 
            }));
        });
    }

    static get observedAttributes() {
        return ['checked', 'disabled'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (name === 'checked') {
            this.input.checked = this.hasAttribute('checked');
        }
        if (name === 'disabled') {
            this.input.disabled = this.hasAttribute('disabled');
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
}

export function initCheckbox() {
    if (!customElements.get('sol-check')) {
        customElements.define('sol-check', SolCheck);
    }
}
