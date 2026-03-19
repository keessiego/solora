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
        e.preventDefault();
        contextTarget = e.target;

        const selection   = window.getSelection().toString().trim();
        const link        = e.target.closest('a');
        const img         = e.target.closest('img');
        const input       = e.target.closest('input, textarea, [contenteditable]');
        const isEditable  = input || e.target.isContentEditable;
        const isTextInput = input && (input.type === 'text' || input.type === 'search'
                            || input.type === 'email' || input.type === 'password'
                            || input.tagName === 'TEXTAREA' || input.isContentEditable);

        let menuHtml = '';

        // ── CONTEXT: Tekst geselecteerd ────────────────────────────
        if (selection.length > 0) {
            menuHtml += `
                <div class="sol-menu-label">Selectie</div>
                <div class="sol-menu-item" data-action="copy">
                    Kopieer <span class="sol-menu-shortcut">⌘C</span>
                </div>
                ${isEditable ? `
                <div class="sol-menu-item" data-action="cut">
                    Knippen <span class="sol-menu-shortcut">⌘X</span>
                </div>` : ''}
                <div class="sol-menu-item" data-action="search-google">
                    Zoek op Google: <em>"${selection.slice(0, 20)}${selection.length > 20 ? '…' : ''}"</em>
                </div>
                <div class="sol-menu-item" data-action="search-wiki">
                    Zoek op Wikipedia…
                </div>
                <div class="sol-menu-item" data-action="translate">
                    Vertaal selectie…
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
                    Knippen <span class="sol-menu-shortcut">⌘X</span>
                </div>
                <div class="sol-menu-item" data-action="copy">
                    Kopieer <span class="sol-menu-shortcut">⌘C</span>
                </div>` : ''}
                <div class="sol-menu-item" data-action="paste">
                    Plakken <span class="sol-menu-shortcut">⌘V</span>
                </div>
                <div class="sol-menu-item" data-action="select-all">
                    Alles selecteren <span class="sol-menu-shortcut">⌘A</span>
                </div>
                <div class="sol-menu-item" data-action="clear-field">
                    Veld wissen
                </div>
                <div class="sol-menu-divider"></div>
            `;
        }

        // ── CONTEXT: Afbeelding ───────────────────────────────────
        if (img) {
            menuHtml += `
                <div class="sol-menu-label">Afbeelding</div>
                <div class="sol-menu-item" data-action="open-img" data-url="${img.src}">
                    Afbeelding openen in nieuw tabblad
                </div>
                <div class="sol-menu-item" data-action="copy-img-url" data-url="${img.src}">
                    Kopieer afbeeldings-URL
                </div>
                <div class="sol-menu-item" data-action="download-img" data-url="${img.src}" data-filename="${img.alt || 'afbeelding'}">
                    Afbeelding opslaan…
                </div>
                ${img.alt ? `
                <div class="sol-menu-item" data-action="copy-alt" data-text="${img.alt}">
                    Kopieer alt-tekst
                </div>` : ''}
                <div class="sol-menu-divider"></div>
            `;
        }

        // ── CONTEXT: Link ─────────────────────────────────────────
        if (link) {
            menuHtml += `
                <div class="sol-menu-label">Link</div>
                <div class="sol-menu-item" data-action="open-tab" data-url="${link.href}">
                    Open in nieuw tabblad
                </div>
                <div class="sol-menu-item" data-action="open-window" data-url="${link.href}">
                    Open in nieuw venster
                </div>
                <div class="sol-menu-item" data-action="copy-link" data-url="${link.href}">
                    Kopieer link-adres
                </div>
                <div class="sol-menu-divider"></div>
            `;
        }

        // ── NAVIGATIE ─────────────────────────────────────────────
        menuHtml += `
            <div class="sol-menu-label">Navigatie</div>
            <div class="sol-menu-item${!history.length || history.state === null ? ' disabled' : ''}" data-action="go-back">
                ← Vorige pagina
            </div>
            <div class="sol-menu-item" data-action="go-forward">
                → Volgende pagina
            </div>
            <div class="sol-menu-item" data-action="reload">
                Vernieuwen <span class="sol-menu-shortcut">⌘R</span>
            </div>
            <div class="sol-menu-item" data-action="hard-reload">
                Geforceerd vernieuwen <span class="sol-menu-shortcut">⇧⌘R</span>
            </div>
            <div class="sol-menu-divider"></div>
        `;

        // ── PAGINA ────────────────────────────────────────────────
        menuHtml += `
            <div class="sol-menu-label">Pagina</div>
            <div class="sol-menu-item" data-action="copy-page-url">
                Kopieer pagina-URL
            </div>
            <div class="sol-menu-item" data-action="view-source">
                Bekijk paginabron <span class="sol-menu-shortcut">⌘U</span>
            </div>
            <div class="sol-menu-item" data-action="print">
                Printen <span class="sol-menu-shortcut">⌘P</span>
            </div>
            <div class="sol-menu-item" data-action="save-page">
                Pagina opslaan <span class="sol-menu-shortcut">⌘S</span>
            </div>
            <div class="sol-menu-item" data-action="scroll-top">
                Naar boven scrollen
            </div>
            <div class="sol-menu-divider"></div>
        `;

        // ── ONTWIKKELAAR ──────────────────────────────────────────
        menuHtml += `
            <div class="sol-menu-label">Ontwikkelaar</div>
            <div class="sol-menu-item" data-action="inspect">
                Inspecteer element <span class="sol-menu-shortcut">⌥⌘I</span>
            </div>
            <div class="sol-menu-item" data-action="copy-selector">
                Kopieer CSS-selector
            </div>
            <div class="sol-menu-item" data-action="log-element">
                Log element in console
            </div>
        `;

        menu.innerHTML = menuHtml;

        // ── Positionering & edge detection ────────────────────────
        menu.style.display = 'block'; // Eerst op block zetten om afmetingen te kunnen berekenen

        let posX = e.clientX;
        let posY = e.clientY;

        const menuWidth  = menu.offsetWidth;
        const menuHeight = menu.offsetHeight;
        const windowWidth  = window.innerWidth;
        const windowHeight = window.innerHeight;

        // Spiegelen naar links als hij rechts buiten beeld valt
        if (posX + menuWidth > windowWidth) {
            posX = posX - menuWidth;
        }

        // Spiegelen naar boven als hij onder buiten beeld valt
        if (posY + menuHeight > windowHeight) {
            posY = posY - menuHeight;
        }

        // Extra veiligheid: nooit buiten de linker- of bovenkant vallen (bij heel kleine schermen)
        posX = Math.max(5, posX); 
        posY = Math.max(5, posY);

        menu.style.left = `${posX}px`;
        menu.style.top  = `${posY}px`;
        requestAnimationFrame(() => menu.classList.add('visible'));
    };

    const hideMenu = () => {
        menu.classList.remove('visible');
        setTimeout(() => {
            if (!menu.classList.contains('visible')) menu.style.display = 'none';
        }, 150);
    };

    // ── Hulpfunctie: CSS-selector genereren ───────────────────────
    const getCssSelector = (el) => {
        if (!el) return '';
        const parts = [];
        while (el && el.nodeType === Node.ELEMENT_NODE) {
            let selector = el.nodeName.toLowerCase();
            if (el.id) {
                selector += `#${el.id}`;
                parts.unshift(selector);
                break;
            }
            if (el.className) {
                selector += '.' + [...el.classList].join('.');
            }
            const siblings = el.parentNode ? [...el.parentNode.children].filter(s => s.nodeName === el.nodeName) : [];
            if (siblings.length > 1) {
                selector += `:nth-of-type(${siblings.indexOf(el) + 1})`;
            }
            parts.unshift(selector);
            el = el.parentNode;
        }
        return parts.join(' > ');
    };

    // ── Event listeners ───────────────────────────────────────────
    document.addEventListener('contextmenu', showMenu);
    document.addEventListener('click', hideMenu);
    window.addEventListener('scroll', hideMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') hideMenu();
    });

    // ── Action handler ────────────────────────────────────────────
    menu.addEventListener('click', (e) => {
        const item = e.target.closest('.sol-menu-item');
        if (!item || item.classList.contains('disabled')) return;

        const action   = item.dataset.action;
        const url      = item.dataset.url;
        const text     = item.dataset.text;
        const filename = item.dataset.filename;
        const sel      = window.getSelection().toString().trim();

        switch (action) {
            // Tekst
            case 'copy':
                document.execCommand('copy');
                break;
            case 'cut':
                document.execCommand('cut');
                break;
            case 'paste':
                navigator.clipboard.readText().then(t => document.execCommand('insertText', false, t));
                break;
            case 'select-all':
                document.execCommand('selectAll');
                break;
            case 'clear-field':
                if (contextTarget?.closest('input, textarea')) contextTarget.closest('input, textarea').value = '';
                break;

            // Zoeken & vertalen
            case 'search-google':
                window.open(`https://www.google.com/search?q=${encodeURIComponent(sel)}`, '_blank');
                break;
            case 'search-wiki':
                window.open(`https://nl.wikipedia.org/wiki/Special:Search?search=${encodeURIComponent(sel)}`, '_blank');
                break;
            case 'translate':
                window.open(`https://translate.google.com/?sl=auto&tl=nl&text=${encodeURIComponent(sel)}`, '_blank');
                break;

            // Afbeelding
            case 'open-img':
                window.open(url, '_blank');
                break;
            case 'copy-img-url':
                navigator.clipboard.writeText(url);
                break;
            case 'copy-alt':
                navigator.clipboard.writeText(text);
                break;
            case 'download-img': {
                const a = document.createElement('a');
                a.href = url;
                a.download = filename || 'afbeelding';
                a.click();
                break;
            }

            // Link
            case 'open-tab':
                window.open(url, '_blank');
                break;
            case 'open-window':
                window.open(url, '_blank', 'noopener,noreferrer');
                break;
            case 'copy-link':
                navigator.clipboard.writeText(url);
                break;

            // Navigatie
            case 'go-back':    history.back();    break;
            case 'go-forward': history.forward(); break;
            case 'reload':     location.reload(); break;
            case 'hard-reload':
                location.href = location.href;
                break;

            // Pagina
            case 'copy-page-url':
                navigator.clipboard.writeText(location.href);
                break;
            case 'view-source':
                window.open(`view-source:${location.href}`, '_blank');
                break;
            case 'print':    window.print(); break;
            case 'save-page':
                document.execCommand('SaveAs');
                break;
            case 'scroll-top':
                window.scrollTo({ top: 0, behavior: 'smooth' });
                break;

            // Ontwikkelaar
            case 'inspect':
                console.log('%c[Inspecteer element]', 'color:#6c63ff;font-weight:bold', contextTarget);
                break;
            case 'copy-selector':
                navigator.clipboard.writeText(getCssSelector(contextTarget));
                break;
            case 'log-element':
                console.log('%c[Sol Context Menu] Geselecteerd element:', 'color:#6c63ff', contextTarget);
                console.table({
                    tag:       contextTarget?.tagName,
                    id:        contextTarget?.id,
                    classes:   contextTarget?.className,
                    selector:  getCssSelector(contextTarget),
                    innerText: contextTarget?.innerText?.slice(0, 80),
                });
                break;
        }

        hideMenu();
    });
}