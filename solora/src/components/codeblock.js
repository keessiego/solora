import Prism from 'prismjs';
import 'prismjs/components/index.js'; 

class SolCodeblock extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        // Haal de code op. We gebruiken innerHTML om de witruimte en tags te behouden.
        // Vervolgens decoden we HTML entities zodat Prism ze correct kan highlighten.
        let rawCode = this.innerHTML
            .replace(/^\s*\n/, '')
            .replace(/\n\s*$/, '')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&amp;/g, '&');

        const lang = (this.getAttribute('language') || this.getAttribute('lang') || 'javascript').toLowerCase();
        const label = this.getAttribute('label') || '';

        // Maak het element leeg en bouw de nieuwe UI op
        this.innerHTML = `
            <div class="pre-top">
                <div class="pre-top-btns">
                    <span class="pre-btn-red close-btn" title="Sluiten"></span>
                    <span class="pre-btn-orange minimize-btn" title="Minimaliseren"></span>
                    <span class="pre-btn-green maximize-btn" title="Volledig scherm"></span>
                </div>
                ${label ? `<div class="pre-label">${label}</div>` : ''}
            </div>
            <div class="pre-content">
                <button class="pre-copy-btn btn-in-pre" title="Kopiëren">Kopieer</button>
                <pre><code class="language-${lang}"></code></pre>
            </div>
        `;

        this.preContent = this.querySelector('.pre-content');
        this.codeElement = this.querySelector('code');
        this.copyBtn = this.querySelector('.pre-copy-btn');
        this.closeBtn = this.querySelector('.close-btn');
        this.minimizeBtn = this.querySelector('.minimize-btn');
        this.maximizeBtn = this.querySelector('.maximize-btn');

        // Prism syntax highlighting toepassen
        if (!Prism.languages[lang]) {
            console.warn(`Language '${lang}' not loaded in Prism, using plaintext fallback.`);
            this.codeElement.textContent = rawCode;
        } else {
            this.codeElement.innerHTML = Prism.highlight(rawCode, Prism.languages[lang], lang);
        }

        this.bindEvents(rawCode);
    }

    bindEvents(rawCode) {
        this.copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(rawCode);
                const oldText = this.copyBtn.innerText;
                this.copyBtn.innerText = 'Gekopieerd!';
                setTimeout(() => this.copyBtn.innerText = oldText, 1200);
            } catch (err) { console.error('Copy failed:', err); }
        });

        this.closeBtn.addEventListener('click', () => {
            this.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.style.opacity = '0';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.remove(), 300);
        });

        this.minimizeBtn.addEventListener('click', () => {
            this.preContent.classList.toggle('collapsed');
        });

        this.maximizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            if (this.dataset.isFullscreen !== "true") {
                const rect = this.getBoundingClientRect();
                this.dataset.origRect = JSON.stringify({
                    top: rect.top + window.scrollY,
                    left: rect.left + window.scrollX,
                    width: rect.width,
                    height: rect.height
                });
                Object.assign(this.style, {
                    position: 'fixed',
                    top: `${rect.top}px`,
                    left: `${rect.left}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    margin: '0',
                    zIndex: '9999',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                });
                void this.offsetWidth;
                Object.assign(this.style, { top: '0', left: '0', width: '100vw', height: '100vh', borderRadius: '0' });
                this.dataset.isFullscreen = "true";
            } else {
                const origRect = JSON.parse(this.dataset.origRect);
                Object.assign(this.style, {
                    top: `${origRect.top - window.scrollY}px`,
                    left: `${origRect.left - window.scrollX}px`,
                    width: `${origRect.width}px`,
                    height: `${origRect.height}px`,
                    borderRadius: '12px'
                });
                this.addEventListener('transitionend', () => {
                    Object.assign(this.style, { position: '', top: '', left: '', width: '', height: '', zIndex: '', transition: '', margin: '', borderRadius: '' });
                    this.dataset.isFullscreen = "false";
                }, { once: true });
            }
        });
    }
}

export function initCodeblocks() {
    if (!customElements.get('sol-codeblock')) {
        customElements.define('sol-codeblock', SolCodeblock);
    }
    // Alias support
    if (!customElements.get('sol-code')) {
        customElements.define('sol-code', class extends SolCodeblock {});
    }
}
