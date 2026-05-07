<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="navbar">
    <h2>Navbar</h2>
    <p class="description">
        Een elegante, transparante navigatiebalk met blur-effect in Apple-stijl. 
        Volledig responsive met een geïntegreerd mobiel menu.
    </p>
    
    <div class="sol-playground" id="navbar-playground">
        <div class="sol-playground-toolbar">
            <span class="sol-playground-toolbar-label">Configuratie</span>
            
            <sol-dropdown label="Positie" data-prop="sticky" id="navbar-sticky-control">
                <div class="dropdown-item" data-value="false">Statisch</div>
                <div class="dropdown-item" data-value="true">Sticky (Vast)</div>
            </sol-dropdown>

            <div class="sol-playground-toolbar-divider"></div>

            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Merknaam</span>
                <sol-input id="navbar-brand-input" placeholder="Merknaam..." value="Solora" style="width: 150px;"></sol-input>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Logo URL</span>
                <sol-input id="navbar-logo-input" placeholder="URL naar logo..." value="" style="width: 180px;"></sol-input>
            </div>
        </div>
        <div class="sol-playground-preview checkerboard" style="display: block; padding: 0; height: 350px;">
            <div style="height: 100%; overflow-y: auto; position: relative;">
                <sol-navbar brand="Solora" brand-href="#" id="playground-navbar">
                    <a href="#home">Home</a>
                    <a href="#features">Features</a>
                    <a href="#docs">Docs</a>
                    <a href="#support">Support</a>
                </sol-navbar>
                <div style="padding: 60px 40px; text-align: center;">
                    <h3 style="margin-top: 0;">Preview Omgeving</h3>
                    <p style="color: var(--text-muted);">Scroll hierboven om het translucency effect (blur) te testen als de navbar op 'Sticky' staat.</p>
                    <div style="height: 600px; background: linear-gradient(180deg, transparent, rgba(0,113,227,0.05)); margin-top: 40px; border-radius: 20px; border: 2px dashed rgba(0,0,0,0.05);"></div>
                </div>
            </div>
        </div>
    </div>

    <sol-code language="html" label="Gebruik">
&lt;sol-navbar brand="Solora" brand-href="/" sticky&gt;
    &lt;a href="/"&gt;Home&lt;/a&gt;
    &lt;a href="/docs"&gt;Docs&lt;/a&gt;
&lt;/sol-navbar&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">API Referentie</h3>
    
    <sol-table>
        <table>
            <thead>
                <tr>
                    <th>Attribuut</th>
                    <th>Type</th>
                    <th>Default</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>brand</code></td>
                    <td><code>string</code></td>
                    <td><code>"Solora"</code></td>
                    <td>De tekst die in de linkerbovenhoek wordt getoond als merknaam.</td>
                </tr>
                <tr>
                    <td><code>brand-href</code></td>
                    <td><code>string</code></td>
                    <td><code>"#"</code></td>
                    <td>De URL waar de merknaam naar verwijst.</td>
                </tr>
                <tr>
                    <td><code>logo</code></td>
                    <td><code>string (URL)</code></td>
                    <td>-</td>
                    <td>Optioneel. URL naar een logo afbeelding. Indien opgegeven, wordt deze naast of in plaats van de merknaam getoond.</td>
                </tr>
                <tr>
                    <td><code>sticky</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Zorgt ervoor dat de navbar aan de bovenkant van het scherm (of parent container) blijft plakken.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Technische Details</h3>
    <div class="demo-card">
        <ul style="padding-left: 20px; line-height: 1.6;">
            <li><strong>Auto-Rendering:</strong> De navbar gebruikt een <code>MutationObserver</code> om wijzigingen in zijn kinderen (links) op te vangen en zichzelf automatisch opnieuw op te bouwen.</li>
            <li><strong>Responsiviteit:</strong> Onder de 768px wordt automatisch een hamburger-menu getoond. Het menu schuift van bovenaf in met een Apple-stijl animatie.</li>
            <li><strong>Translucency:</strong> De navbar maakt gebruik van <code>backdrop-filter</code> voor het karakteristieke blur-effect. Dit werkt het beste op een achtergrond met veel contrast of kleur.</li>
            <li><strong>Slot Systeem:</strong> Alle elementen die je direct binnen <code>&lt;sol-navbar&gt;</code> plaatst, worden automatisch als navigatie-items in het menu opgenomen.</li>
        </ul>
    </div>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Theming (CSS Variabelen)</h3>
    <sol-table>
        <table>
            <thead>
                <tr>
                    <th>Variabele</th>
                    <th>Standaard</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>--sol-navbar-height</code></td>
                    <td><code>44px</code></td>
                    <td>De hoogte van de navigatiebalk.</td>
                </tr>
                <tr>
                    <td><code>--navbar-bg</code></td>
                    <td><code>rgba(255, 255, 255, 0.72)</code></td>
                    <td>De achtergrondkleur (met transparantie).</td>
                </tr>
                <tr>
                    <td><code>--navbar-blur</code></td>
                    <td><code>20px</code></td>
                    <td>De sterkte van het blur-effect.</td>
                </tr>
                <tr>
                    <td><code>--navbar-border</code></td>
                    <td><code>rgba(0, 0, 0, 0.1)</code></td>
                    <td>De kleur van de onderste rand.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
