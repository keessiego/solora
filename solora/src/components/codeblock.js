import Prism from 'prismjs';
// Optioneel: laad alle talen als je bundler dit toestaat
import 'prismjs/components/index.js'; 

class SolCode extends HTMLElement {
    constructor() {
        super();
        this.initialized = false;
    }

    connectedCallback() {
        if (this.initialized) return;
        this.initialized = true;

        // Haal de code op die de gebruiker in de tag heeft gezet
        // We verwijderen alleen de eerste en laatste lege witregels voor een strak design
        let rawCode = this.textContent.replace(/^\s*\n/, '').replace(/\n\s*$/, '');
        const lang = (this.getAttribute('language') || this.getAttribute('lang') || 'javascript').toLowerCase();

        // Maak het element leeg en bouw de nieuwe UI op
        this.innerHTML = `
            <div class="pre-top">
                <div class="pre-top-btns">
                    <span class="pre-btn-red close-btn" title="Sluiten"></span>
                    <span class="pre-btn-orange minimize-btn" title="Minimaliseren"></span>
                    <span class="pre-btn-green maximize-btn" title="Volledig scherm"></span>
                </div>
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
            this.codeElement.textContent = rawCode; // fallback
        } else {
            this.codeElement.innerHTML = Prism.highlight(rawCode, Prism.languages[lang], lang);
        }

        this.bindEvents(rawCode);
    }

    bindEvents(rawCode) {
        // --- Copy button ---
        this.copyBtn.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(rawCode);
                const oldText = this.copyBtn.innerText;
                this.copyBtn.innerText = 'Gekopieerd!';
                setTimeout(() => this.copyBtn.innerText = oldText, 1200);
            } catch (err) {
                console.error('Copy failed:', err);
            }
        });

        // --- Close button ---
        this.closeBtn.addEventListener('click', () => {
            this.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
            this.style.opacity = '0';
            this.style.transform = 'scale(0.95)';
            setTimeout(() => this.remove(), 300);
        });

        // --- Minimize button ---
        this.minimizeBtn.addEventListener('click', () => {
            this.preContent.classList.toggle('collapsed');
        });

        // --- Maximize / Fullscreen button ---
        this.maximizeBtn.addEventListener('click', (e) => {
            e.stopPropagation();

            const scrollX = window.scrollX || window.pageXOffset;
            const scrollY = window.scrollY || window.pageYOffset;

            // Als we nog niet fullscreen zijn
            if (this.dataset.isFullscreen !== "true") {
                const rect = this.getBoundingClientRect();
                
                // Sla de originele afmetingen op om straks weer terug te kunnen
                this.dataset.origRect = JSON.stringify({
                    top: rect.top + scrollY,
                    left: rect.left + scrollX,
                    width: rect.width,
                    height: rect.height
                });

                Object.assign(this.style, {
                    position: 'fixed',
                    top: `${rect.top + scrollY}px`,
                    left: `${rect.left + scrollX}px`,
                    width: `${rect.width}px`,
                    height: `${rect.height}px`,
                    margin: '0',
                    zIndex: '9999',
                    transition: 'all 0.3s ease'
                });

                void this.offsetWidth; // Forceer een browser reflow voor de animatie

                // Vergroot naar schermgrootte
                Object.assign(this.style, { 
                    top: '0', 
                    left: '0', 
                    width: '100%', 
                    height: '100%', 
                    borderRadius: '0' 
                });
                this.dataset.isFullscreen = "true";

            } else {
                // Herstel naar originele positie
                const origRect = JSON.parse(this.dataset.origRect);
                Object.assign(this.style, {
                    transition: 'all 0.3s ease',
                    top: `${origRect.top}px`,
                    left: `${origRect.left}px`,
                    width: `${origRect.width}px`,
                    height: 'auto',
                    borderRadius: '12px'
                });

                // Na de animatie de CSS opruimen
                this.addEventListener('transitionend', () => {
                    Object.assign(this.style, {
                        transition: '',
                        position: '',
                        top: '',
                        left: '',
                        width: '',
                        height: '',
                        zIndex: ''
                    });
                    this.dataset.isFullscreen = "false";
                }, { once: true });
            }
        });
    }
}

// Export functie voor handmatige initialisatie
export function initCodeblocks() {
    if (!customElements.get('sol-code')) {
        customElements.define('sol-code', SolCode);
    }
}