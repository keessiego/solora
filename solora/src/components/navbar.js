class SolNavbar extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.render();
        
        this.observer = new MutationObserver(() => this.render());
        this.observer.observe(this, { childList: true, subtree: false });
    }

    disconnectedCallback() {
        if (this.observer) this.observer.disconnect();
    }

    render() {
        const brand = this.getAttribute('brand') || 'Solora';
        const brandHref = this.getAttribute('brand-href') || '#';
        
        const items = Array.from(this.children).filter(item => !item.classList.contains('sol-navbar'));
        
        if (this.observer) this.observer.disconnect();

        const oldNav = this.querySelector('.sol-navbar');
        const isOpen = oldNav ? oldNav.classList.contains('is-open') : false;
        
        this.buildNav(brand, brandHref, items, isOpen);

        if (this.observer) {
            this.observer.observe(this, { childList: true, subtree: false });
        }
    }

    buildNav(brand, brandHref, items, isOpen) {
        const existingNav = this.querySelector('.sol-navbar');
        if (existingNav) existingNav.remove();

        const nav = document.createElement('nav');
        nav.className = 'sol-navbar' + (isOpen ? ' is-open' : '');
        
        const container = document.createElement('div');
        container.className = 'sol-navbar-container';
        
        const brandLink = document.createElement('a');
        brandLink.className = 'sol-navbar-brand';
        brandLink.href = brandHref;
        brandLink.innerHTML = brand;
        
        const toggle = document.createElement('button');
        toggle.className = 'sol-navbar-toggle';
        toggle.setAttribute('aria-label', 'Toggle menu');
        toggle.innerHTML = '<span></span><span></span><span></span>';
        
        const menu = document.createElement('ul');
        menu.className = 'sol-navbar-menu';
        
        items.forEach(item => {
            const li = document.createElement('li');
            li.appendChild(item);
            menu.appendChild(li);
        });
        
        toggle.addEventListener('click', () => {
            nav.classList.toggle('is-open');
            if (nav.classList.contains('is-open')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = '';
            }
        });

        menu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                nav.classList.remove('is-open');
                document.body.style.overflow = '';
            }
        });
        
        container.appendChild(brandLink);
        container.appendChild(menu);
        container.appendChild(toggle);
        nav.appendChild(container);
        
        this.appendChild(nav);
    }
}

export function initNavbar() {
    if (!customElements.get('sol-navbar')) {
        customElements.define('sol-navbar', SolNavbar);
    }
}
