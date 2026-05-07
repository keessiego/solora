export function initNotification() {
    window.solora = window.solora || {};

    let area = document.querySelector('.sol-notification-area');
    if (!area) {
        area = document.createElement('div');
        area.className = 'sol-notification-area';
        document.body.appendChild(area);
    }

    // Globale JS API: solora.notify() of solora.notificate()
    const notifyHandler = (options) => {
        // Ondersteuning voor string ID, bv: solora.notificate('noti-1')
        if (typeof options === 'string') {
            const el = document.getElementById(options);
            if (el && typeof el.show === 'function') {
                el.show();
            } else {
                console.warn(`Solora: Notification with ID '${options}' not found or is not a sol-notification.`);
            }
            return;
        }

        let { title, message, variant, type, duration } = options;
        if (duration === undefined) duration = 5000;
        
        const toast = document.createElement('div');
        toast.className = 'sol-notification-toast';
        if (variant) toast.classList.add(`variant-${variant}`);
        if (type) toast.classList.add(`type-${type}`);

        toast.innerHTML = `
            <div class="sol-notification-header">
                <span class="sol-notification-title">${title || ''}</span>
                <button class="sol-notification-close">&times;</button>
            </div>
            <div class="sol-notification-message">${message || ''}</div>
        `;

        area.appendChild(toast);

        // Animatie triggeren (requestAnimationFrame om DOM reflow te verzekeren)
        requestAnimationFrame(() => {
            toast.classList.add('show');
        });

        const closeToast = () => {
            toast.classList.remove('show');
            toast.addEventListener('transitionend', () => toast.remove());
        };

        toast.querySelector('.sol-notification-close').onclick = closeToast;

        if (duration > 0) {
            setTimeout(closeToast, duration);
        }
    };

    window.solora.notify = notifyHandler;
    window.solora.notificate = notifyHandler; // Alias voor de gebruiker

    // 1. Web Component <sol-notification>
    class SolNotification extends HTMLElement {
        connectedCallback() {
            this.style.display = 'none';
            if (this.hasAttribute('show')) {
                this.show();
            }
        }
        
        show() {
            window.solora.notify({
                title: this.getAttribute('title') || '',
                message: this.getAttribute('message') || this.innerHTML.trim() || '',
                variant: this.getAttribute('variant'),
                type: this.getAttribute('type'),
                duration: this.hasAttribute('duration') ? parseInt(this.getAttribute('duration')) : 5000
            });
        }
    }

    if (!customElements.get('sol-notification')) {
        customElements.define('sol-notification', SolNotification);
    }

    // 2. Laravel Web Component <sol-laravel-notification>
    class SolLaravelNotification extends HTMLElement {
        connectedCallback() {
            this.style.display = 'none';
            const variant = this.getAttribute('variant');
            const duration = this.hasAttribute('duration') ? parseInt(this.getAttribute('duration')) : 5000;
            
            const success = this.getAttribute('success');
            if (success) window.solora.notify({ title: 'Succes', message: success, type: 'success', variant, duration });

            const error = this.getAttribute('error');
            if (error) window.solora.notify({ title: 'Fout', message: error, type: 'error', variant, duration });

            const info = this.getAttribute('info');
            if (info) window.solora.notify({ title: 'Info', message: info, type: 'info', variant, duration });
            
            const warning = this.getAttribute('warning');
            if (warning) window.solora.notify({ title: 'Let op', message: warning, type: 'warning', variant, duration });
        }
    }

    if (!customElements.get('sol-laravel-notification')) {
        customElements.define('sol-laravel-notification', SolLaravelNotification);
    }
}
