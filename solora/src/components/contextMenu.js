export function initContextMenu() {
    let menu = document.querySelector('.sol-context-menu');
    if (!menu) {
        menu = document.createElement('div');
        menu.className = 'sol-context-menu';
        document.body.appendChild(menu);
    }

    // Houd bij welk element het doelwit was bij rechtsklik
    let contextTarget = null;

    const showMenu = (e) => {
        // Alleen tonen als <sol-contextmenu> op de pagina staat
        const contextEl = document.querySelector('sol-contextmenu');
        if (!contextEl) return;

        let activeVariant = contextEl.getAttribute('variant') || 'default';

        e.preventDefault();
        e.stopPropagation();
        contextTarget = e.target;

        const isApple = /Mac|iPhone|iPod|iPad/.test(navigator.platform);
        const symbol  = isApple ? '⌘' : 'Ctrl+';
        const alt     = isApple ? '⌥' : 'Alt+';
        const shift   = isApple ? '⇧' : 'Shift+';
        const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

        const selection   = window.getSelection().toString().trim();
        const link        = e.target.closest('a');
        const img         = e.target.closest('img');
        const input       = e.target.closest('input, textarea, [contenteditable]');
        const isEditable  = input || e.target.isContentEditable;
        const isTextInput = input && (input.type === 'text' || input.type === 'search'
                            || input.type === 'email' || input.type === 'password'
                            || input.tagName === 'TEXTAREA' || input.isContentEditable);

        let menuHtml = '';

        // ── CONTEXT: Custom opties (ondersteunt nesting) ──────────
        const containers = [];
        let tempEl = e.target;
        
        while (tempEl && tempEl !== document) {
            // Als we direct op een sol-context-options klikken
            if (tempEl.tagName && tempEl.tagName.toLowerCase() === 'sol-context-options') {
                if (!containers.includes(tempEl)) {
                    containers.unshift(tempEl);
                }
            } 
            
            // Controleer of dit element sol-context-options als directe kinderen heeft
            if (tempEl.children) {
                Array.from(tempEl.children).forEach(child => {
                    if (child.tagName && child.tagName.toLowerCase() === 'sol-context-options') {
                        if (!containers.includes(child)) {
                            containers.unshift(child);
                        }
                    }
                    
                    // Ondersteuning voor <template><sol-context-options></template> (bijv. in TR)
                    if (child.tagName && child.tagName.toLowerCase() === 'template') {
                        const tplOpts = child.content.querySelector('sol-context-options');
                        if (tplOpts && !containers.includes(tplOpts)) {
                            containers.unshift(tplOpts);
                        }
                    }
                });
            }

            tempEl = tempEl.parentElement;
        }

        // Bepaal variant: overschrijf globaal als een lokale <sol-context-options variant="..."> heeft
        for (let i = containers.length - 1; i >= 0; i--) {
            if (containers[i].hasAttribute('variant')) {
                activeVariant = containers[i].getAttribute('variant');
                break;
            }
        }
        
        menu.classList.remove('variant-default', 'variant-glass');
        menu.classList.add(`variant-${activeVariant}`);

        containers.forEach(customContainer => {
            const children = Array.from(customContainer.children);
            if (children.length > 0) {
                const containerLabel = customContainer.getAttribute('label');
                const firstTag = children[0].tagName.toLowerCase();
                
                if (firstTag !== 'sol-group-label') {
                    menuHtml += `<div class="sol-menu-label">${containerLabel || 'Opties'}</div>`;
                }

                children.forEach(child => {
                    const tag = child.tagName.toLowerCase();
                    if (tag === 'sol-item') {
                        const isDisabled = child.hasAttribute('disabled');
                        const isReadonly = child.hasAttribute('readonly');
                        const type = child.getAttribute('type') || child.getAttribute('variant');
                        const href = child.getAttribute('href');
                        const target = child.getAttribute('target') || '_self';
                        
                        let actionAttr = 'custom';
                        let customAction = child.getAttribute('action') || '';
                        let urlAttr = '';

                        if (!customAction && child.hasAttribute('onclick')) {
                            customAction = `js(${child.getAttribute('onclick')})`;
                        } else if (!customAction && href) {
                            actionAttr = (target === '_blank') ? 'open-tab' : 'open-link';
                            urlAttr = href;
                        }

                        menuHtml += `
                            <div class="sol-menu-item${isDisabled ? ' disabled' : ''}${isReadonly ? ' readonly' : ''}${type ? ` type-${type}` : ''}" 
                                 data-action="${actionAttr}" 
                                 data-url="${urlAttr.replace(/"/g, '&quot;')}"
                                 data-custom-action="${customAction.replace(/"/g, '&quot;')}">
                                ${child.getAttribute('label')}
                            </div>
                        `;
                    } else if (tag === 'sol-group-label') {
                        menuHtml += `<div class="sol-menu-label">${child.getAttribute('label')}</div>`;
                    } else if (tag === 'sol-divider') {
                        menuHtml += `<div class="sol-menu-divider"></div>`;
                    }
                });
                menuHtml += `<div class="sol-menu-divider"></div>`;
            }
        });

        // ── CONTEXT: Tekst geselecteerd ────────────────────────────
        if (selection.length > 0) {
            menuHtml += `
                <div class="sol-menu-label">Selectie</div>
                <div class="sol-menu-item" data-action="copy">
                    Kopieer <span class="sol-menu-shortcut">${symbol}C</span>
                </div>
                ${isEditable ? `
                <div class="sol-menu-item" data-action="cut">
                    Knippen <span class="sol-menu-shortcut">${symbol}X</span>
                </div>` : ''}
                <div class="sol-menu-item" data-action="search-google">
                    Zoek op Google
                </div>
                <div class="sol-menu-item" data-action="translate">
                    Vertaal…
                </div>
                <div class="sol-menu-divider"></div>
            `;
        }

        // ── CONTEXT: Invoerveld ────────────────────────────────────
        if (isTextInput) {
            menuHtml += `
                <div class="sol-menu-label">Tekstveld</div>
                ${selection.length > 0 ? `
                <div class="sol-menu-item" data-action="cut">
                    Knippen <span class="sol-menu-shortcut">${symbol}X</span>
                </div>
                <div class="sol-menu-item" data-action="copy">
                    Kopieer <span class="sol-menu-shortcut">${symbol}C</span>
                </div>` : ''}
                <div class="sol-menu-item" data-action="paste">
                    Plakken <span class="sol-menu-shortcut">${symbol}V</span>
                </div>
                <div class="sol-menu-item" data-action="select-all">
                    Alles selecteren <span class="sol-menu-shortcut">${symbol}A</span>
                </div>
                <div class="sol-menu-divider"></div>
            `;
        }

        // ── CONTEXT: Afbeelding ───────────────────────────────────
        if (img) {
            menuHtml += `
                <div class="sol-menu-label">Afbeelding</div>
                <div class="sol-menu-item" data-action="open-img" data-url="${img.src}">
                    Open afbeelding
                </div>
                <div class="sol-menu-item" data-action="copy-img-url" data-url="${img.src}">
                    Kopieer URL
                </div>
                <div class="sol-menu-divider"></div>
            `;
        }

        // ── CONTEXT: Link ─────────────────────────────────────────
        if (link) {
            const href = link.href;
            if (href.startsWith('mailto:')) {
                const email = href.replace('mailto:', '').split('?')[0];
                menuHtml += `
                    <div class="sol-menu-label">E-mail</div>
                    <div class="sol-menu-item" data-action="open-link" data-url="${href}">Stuur e-mail…</div>
                    <div class="sol-menu-item" data-action="copy-text" data-text="${email}">Kopieer adres</div>
                `;
            } else if (href.startsWith('tel:')) {
                const phone = href.replace('tel:', '').split('?')[0];
                menuHtml += `
                    <div class="sol-menu-label">Telefoon</div>
                    <div class="sol-menu-item" data-action="open-link" data-url="${href}">Bellen…</div>
                    <div class="sol-menu-item" data-action="copy-text" data-text="${phone}">Kopieer nummer</div>
                `;
            } else {
                menuHtml += `
                    <div class="sol-menu-label">Link</div>
                    <div class="sol-menu-item" data-action="open-tab" data-url="${href}">Open in nieuw tabblad</div>
                    <div class="sol-menu-item" data-action="copy-link" data-url="${href}">Kopieer link</div>
                `;
            }
            menuHtml += `<div class="sol-menu-divider"></div>`;
        }

        // ── NAVIGATIE & PAGINA ────────────────────────────────────
        menuHtml += `
            <div class="sol-menu-label">Navigatie</div>
            <div class="sol-menu-item" data-action="reload">
                Vernieuwen <span class="sol-menu-shortcut">${symbol}R</span>
            </div>
            <div class="sol-menu-divider"></div>
            <div class="sol-menu-label">Pagina</div>
            <div class="sol-menu-item" data-action="copy-page-url">Kopieer pagina-URL</div>
            ${!isSafari ? `<div class="sol-menu-item" data-action="view-source">Paginabron <span class="sol-menu-shortcut">${symbol}U</span></div>` : ''}
            <div class="sol-menu-item" data-action="print">Printen <span class="sol-menu-shortcut">${symbol}P</span></div>
        `;

        menu.innerHTML = menuHtml;
        menu.style.display = 'block';

        let posX = e.clientX;
        let posY = e.clientY;
        const menuWidth = menu.offsetWidth;
        const menuHeight = menu.offsetHeight;

        if (posX + menuWidth > window.innerWidth) posX -= menuWidth;
        if (posY + menuHeight > window.innerHeight) posY -= menuHeight;

        menu.style.left = `${Math.max(5, posX)}px`;
        menu.style.top  = `${Math.max(5, posY)}px`;
        requestAnimationFrame(() => menu.classList.add('visible'));
    };

    const hideMenu = () => {
        menu.classList.remove('visible');
        setTimeout(() => {
            if (!menu.classList.contains('visible')) menu.style.display = 'none';
        }, 150);
    };

    // ── Event listeners ───────────────────────────────────────────
    document.addEventListener('contextmenu', showMenu);
    document.addEventListener('click', hideMenu);
    window.addEventListener('scroll', hideMenu);
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape') hideMenu(); });

    // ── Action handler ────────────────────────────────────────────
    menu.addEventListener('click', (e) => {
        const item = e.target.closest('.sol-menu-item');
        if (!item || item.classList.contains('disabled') || item.classList.contains('readonly')) return;

        const action = item.dataset.action;
        const url    = item.dataset.url;
        const text   = item.dataset.text;
        const sel    = window.getSelection().toString().trim();

        switch (action) {
            case 'custom': {
                const customAction = item.dataset.customAction;
                if (customAction.startsWith('js(')) {
                    const code = customAction.slice(3, -1);
                    try { new Function('target', code).call(contextTarget, contextTarget); } catch (err) { console.error(err); }
                } else if (customAction.startsWith('php(')) {
                    const code = customAction.slice(4, -1);
                    fetch(window.location.href, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'X-Solora-PHP-Action': 'true' },
                        body: new URLSearchParams({ 'solora_exec_php': code })
                    });
                }
                break;
            }
            case 'copy':        document.execCommand('copy'); break;
            case 'cut':         document.execCommand('cut');  break;
            case 'paste':       navigator.clipboard.readText().then(t => document.execCommand('insertText', false, t)); break;
            case 'select-all':  document.execCommand('selectAll'); break;
            case 'open-img':    window.open(url, '_blank'); break;
            case 'copy-img-url': navigator.clipboard.writeText(url); break;
            case 'open-tab':    window.open(url, '_blank'); break;
            case 'copy-link':   navigator.clipboard.writeText(url); break;
            case 'open-link':   window.location.href = url; break;
            case 'copy-text':   navigator.clipboard.writeText(text); break;
            case 'reload':      location.reload(); break;
            case 'copy-page-url': navigator.clipboard.writeText(location.href); break;
            case 'view-source': window.open(`view-source:${location.href}`, '_blank'); break;
            case 'print':       window.print(); break;
            case 'search-google': window.open(`https://www.google.com/search?q=${encodeURIComponent(sel)}`, '_blank'); break;
            case 'translate':   window.open(`https://translate.google.com/?sl=auto&tl=nl&text=${encodeURIComponent(sel)}`, '_blank'); break;
        }
        hideMenu();
    });
}
