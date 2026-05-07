<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="sidebar">
    <h2>Sidebar</h2>
    <p class="description">
        Een krachtig zijmenu voor navigatie op applicatie-niveau. Ondersteunt titels, 
        groepen, iconen en automatische 'active' status op basis van de URL. 
        Standaard beweegt de sidebar mee met de content, maar kan met het <code>fixed</code> of <code>sticky</code> attribuut worden vastgezet.
    </p>

    <h3>Layout Structuur</h3>
    <p>Voor de beste ervaring gebruik je de sidebar binnen een <code>&lt;sol-page&gt;</code> wrapper samen met <code>&lt;sol-main&gt;</code>.</p>
    <sol-code language="html" label="Layout">
&lt;sol-page&gt;
    &lt;sol-sidebar sticky&gt;
        &lt;!-- Sidebar content --&gt;
    &lt;/sol-sidebar&gt;
    
    &lt;sol-main&gt;
        &lt;!-- Main content --&gt;
    &lt;/sol-main&gt;
&lt;/sol-page&gt;
    </sol-code>

    <p>Als je een sticky <code>&lt;sol-navbar&gt;</code> of een andere header gebruikt, past de sidebar zijn positie en hoogte automatisch aan via de CSS variabele <code>--sol-sidebar-top</code>.</p>

    <style>
        /* Demo overrides voor de playground container */
        #playground-sidebar {
            height: 100% !important;
        }
        #playground-sidebar[fixed] {
            position: absolute !important;
            z-index: 100 !important;
            left: 0;
            top: 0;
        }
    </style>
    <div class="sol-playground" id="sidebar-playground">
        <div class="sol-playground-toolbar">
            <span class="sol-playground-toolbar-label">Configuratie</span>
            
            <sol-dropdown label="Variant" data-prop="variant">
                <div class="dropdown-item" data-value="default">Default</div>
                <div class="dropdown-item" data-value="glass">Glass</div>
            </sol-dropdown>

            <sol-dropdown label="Grootte" data-prop="compact">
                <div class="dropdown-item" data-value="false">Standaard</div>
                <div class="dropdown-item" data-value="true">Compact</div>
            </sol-dropdown>

            <sol-dropdown label="Effect" data-prop="floating">
                <div class="dropdown-item" data-value="false">Ingebouwd</div>
                <div class="dropdown-item" data-value="true">Zwevend (Floating)</div>
            </sol-dropdown>

            <sol-dropdown label="Gedrag" data-prop="sticky">
                <div class="dropdown-item" data-value="false">Statisch</div>
                <div class="dropdown-item" data-value="true">Sticky (Plakken)</div>
            </sol-dropdown>
        </div>
        <div class="sol-playground-preview checkerboard" style="display: block; padding: 0; height: 450px;">
            <div style="height: 100%; overflow-y: auto; position: relative; display: flex;">
                <sol-sidebar id="playground-sidebar" sticky>
                    <div class="sol-sidebar-header">
                        <h3 style="margin: 0; font-size: 18px; display: flex; align-items: center; gap: 8px;">
                            <sol-icon name="command" size="20"></sol-icon> My App
                        </h3>
                    </div>
                    <div class="sol-sidebar-content">
                        <div class="sol-sidebar-label">Dashboard</div>
                        <nav class="sol-sidebar-nav">
                            <a class="sol-sidebar-item active">
                                <sol-icon name="layout" size="16"></sol-icon> Overzicht
                            </a>
                            <a class="sol-sidebar-item">
                                <sol-icon name="bar-chart-2" size="16"></sol-icon> Statistieken
                            </a>
                        </nav>
                        
                        <div class="sol-sidebar-label">Beheer</div>
                        <nav class="sol-sidebar-nav">
                            <a class="sol-sidebar-item">
                                <sol-icon name="users" size="16"></sol-icon> Gebruikers
                            </a>
                            <a class="sol-sidebar-item">
                                <sol-icon name="settings" size="16"></sol-icon> Instellingen
                            </a>
                        </nav>
                    </div>
                    <div class="sol-sidebar-footer">
                        <div class="sol-sidebar-item">
                            <sol-icon name="log-out" size="16"></sol-icon> Log uit
                        </div>
                    </div>
                </sol-sidebar>
                <div style="flex: 1; padding: 40px; text-align: center;">
                    <h3 style="margin-top: 0;">Main Content Preview</h3>
                    <p style="color: var(--text-muted); font-size: 14px;">Scroll hier om te zien hoe de sidebar reageert.</p>
                    <div style="height: 800px; background: linear-gradient(180deg, transparent, rgba(0,113,227,0.05)); margin-top: 40px; border-radius: 20px; border: 2px dashed rgba(0,0,0,0.05); display: flex; align-items: center; justify-content: center;">
                        <span style="opacity: 0.3;">Scrollbare Content Area</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

    <sol-code language="html" label="Gebruik binnen sol-page">
&lt;sol-page&gt;
    &lt;sol-sidebar sticky floating variant="glass"&gt;
        &lt;!-- Sidebar Content --&gt;
    &lt;/sol-sidebar&gt;
    
    &lt;sol-main&gt;
        &lt;h1&gt;Mijn Dashboard&lt;/h1&gt;
    &lt;/sol-main&gt;
&lt;/sol-page&gt;
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
                    <td><code>variant</code></td>
                    <td><code>"default" | "glass"</code></td>
                    <td><code>"default"</code></td>
                    <td>Bepaalt de visuele stijl. De <code>glass</code> variant heeft minder blur en een hogere transparantie.</td>
                </tr>
                <tr>
                    <td><code>sticky</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Zorgt dat de sidebar blijft staan tijdens het scrollen binnen zijn parent container.</td>
                </tr>
                <tr>
                    <td><code>fixed</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Zet de sidebar vast aan de linkerkant van het volledige scherm (viewport).</td>
                </tr>
                <tr>
                    <td><code>floating</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Geeft de sidebar ronde hoeken en een marge, waardoor hij "zweeft" boven de achtergrond.</td>
                </tr>
                <tr>
                    <td><code>compact</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Maakt de sidebar smaller en verkleint de padding van de items voor een strakkere look.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Technische Details</h3>
    <div class="demo-card">
        <ul style="padding-left: 20px; line-height: 1.6;">
            <li><strong>Slimme Hoogte:</strong> De sidebar heeft een ingebouwde <code>ResizeObserver</code> die luistert naar de `sol-navbar`. Als de navbar sticky is of verborgen wordt, past de sidebar automatisch zijn `top` positie en `height` aan om perfect aan te sluiten.</li>
            <li><strong>Auto-Active:</strong> Items met een `href` attribuut krijgen automatisch de class <code>active</code> als de huidige URL matcht met de link.</li>
            <li><strong>Layout Sync:</strong> Bij gebruik van de <code>floating</code> variant past de <code>&lt;sol-page&gt;</code> container automatisch zijn padding aan om de sidebar de juiste ruimte te geven.</li>
            <li><strong>Mobile:</strong> Op schermen kleiner dan 768px wordt de sidebar automatisch omgezet naar een horizontaal vullende container boven de content.</li>
        </ul>
    </div>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">CSS Variabelen</h3>
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
                    <td><code>--sol-sidebar-top</code></td>
                    <td><code>0px</code></td>
                    <td>De afstand vanaf de bovenkant. Wordt automatisch beheerd door de JS bij gebruik van een navbar.</td>
                </tr>
                <tr>
                    <td><code>--sol-glass-default-bg</code></td>
                    <td><code>rgba(255,...)</code></td>
                    <td>Achtergrondkleur van de standaard variant.</td>
                </tr>
                <tr>
                    <td><code>--sol-glass-glass-bg</code></td>
                    <td><code>rgba(255,...)</code></td>
                    <td>Achtergrondkleur van de glass variant.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
