document.addEventListener('DOMContentLoaded', () => {
    const playgrounds = document.querySelectorAll('.sol-playground');

    const updatePlaygrounds = () => {
        playgrounds.forEach(playground => {
            const preview = playground.querySelector('.sol-playground-preview');
            // Zoek expliciet naar onze component ID, anders fallback naar eerste element
            const target = preview.querySelector('[id^="playground-"]') || preview.firstElementChild;
            if (!target) return;

            const controls = playground.querySelectorAll('.sol-playground-toolbar sol-dropdown, .sol-playground-toolbar sol-input');
            
            // Haal de huidige globale variant op uit localStorage
            const currentVariant = localStorage.getItem('solora-variant') || 'default';

            controls.forEach(control => {
                if (control.tagName === 'SOL-DROPDOWN') {
                    control.setAttribute('variant', currentVariant);
                }

                // Stel standaard waarden in bij initialisatie
                const prop = control.getAttribute('data-prop');
                if (prop === 'size') {
                    const mdItem = control.querySelector('.dropdown-item[data-value="md"]');
                    if (mdItem && typeof control.setValue === 'function') {
                        control.setValue(mdItem);
                    }
                }

                control.removeEventListener('change', handleControlChange);
                control.addEventListener('change', handleControlChange);
                
                // Voor sol-input controls
                if (control.tagName === 'SOL-INPUT') {
                    control.removeEventListener('input', handleControlChange);
                    control.addEventListener('input', handleControlChange);
                }
            });

            // Initial code usage update
            updateCodeSnippet(playground, target);
        });
    };

    function handleControlChange(e) {
        const control = e.currentTarget;
        const playground = control.closest('.sol-playground');
        const target = playground.querySelector('.sol-playground-preview [id^="playground-"]') || playground.querySelector('.sol-playground-preview').firstElementChild;
        const attr = control.getAttribute('data-prop');
        
        if (!attr || !target) return;
        
        // Waarde uit detail (dropdown) of target.value (input)
        const value = e.detail !== undefined ? e.detail : (e.target.value !== undefined ? e.target.value : null);
        
        if (value === 'none' || value === '' || value === false || value === 'false') {
            target.removeAttribute(attr);
        } else if (value === 'true' || value === true) {
            target.setAttribute(attr, '');
        } else {
            target.setAttribute(attr, value);
        }

        updateCodeSnippet(playground, target);
    }

    function updateCodeSnippet(playground, target) {
        const codeBlock = playground.nextElementSibling;
        if (codeBlock && (codeBlock.tagName === 'SOL-CODE' || codeBlock.tagName === 'SOL-CODEBLOCK')) {
            const tagName = target.tagName.toLowerCase();
            const attributes = Array.from(target.attributes)
                .filter(attr => attr.name !== 'id' && attr.name !== 'class' && attr.name !== 'style')
                .map(attr => attr.value === '' ? attr.name : `${attr.name}="${attr.value}"`)
                .join(' ');
            
            let code = '';
            
            if (tagName === 'sol-navbar') {
                const menu = target.querySelector('.sol-navbar-menu');
                let itemsHtml = '';
                if (menu) {
                    itemsHtml = '\n' + Array.from(menu.querySelectorAll('li > *')).map(el => '    ' + el.outerHTML).join('\n') + '\n';
                }
                code = `<${tagName}${attributes ? ' ' + attributes : ''}>${itemsHtml}</${tagName}>`;
            } else if (tagName === 'sol-sidebar') {
                code = `<sol-page>\n    <${tagName}${attributes ? ' ' + attributes : ''}>\n        <!-- Sidebar Content -->\n    </${tagName}>\n    \n    <sol-main>\n        <h1>Mijn Dashboard</h1>\n    </sol-main>\n</sol-page>`;
            } else {
                let content = '';
                const icon = target.querySelector('sol-icon');
                if (icon) {
                    const iconName = icon.getAttribute('name');
                    const iconSize = icon.getAttribute('size');
                    content = `\n    <sol-icon name="${iconName}" size="${iconSize}"></sol-icon>\n`;
                } else {
                    content = target.textContent.trim();
                }
                code = `<${tagName}${attributes ? ' ' + attributes : ''}>${content}</${tagName}>`;
            }
            
            if (typeof codeBlock.setCode === 'function') {
                codeBlock.setCode(code);
            }
        }
    }

    // Initial update
    updatePlaygrounds();

    // Specifieke Button Playground Logica
    const buttonPlayground = document.getElementById('button-playground');
    if (buttonPlayground) {
        const playgroundBtn = document.getElementById('playground-button');
        const textInput = document.getElementById('button-text-input');
        const iconInput = document.getElementById('button-icon-input');
        const roundedControl = document.getElementById('rounded-control');
        const textWrapper = document.getElementById('text-control-wrapper');
        const iconWrapper = document.getElementById('icon-control-wrapper');
        const openPickerBtn = document.getElementById('open-icon-picker');
        
        const updateContent = (isRounded) => {
            if (isRounded) {
                textWrapper.style.display = 'none';
                iconWrapper.style.display = 'flex';
                
                // Bepaal icon size op basis van button size
                const btnSize = playgroundBtn.getAttribute('size') || 'md';
                let iconSize = 20;
                if (btnSize === 'sm') iconSize = 16;
                if (btnSize === 'lg') iconSize = 24;
                if (btnSize === 'xl') iconSize = 28;

                const iconName = iconInput.value || 'zap';
                playgroundBtn.innerHTML = `<sol-icon name="${iconName}" size="${iconSize}"></sol-icon>`;
            } else {
                textWrapper.style.display = 'flex';
                iconWrapper.style.display = 'none';
                playgroundBtn.textContent = textInput.value;
            }
            updateCodeSnippet(buttonPlayground, playgroundBtn);
        };

        textInput.addEventListener('input', (e) => {
            if (!playgroundBtn.hasAttribute('rounded')) {
                playgroundBtn.textContent = e.target.value;
                updateCodeSnippet(buttonPlayground, playgroundBtn);
            }
        });

        iconInput.addEventListener('input', (e) => {
            if (playgroundBtn.hasAttribute('rounded')) {
                updateContent(true);
            }
        });

        roundedControl.addEventListener('change', (e) => {
            const isRounded = e.detail === 'true';
            updateContent(isRounded);
        });

        // Icon Search Modal openen
        if (openPickerBtn) {
            openPickerBtn.addEventListener('click', () => {
                const lucideModal = document.getElementById('lucide-modal');
                const iframe = document.getElementById('lucide-iframe');
                
                if (lucideModal && iframe) {
                    if (!iframe.src || iframe.src === window.location.href) {
                        iframe.src = "https://lucide.dev/icons";
                    }
                    lucideModal.setAttribute('open', '');
                }
            });
        }
    }

    // Specifieke Navbar Playground Logica
    const navbarPlayground = document.getElementById('navbar-playground');
    if (navbarPlayground) {
        const playgroundNav = document.getElementById('playground-navbar');
        const brandInput = document.getElementById('navbar-brand-input');
        const logoInput = document.getElementById('navbar-logo-input');
        const stickyControl = document.getElementById('navbar-sticky-control');

        const updateNav = () => {
            if (brandInput.value) playgroundNav.setAttribute('brand', brandInput.value);
            else playgroundNav.removeAttribute('brand');

            if (logoInput.value) playgroundNav.setAttribute('logo', logoInput.value);
            else playgroundNav.removeAttribute('logo');

            updateCodeSnippet(navbarPlayground, playgroundNav);
        };

        brandInput.addEventListener('input', updateNav);
        logoInput.addEventListener('input', updateNav);
        
        stickyControl.addEventListener('change', (e) => {
            const isSticky = e.detail === 'true';
            if (isSticky) {
                playgroundNav.setAttribute('sticky', '');
                playgroundNav.style.position = 'sticky';
                playgroundNav.style.top = '0';
            } else {
                playgroundNav.removeAttribute('sticky');
                playgroundNav.style.position = 'relative';
            }
            updateCodeSnippet(navbarPlayground, playgroundNav);
        });
    }

    // Specifieke Sidebar Playground Logica
    const sidebarPlayground = document.getElementById('sidebar-playground');
    if (sidebarPlayground) {
        const playgroundSidebar = document.getElementById('playground-sidebar');
        
        // We overschrijven de standaard handleControlChange voor de sidebar
        // omdat we 'fixed' in de preview container willen houden (absolute ipv fixed)
        const sidebarControls = sidebarPlayground.querySelectorAll('.sol-playground-toolbar sol-dropdown');
        
        sidebarControls.forEach(control => {
            control.removeEventListener('change', handleControlChange);
            control.addEventListener('change', (e) => {
                const attr = control.getAttribute('data-prop');
                const value = e.detail;
                
                if (value === 'none' || value === '' || value === false || value === 'false') {
                    playgroundSidebar.removeAttribute(attr);
                } else if (value === 'true' || value === true) {
                    playgroundSidebar.setAttribute(attr, '');
                } else {
                    playgroundSidebar.setAttribute(attr, value);
                }

                updateCodeSnippet(sidebarPlayground, playgroundSidebar);
            });
        });
    }

    // Specifieke Input Playground Logica
    const inputPlayground = document.getElementById('input-playground');
    if (inputPlayground) {
        const typeControl = document.getElementById('input-type-control');
        const pwToggleWrapper = document.getElementById('password-toggle-wrapper');
        const openPickerBtn = inputPlayground.querySelector('#open-icon-picker');

        if (typeControl && pwToggleWrapper) {
            typeControl.addEventListener('change', (e) => {
                const target = inputPlayground.querySelector('#playground-input');
                if (e.detail === 'password') {
                    pwToggleWrapper.style.display = 'flex';
                } else {
                    pwToggleWrapper.style.display = 'none';
                    // Verwijder het attribuut als het geen wachtwoord meer is
                    if (target) {
                        target.removeAttribute('toggle-password');
                        
                        // En zet de dropdown weer op false
                        const pwDropdown = pwToggleWrapper.querySelector('sol-dropdown');
                        if (pwDropdown && pwDropdown.setValue) {
                            const falseItem = pwDropdown.querySelector('.dropdown-item[data-value="false"]');
                            if (falseItem) pwDropdown.setValue(falseItem);
                        }
                    }
                }
                if(target) updateCodeSnippet(inputPlayground, target);
            });
        }

        if (openPickerBtn) {
            openPickerBtn.addEventListener('click', () => {
                const lucideModal = document.getElementById('lucide-modal');
                const iframe = document.getElementById('lucide-iframe');
                
                if (lucideModal && iframe) {
                    if (!iframe.src || iframe.src === window.location.href) {
                        iframe.src = "https://lucide.dev/icons";
                    }
                    lucideModal.setAttribute('open', '');
                }
            });
        }
    }

    // Luister naar variant veranderingen vanuit docs.js
    window.addEventListener('storage', (e) => {
        if (e.key === 'solora-variant') {
            updatePlaygrounds();
        }
    });

    // Observer om variant wijzigingen direct op te vangen (omdat storage event niet op hetzelfde window vuurt)
    const variantObserver = new MutationObserver(() => updatePlaygrounds());
    variantObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    
    // We kunnen ook de variantDropdown in de gaten houden als die er is
    const variantDropdown = document.getElementById('setting-variant');
    if (variantDropdown) {
        variantDropdown.addEventListener('change', () => {
            // Wacht heel even tot docs.js klaar is met applyVariant
            setTimeout(updatePlaygrounds, 10);
        });
    }
});
