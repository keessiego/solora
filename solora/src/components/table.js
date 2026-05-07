class SolTable extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        // Zorg ervoor dat de table binnenin de juiste class krijgt
        const table = this.querySelector('table');
        if (table && !table.classList.contains('sol-table')) {
            table.classList.add('sol-table');
        }
    }
}

export function initTable() {
    if (!customElements.get('sol-table')) {
        customElements.define('sol-table', SolTable);
    }
}
