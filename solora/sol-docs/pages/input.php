<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="inputs">
    <h2>Inputs</h2>
    <p class="description">
        Prachtig vormgegeven tekstvelden met ondersteuning voor iconen, validatie en glasmorfisme.
    </p>
    <div class="sol-playground" id="input-playground">
        <div class="sol-playground-toolbar">
            <span class="sol-playground-toolbar-label">Configuratie</span>
            
            <sol-dropdown label="Variant" data-prop="variant">
                <div class="dropdown-item" data-value="default">Default</div>
                <div class="dropdown-item" data-value="glass">Glass</div>
            </sol-dropdown>

            <sol-dropdown label="Type" data-prop="type" id="input-type-control">
                <div class="dropdown-item" data-value="text">Tekst (text)</div>
                <div class="dropdown-item" data-value="email">E-mail (email)</div>
                <div class="dropdown-item" data-value="password">Wachtwoord (password)</div>
                <div class="dropdown-item" data-value="number">Nummer (number)</div>
                <div class="dropdown-item" data-value="tel">Telefoon (tel)</div>
            </sol-dropdown>

            <sol-dropdown label="Status" data-prop="disabled">
                <div class="dropdown-item" data-value="false">Actief</div>
                <div class="dropdown-item" data-value="true">Uitgeschakeld</div>
            </sol-dropdown>

            <sol-dropdown label="Verplicht" data-prop="required">
                <div class="dropdown-item" data-value="false">Nee</div>
                <div class="dropdown-item" data-value="true">Ja (Required)</div>
            </sol-dropdown>

            <div class="sol-playground-toolbar-divider"></div>

            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Label</span>
                <sol-input data-prop="label" placeholder="Veld naam..." value="Gebruikersnaam" style="width: 140px;"></sol-input>
            </div>

            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Placeholder</span>
                <sol-input data-prop="placeholder" placeholder="Hint tekst..." value="Typ hier..." style="width: 140px;"></sol-input>
            </div>

            <div class="sol-playground-toolbar-divider"></div>

            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Icoon</span>
                <sol-input data-prop="icon" placeholder="Lucide naam..." value="user" style="width: 100px;"></sol-input>
                <sol-button variant="secondary" size="sm" id="open-icon-picker">
                    <sol-icon name="search" size="14"></sol-icon>
                </sol-button>
            </div>

            <sol-dropdown label="Icoon Positie" data-prop="icon-pos">
                <div class="dropdown-item" data-value="start">Binnen Links (Start)</div>
                <div class="dropdown-item" data-value="end">Binnen Rechts (End)</div>
                <div class="dropdown-item" data-value="start-outside">Buiten Links</div>
                <div class="dropdown-item" data-value="end-outside">Buiten Rechts</div>
            </sol-dropdown>

            <sol-dropdown label="Icoon Achtergrond" data-prop="icon-bg">
                <div class="dropdown-item" data-value="none">Geen (Transparant)</div>
                <div class="dropdown-item" data-value="primary">Primary</div>
                <div class="dropdown-item" data-value="glass">Glass</div>
                <div class="dropdown-item" data-value="success">Success</div>
                <div class="dropdown-item" data-value="danger">Danger</div>
            </sol-dropdown>
            
            <div id="password-toggle-wrapper" style="display: none; align-items: center; gap: 10px; margin-left: 10px;">
                 <sol-dropdown label="Oogje" data-prop="toggle-password">
                    <div class="dropdown-item" data-value="false">Verborgen</div>
                    <div class="dropdown-item" data-value="true">Tonen</div>
                </sol-dropdown>
            </div>

        </div>
        <div class="sol-playground-preview checkerboard">
            <div style="width: 100%; max-width: 400px;">
                <sol-input id="playground-input" label="Gebruikersnaam" placeholder="Typ hier..." icon="user"></sol-input>
            </div>
        </div>
    </div>

    <sol-code language="html" label="Gebruik">
&lt;sol-input label="Gebruikersnaam" placeholder="Typ hier..." icon="user"&gt;&lt;/sol-input&gt;
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
                    <td>De visuele achtergrondstijl van het inputveld.</td>
                </tr>
                <tr>
                    <td><code>label</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>De tekst die boven het inputveld wordt getoond als beschrijving.</td>
                </tr>
                <tr>
                    <td><code>type</code></td>
                    <td><code>string</code></td>
                    <td><code>"text"</code></td>
                    <td>Native HTML input type (bijv. <code>text</code>, <code>email</code>, <code>password</code>, <code>number</code>, <code>tel</code>, <code>file</code>).</td>
                </tr>
                <tr>
                    <td><code>toggle-password</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Voegt een interactief oog-icoon toe om het wachtwoord te tonen/verbergen. Werkt alleen als <code>type="password"</code> is ingesteld.</td>
                </tr>
                <tr>
                    <td><code>placeholder</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>Placeholder tekst voor lege velden.</td>
                </tr>
                <tr>
                    <td><code>value</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>De vooringevulde of huidige waarde van het veld. Synchroniseert real-time via Javascript getters/setters.</td>
                </tr>
                <tr>
                    <td><code>icon</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>Naam van het Lucide icoon om in of naast het veld te tonen.</td>
                </tr>
                <tr>
                    <td><code>icon-pos</code></td>
                    <td><code>"start" | "end" | "start-outside" | "end-outside"</code></td>
                    <td><code>"start"</code></td>
                    <td>Positie van het icoon. Binnen het tekstvak (start/end) of zwevend ernaast (outside).</td>
                </tr>
                <tr>
                    <td><code>icon-bg</code></td>
                    <td><code>"primary" | "glass" | "success" | "danger" | "warning"</code></td>
                    <td>-</td>
                    <td>Voegt een gekleurde achtergrond toe specifiek aan het icoon-element voor extra nadruk.</td>
                </tr>
                <tr>
                    <td><code>disabled</code>, <code>required</code>, <code>autofocus</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Standaard HTML-attributen die direct worden doorgegeven aan het native input-element.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Technische Details</h3>
    <div class="demo-card">
        <ul style="padding-left: 20px; line-height: 1.6;">
            <li><strong>Native Integratie:</strong> Hoewel het een Web Component is, bevat de <code>&lt;sol-input&gt;</code> een onzichtbaar gestylde native <code>&lt;input&gt;</code> tag. Hierdoor werken password managers, autofill en standaard form-submits precies zoals verwacht.</li>
            <li><strong>Live Validatie:</strong> Als je native attributen zoals <code>required</code>, <code>min</code>, of <code>type="email"</code> toevoegt, vangt de component automatisch de HTML5 validatie errors op en toont deze prachtig in de Solora stijl via een zwevende error-span.</li>
            <li><strong>Telefoon Formattering:</strong> Als je <code>type="tel"</code> instelt, filtert de component automatisch ongeldige tekens (zoals letters) eruit tijdens het typen, maar behoudt spaties en plusjes.</li>
            <li><strong>Waardes Uitlezen:</strong> Je kunt de waarde opvragen of instellen via JavaScript met de standaard property: <code>document.querySelector('sol-input').value = "Nieuwe tekst"</code>.</li>
        </ul>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
