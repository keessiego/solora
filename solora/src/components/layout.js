class SolPage extends HTMLElement {
    constructor() {
        super();
    }
}

class SolMain extends HTMLElement {
    constructor() {
        super();
    }
}

export function initLayout() {
    if (!customElements.get('sol-page')) {
        customElements.define('sol-page', SolPage);
    }
    if (!customElements.get('sol-main')) {
        customElements.define('sol-main', SolMain);
    }
}
