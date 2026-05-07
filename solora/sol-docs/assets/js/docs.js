document.addEventListener('DOMContentLoaded', () => {
    // 1. Global Settings Modal
    const settingsBtn = document.getElementById('open-settings');
    const settingsModal = document.getElementById('settings-modal');
    const themeDropdown = document.getElementById('setting-theme');
    const variantDropdown = document.getElementById('setting-variant');

    if (settingsBtn && settingsModal) {
        settingsBtn.addEventListener('click', () => {
            settingsModal.setAttribute('open', '');
        });

        const STORAGE_THEME = 'solora-theme';
        const STORAGE_VARIANT = 'solora-variant';

        const applyTheme = (theme) => {
            if (theme === 'dark') {
                document.documentElement.classList.add('dark');
            } else {
                document.documentElement.classList.remove('dark');
            }
            localStorage.setItem(STORAGE_THEME, theme);
        };

        const applyVariant = (variant) => {
            const components = document.querySelectorAll('sol-sidebar, sol-modal, sol-dropdown, sol-context-options, sol-card, sol-input, sol-textarea, sol-contextmenu, sol-navbar, sol-notification, sol-button');
            components.forEach(comp => {
                // Sla componenten in de preview-sectie over zodat deze "pure" blijven
                if (comp.closest('.sol-playground-preview')) return;

                comp.setAttribute('variant', variant);
                
                // Extra: sidebar gaat floating bij glass voor de mooiste look
                if (comp.tagName === 'SOL-SIDEBAR') {
                    if (variant === 'glass') {
                        comp.setAttribute('floating', '');
                        comp.removeAttribute('compact');
                    } else {
                        comp.removeAttribute('floating');
                        comp.setAttribute('compact', '');
                    }
                }
            });
            localStorage.setItem(STORAGE_VARIANT, variant);
        };

        // Initialize from storage
        const savedTheme = localStorage.getItem(STORAGE_THEME) || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
        const savedVariant = localStorage.getItem(STORAGE_VARIANT) || 'default';

        applyTheme(savedTheme);
        applyVariant(savedVariant);

        // Sync dropdowns
        setTimeout(() => {
            if (themeDropdown) {
                const item = themeDropdown.querySelector(`.dropdown-item[data-value="${savedTheme}"]`);
                if (item) themeDropdown.setValue(item);
            }
            if (variantDropdown) {
                const item = variantDropdown.querySelector(`.dropdown-item[data-value="${savedVariant}"]`);
                if (item) variantDropdown.setValue(item);
            }
        }, 100);

        // Listen for changes
        if (themeDropdown) {
            themeDropdown.addEventListener('change', (e) => applyTheme(e.detail));
        }
        if (variantDropdown) {
            variantDropdown.addEventListener('change', (e) => applyVariant(e.detail));
        }
    }

    // 3. Apple Modal for Lucide Icons
    const lucideLink = document.getElementById('open-lucide');
    const lucideModal = document.getElementById('lucide-modal');
    if (lucideLink && lucideModal) {
        const iframe = document.getElementById('lucide-iframe');

        // Manual Fix: Geef de container een ID voor styling (portal workaround)
        if (lucideModal.container) {
            lucideModal.container.id = 'lucide-modal-container';
        }

        lucideLink.addEventListener('click', (e) => {
            e.preventDefault();
            if (!iframe.src || iframe.src === window.location.href) {
                iframe.src = "https://lucide.dev/icons";
            }
            lucideModal.setAttribute('open', '');
        });
    }
});
