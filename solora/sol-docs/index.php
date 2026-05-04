<?php include __DIR__ . '/includes/header.php'; ?>

<section id="get-started">
    <span class="badge">v3.2.3</span>
    <h2>Ervaar de puurheid van design.</h2>
    <p class="description">
        Solora is een hoogwaardige UI kit gebouwd op moderne Web Components. 
        Snel, aanpasbaar en met een onmiskenbare Apple-vibe. Gebruik het overal, 
        zonder frameworks of hoofdpijn.
    </p>

    <h3>1. Installatie</h3>
    <div class="demo-card">
        <p>Voeg Solora toe aan je project via NPM of download de <code>dist</code> bestanden rechtstreeks.</p>
        <sol-code language="bash" label="Terminal">npm install kerkhoff-ict-solora</sol-code>
    </div>

    <h3>2. Integratie in HTML</h3>
    <div class="demo-card">
        <p>Je hebt enkel de CSS en JS bestanden nodig. Laad de CSS in je <code>&lt;head&gt;</code> en de JS (als module) aan het einde van je <code>&lt;body&gt;</code>.</p>
        <sol-code language="html" label="index.html">
&lt;!DOCTYPE html&gt;
&lt;html lang="nl"&gt;
&lt;head&gt;
    &lt;meta charset="UTF-8"&gt;
    &lt;title&gt;Mijn App met Solora&lt;/title&gt;
    &lt;!-- Laad de Solora CSS in --&gt;
    &lt;link rel="stylesheet" href="node_modules/kerkhoff-ict-solora/dist/index.css"&gt;
&lt;/head&gt;
&lt;body&gt;

    &lt;!-- Gebruik de componenten direct --&gt;
    &lt;sol-button color="primary"&gt;Hallo Wereld!&lt;/sol-button&gt;

    &lt;!-- Laad en initialiseer de JS --&gt;
    &lt;script type="module"&gt;
        import { initAll } from './node_modules/kerkhoff-ict-solora/dist/index.js';
        initAll();
    &lt;/script&gt;
&lt;/body&gt;
&lt;/html&gt;
        </sol-code>
    </div>

    <h3>3. CSS Variabelen Aanpassen (Theming)</h3>
    <div class="demo-card">
        <p>Solora is gebouwd met CSS variabelen, waardoor het extreem makkelijk aan te passen is aan jouw merk. Overschrijf de variabelen in je eigen CSS bestand:</p>
        <sol-code language="css" label="style.css">
/* Jouw eigen kleuren overschrijven de standaard Solora Apple-kleuren */
:root {
    --color-primary: #ff3366; /* Jouw brand color */
    --color-secondary: #f0f0f5;
    --color-success: #34c759;
    --color-danger: #ff3b30;
    --color-warning: #ffcc00;
    
    /* Optionele states */
    --color-bg: #ffffff;
    --color-bg-hover: #f9f9f9;
    --color-text-dark: #111111;
    --color-text-light: #ffffff;
}

/* Voor Dark Mode aanpassingen */
:root.dark {
    --color-primary-dark: #ff6688;
    --color-bg: #1c1c1e;
    --color-bg-hover: #2c2c2e;
    --color-text-dark: #eeeeee;
}
        </sol-code>
        <p style="margin-top: 20px; font-size: 0.95rem; opacity: 0.8;">Gebruik de ingebouwde <code>&lt;button class="sol-theme-toggle"&gt;&lt;/button&gt;</code> om automatisch te wisselen tussen licht en donker (als je <code>initThemeToggle()</code> hebt aangeroepen).</p>
    </div>
    <h3>4. Speciale Utility Classes</h3>
    <div class="demo-card">
        <p>Solora biedt ook een aantal utility classes aan voor standaard HTML elementen, zoals links.</p>
        <div style="margin: 20px 0; display: flex; gap: 20px;">
            <a href="#" class="sol">Standaard Apple Link</a>
            <a href="#" class="sol" data-arrow="true">Lees meer</a>
        </div>
        <sol-code language="html" label="HTML">
&lt;!-- Een normale link in Apple stijl --&gt;
&lt;a href="#" class="sol"&gt;Bekijk de details&lt;/a&gt;

&lt;!-- Met een interactief pijltje --&gt;
&lt;a href="#" class="sol" data-arrow="true"&gt;Lees meer&lt;/a&gt;
        </sol-code>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
