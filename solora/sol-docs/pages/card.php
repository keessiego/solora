<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="cards">
    <h2>Cards</h2>
    <p class="description">
        Veelzijdige containers met een hoogwaardig Apple-stijl "liquid glass" effect.
    </p>

    <div class="sol-playground" id="card-playground">
        <div class="sol-playground-toolbar">
            <span class="sol-playground-toolbar-label">Configuratie</span>
            
            <sol-dropdown label="Variant" data-prop="variant">
                <div class="dropdown-item" data-value="default">Default</div>
                <div class="dropdown-item" data-value="glass">Glass</div>
            </sol-dropdown>

            <sol-dropdown label="Animated" data-prop="animated">
                <div class="dropdown-item" data-value="false">Uit</div>
                <div class="dropdown-item" data-value="true">Aan (Hover effect)</div>
            </sol-dropdown>

            <div class="sol-playground-toolbar-divider"></div>

            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Achtergrond (bg)</span>
                <sol-input data-prop="bg" placeholder="Bijv. primary/20, white" value="" style="width: 180px;"></sol-input>
            </div>
        </div>
        <div class="sol-playground-preview checkerboard">
            <sol-card id="playground-card" style="width: 350px;">
                <h3 style="margin-top: 0; display: flex; align-items: center; gap: 8px;">
                    <sol-icon name="grid-2x2-check" size="20" color="var(--color-primary)"></sol-icon> Interactieve Card
                </h3>
                <p style="color: var(--text-muted); line-height: 1.5; font-size: 14px;">
                    Dit is een voorbeeld van de Solora Card component. Pas de eigenschappen in de toolbar aan om het effect te zien.
                </p>
                <div style="margin-top: 20px; display: flex; gap: 10px;">
                    <sol-button variant="primary" size="sm">Actie</sol-button>
                    <sol-button variant="secondary" size="sm">Annuleer</sol-button>
                </div>
            </sol-card>
        </div>
    </div>

    <sol-code language="html" label="Gebruik">
&lt;sol-card variant="glass" bg="primary/20" animated&gt;
    &lt;h3&gt;Mijn Card&lt;/h3&gt;
    &lt;p&gt;Inhoud van de card...&lt;/p&gt;
&lt;/sol-card&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">Visibility & Transitions</h3>
    <p>
        Cards kunnen verborgen worden met het <code>hidden</code> attribuut. Gebruik de Javascript <code>show()</code> methode om ze te tonen. 
        Als het <code>transition</code> attribuut aanwezig is, wordt er een animatie afgespeeld bij het tonen.
    </p>

    <div class="demo-card" style="display: flex; flex-direction: column; gap: 20px; align-items: flex-start;">
        <div style="display: flex; gap: 10px;">
            <sol-button onclick="document.getElementById('demo-transition-card').show()" variant="primary">Toon Card</sol-button>
            <sol-button onclick="document.getElementById('demo-transition-card').hide()" variant="secondary">Verberg Card</sol-button>
            
            <sol-dropdown label="Transition" onchange="document.getElementById('demo-transition-card').setAttribute('transition', this.value)">
                <div class="dropdown-item" data-value="fade">Fade (Default)</div>
                <div class="dropdown-item" data-value="up">Slide Up</div>
                <div class="dropdown-item" data-value="down">Slide Down</div>
                <div class="dropdown-item" data-value="left">Slide Left</div>
                <div class="dropdown-item" data-value="right">Slide Right</div>
                <div class="dropdown-item" data-value="zoom">Zoom</div>
            </sol-dropdown>
        </div>

        <sol-card id="demo-transition-card" hidden transition="fade" variant="glass" style="width: 300px;">
            <h4>Geanimeerde Card</h4>
            <p>Deze card kwam tevoorschijn met een animatie!</p>
        </sol-card>
    </div>

    <sol-code language="html" label="Transitie Voorbeeld">
&lt;!-- HTML --&gt;
&lt;sol-card id="my-card" hidden transition="up"&gt;
    Inhoud...
&lt;/sol-card&gt;

&lt;!-- Javascript --&gt;
&lt;script&gt;
    // Toon de card
    document.getElementById('my-card').show();

    // Verberg de card weer
    document.getElementById('my-card').hide();
&lt;/script&gt;
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
                    <td>De visuele stijl van de card. De <code>glass</code> variant heeft minder blur en een hogere transparantie.</td>
                </tr>
                <tr>
                    <td><code>bg</code></td>
                    <td><code>string</code></td>
                    <td>-</td>
                    <td>Bepaalt de achtergrondkleur. Ondersteunt CSS kleurnamen, hex-codes of de <code>kleur/opacity</code> syntax (bijv. <code>white/30</code> of <code>primary/20</code>). Behoudt altijd de glazen blur-effecten op de achtergrond.</td>
                </tr>
                <tr>
                    <td><code>animated</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Activeert een subtiel hover-effect (de card komt omhoog en wordt licht vergroot) en simuleert een vloeibaar glas-effect als je met de muis beweegt.</td>
                </tr>
                <tr>
                    <td><code>hidden</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Verbergt de card initieel (CSS <code>display: none</code>).</td>
                </tr>
                <tr>
                    <td><code>transition</code></td>
                    <td><code>string</code></td>
                    <td><code>"fade"</code></td>
                    <td>Bepaalt de animatie wanneer <code>show()</code> of <code>hide()</code> wordt aangeroepen. Opties: <code>fade</code>, <code>up</code>, <code>down</code>, <code>left</code>, <code>right</code>, <code>zoom</code>.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

    <h4 style="margin-top: 30px;">Methoden</h4>
    <sol-table>
        <table>
            <thead>
                <tr>
                    <th>Methode</th>
                    <th>Parameters</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>show()</code></td>
                    <td>-</td>
                    <td>Toont de card en triggert de geconfigureerde transitie.</td>
                </tr>
                <tr>
                    <td><code>hide()</code></td>
                    <td>-</td>
                    <td>Verbergt de card en triggert de geconfigureerde transitie in omgekeerde volgorde.</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

    <h3 style="margin-top: 40px; margin-bottom: 20px;">Technische Details</h3>
    <div class="demo-card">
        <ul style="padding-left: 20px; line-height: 1.6;">
            <li><strong>Liquid Glass:</strong> Bij het gebruik van <code>animated</code> wordt een pseudo-element gecreëerd dat een glimmend effect simuleert. Dit effect beweegt mee met de grootte van de card.</li>
            <li><strong>Slot Systeem:</strong> Plaats simpelweg HTML-content (headings, teksten, knoppen) binnen de <code>&lt;sol-card&gt;</code> tags. De content wordt automatisch gestyled en voorzien van de juiste padding.</li>
            <li><strong>Achtergrond Parsing:</strong> Het <code>bg</code> attribuut wordt via Javascript geparseerd. Als je <code>/</code> gebruikt (bijv. <code>white/50</code>), rekent Solora dit automatisch om naar de juiste CSS kleursamenstelling voor het glazen oppervlak, zonder dat je complexe rgba() functies hoeft te schrijven.</li>
        </ul>
    </div>

</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
