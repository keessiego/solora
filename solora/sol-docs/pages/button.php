<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="buttons">
    <h2>Buttons</h2>
    <p class="description">
        Interactieve elementen met subtiele haptische feedback-visuele stijlen. 
        Ondersteunt verschillende maten, kleuren en glas-effecten.
    </p>
    <div class="sol-playground" id="button-playground">
        <div class="sol-playground-toolbar">
            <span class="sol-playground-toolbar-label">Configuratie</span>
            
            <sol-dropdown label="Variant" data-prop="variant">
                <div class="dropdown-item" data-value="primary">Primary</div>
                <div class="dropdown-item" data-value="secondary">Secondary</div>
                <div class="dropdown-item" data-value="success">Success</div>
                <div class="dropdown-item" data-value="danger">Danger</div>
                <div class="dropdown-item" data-value="warning">Warning</div>
                <div class="dropdown-item" data-value="glass">Glass</div>
                <div class="dropdown-item" data-value="popover">Popover</div>
            </sol-dropdown>
            
            <sol-dropdown label="Size" data-prop="size">
                <div class="dropdown-item" data-value="sm">Small</div>
                <div class="dropdown-item" data-value="md">Medium</div>
                <div class="dropdown-item" data-value="lg">Large</div>
                <div class="dropdown-item" data-value="xl">Extra Large</div>
            </sol-dropdown>

            <sol-dropdown label="Vorm" data-prop="rounded" id="rounded-control">
                <div class="dropdown-item" data-value="false">Standaard</div>
                <div class="dropdown-item" data-value="true">Cirkel (Icon)</div>
            </sol-dropdown>

            <sol-dropdown label="Status" data-prop="disabled">
                <div class="dropdown-item" data-value="false">Actief</div>
                <div class="dropdown-item" data-value="true">Uitgeschakeld</div>
            </sol-dropdown>

            <div class="sol-playground-toolbar-divider"></div>

            <div id="text-control-wrapper" style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Tekst</span>
                <sol-input id="button-text-input" placeholder="Button tekst..." value="Interactieve Button" style="width: 180px;"></sol-input>
            </div>

            <div id="icon-control-wrapper" style="display: none; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Icoon</span>
                <sol-input id="button-icon-input" placeholder="Icoon naam..." value="zap" style="width: 140px;"></sol-input>
                <sol-button variant="secondary" size="sm" id="open-icon-picker">
                    <sol-icon name="search" size="14"></sol-icon> Zoek...
                </sol-button>
            </div>
        </div>
        <div class="sol-playground-preview checkerboard">
            <sol-button variant="primary" id="playground-button">Interactieve Button</sol-button>
        </div>
    </div>


    <sol-code language="html" label="Usage">
&lt;sol-button variant="primary" size="lg"&gt;Klik op mij&lt;/sol-button&gt;
&lt;sol-button variant="popover"&gt;Dropdown tekst&lt;/sol-button&gt;
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
                    <td><code>string</code></td>
                    <td><code>"primary"</code></td>
                    <td>
                        De visuele stijl. Opties:<br>
                        • <code>"primary"</code>: De standaard Apple blauwe knop.<br>
                        • <code>"secondary"</code>: Neutrale stijl met rand.<br>
                        • <code>"success"</code>: Groen voor bevestiging.<br>
                        • <code>"warning"</code>: Geel voor waarschuwingen.<br>
                        • <code>"danger"</code>: Rood voor destructieve acties.<br>
                        • <code>"glass"</code>: Premium transparant effect met blur.<br>
                        • <code>"popover"</code>: Alleen tekst met een dropdown-pijltje.<br>
                        • <code>"popover-item"</code>: Lijst-stijl voor menu's.
                    </td>
                </tr>
                <tr>
                    <td><code>size</code></td>
                    <td><code>string</code></td>
                    <td><code>"md"</code></td>
                    <td>
                        Grootte van de button. Beïnvloedt padding en font-size.<br>
                        Opties: <code>"sm"</code>, <code>"md"</code>, <code>"lg"</code>, <code>"xl"</code>.
                    </td>
                </tr>
                <tr>
                    <td><code>rounded</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>
                        Maakt de button perfect rond (1:1). <br>
                        <strong>Let op:</strong> Gebruik dit alleen voor iconen. Dwingt een vaste breedte af.
                    </td>
                </tr>
                <tr>
                    <td><code>disabled</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>
                        Schakelt de button uit. De knop wordt grijs en reageert niet meer op clicks of hover.
                    </td>
                </tr>
                <tr>
                    <td><code>type</code></td>
                    <td><code>"button" | "submit" | "reset"</code></td>
                    <td><code>"button"</code></td>
                    <td>
                        Gedraagt zich als het native HTML <code>type</code> attribuut voor formulieren.
                    </td>
                </tr>
                <tr>
                    <td><code>color</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>
                        Legacy attribuut, werkt hetzelfde als <code>variant</code>.
                    </td>
                </tr>
            </tbody>
        </table>
    </sol-table>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Technische Details</h3>
    <div class="demo-card">
        <ul style="padding-left: 20px; line-height: 1.6;">
            <li><strong>Dynamic Content:</strong> De button gebruikt een <code>MutationObserver</code>. Hierdoor kun je via JavaScript de <code>textContent</code> of <code>innerHTML</code> van de <code>&lt;sol-button&gt;</code> wijzigen zonder dat de styling of interne structuur breekt.</li>
            <li><strong>Event Bubbling:</strong> Klik-events op de interne button bubbelen automatisch naar de <code>&lt;sol-button&gt;</code>. Je kunt dus gewoon <code>addEventListener('click')</code> gebruiken op de component zelf.</li>
            <li><strong>Toegankelijkheid:</strong> De component genereert een native <code>&lt;button&gt;</code> element, waardoor screenreaders en toetsenbordnavigatie (Tab, Enter, Spatie) out-of-the-box werken.</li>
            <li><strong>Icon Integratie:</strong> Voor de beste look in <code>rounded</code> varianten, gebruik je een <code>&lt;sol-icon&gt;</code> met een grootte die matcht bij de button size (SM: 16px, MD: 20px, LG: 24px, XL: 28px).</li>
        </ul>
    </div>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Events</h3>
    <sol-table>
        <table>
            <thead>
                <tr>
                    <th>Event</th>
                    <th>Type</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>click</code></td>
                    <td><code>MouseEvent</code></td>
                    <td>Wordt afgevuurd wanneer de gebruiker op de knop klikt of op Enter/Spatie drukt terwijl de focus op de knop ligt.</td>
                </tr>
                <tr>
                    <td><code>focus</code></td>
                    <td><code>FocusEvent</code></td>
                    <td>Wordt afgevuurd wanneer de knop focus krijgt (bijv. via Tab).</td>
                </tr>
                <tr>
                    <td><code>blur</code></td>
                    <td><code>FocusEvent</code></td>
                    <td>Wordt afgevuurd wanneer de knop focus verliest.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Slots</h3>
    <sol-table>
        <table>
            <thead>
                <tr>
                    <th>Slot</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>(default)</code></td>
                    <td>De inhoud van de knop. Dit kan tekst zijn, maar ook iconen (<code>&lt;sol-icon&gt;</code>) of andere HTML elementen. De inhoud wordt automatisch in de interne native button geplaatst.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>


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
                    <td><code>--color-primary</code></td>
                    <td><code>#0071e3</code></td>
                    <td>De hoofdkleur van de button (Light mode).</td>
                </tr>
                <tr>
                    <td><code>--color-primary-dark</code></td>
                    <td><code>#0a84ff</code></td>
                    <td>De hoofdkleur van de button (Dark mode).</td>
                </tr>
                <tr>
                    <td><code>--sol-glass-glass-bg</code></td>
                    <td><code>rgba(255,...)</code></td>
                    <td>Achtergrondkleur voor de <code>glass</code> variant.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
