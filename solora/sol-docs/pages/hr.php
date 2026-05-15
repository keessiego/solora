<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="hr">
    <h2>Separator (HR)</h2>
    <p class="description">
        Een horizontale of verticale scheidingslijn in Apple-stijl. 
        Subtiel, aanpasbaar en perfect voor het groeperen van content.
    </p>

    <div class="sol-playground" id="hr-playground">
        <div class="sol-playground-toolbar">
            <span class="sol-playground-toolbar-label">Configuratie</span>
            
            <sol-dropdown label="Oriëntatie" data-prop="vertical">
                <div class="dropdown-item" data-value="false">Horizontaal</div>
                <div class="dropdown-item" data-value="true">Verticaal</div>
            </sol-dropdown>

            <sol-dropdown label="Gewicht" data-prop="weight">
                <div class="dropdown-item" data-value="thin">Thin (0.5px)</div>
                <div class="dropdown-item" data-value="regular">Regular (1px)</div>
                <div class="dropdown-item" data-value="thick">Thick (2px)</div>
            </sol-dropdown>

            <sol-dropdown label="Variant" data-prop="variant">
                <div class="dropdown-item" data-value="none">Standaard</div>
                <div class="dropdown-item" data-value="glass">Glass (Gradient)</div>
            </sol-dropdown>

            <sol-dropdown label="Inset" data-prop="inset">
                <div class="dropdown-item" data-value="false">Geen</div>
                <div class="dropdown-item" data-value="true">Inset (Marge)</div>
            </sol-dropdown>

            <div class="sol-playground-toolbar-divider"></div>

            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Kleur</span>
                <sol-input type="text" data-prop="color" placeholder="bijv. #ff3366" style="width: 140px;"></sol-input>
            </div>
            
            <div style="display: flex; align-items: center; gap: 10px;">
                <span class="sol-playground-toolbar-label">Opacity</span>
                <sol-input type="text" data-prop="opacity" placeholder="0.5" style="width: 80px;"></sol-input>
            </div>
        </div>
        <div class="sol-playground-preview checkerboard" style="height: 200px; display: flex; align-items: center; justify-content: center; flex-direction: column;">
            <div style="width: 100%; text-align: center; padding: 10px;">Bovenkant Content</div>
            <sol-hr id="playground-hr"></sol-hr>
            <div style="width: 100%; text-align: center; padding: 10px;">Onderkant Content</div>
        </div>
    </div>

    <sol-code language="html" label="Usage">
&lt;sol-hr&gt;&lt;/sol-hr&gt;

&lt;!-- Verticaal --&gt;
&lt;div style="height: 50px; display: flex;"&gt;
    &lt;span&gt;Links&lt;/span&gt;
    &lt;sol-hr vertical&gt;&lt;/sol-hr&gt;
    &lt;span&gt;Rechts&lt;/span&gt;
&lt;/div&gt;

&lt;!-- Inset en dikker --&gt;
&lt;sol-hr inset weight="thick"&gt;&lt;/sol-hr&gt;

&lt;!-- Custom kleur en variant --&gt;
&lt;sol-hr color="var(--color-primary)" variant="glass"&gt;&lt;/sol-hr&gt;
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
                    <td><code>vertical</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Wanneer aanwezig, wordt de separator verticaal georiënteerd.</td>
                </tr>
                <tr>
                    <td><code>weight</code></td>
                    <td><code>string</code></td>
                    <td><code>"regular"</code></td>
                    <td>
                        De dikte van de lijn.<br>
                        • <code>"thin"</code>: 0.5px (Retina stijl)<br>
                        • <code>"regular"</code>: 1px<br>
                        • <code>"thick"</code>: 2px
                    </td>
                </tr>
                <tr>
                    <td><code>variant</code></td>
                    <td><code>string</code></td>
                    <td><code>"none"</code></td>
                    <td>
                        Visuele variatie.<br>
                        • <code>"glass"</code>: Een gradient effect dat aan de uiteinden vervaagt.
                    </td>
                </tr>
                <tr>
                    <td><code>inset</code></td>
                    <td><code>boolean</code></td>
                    <td><code>false</code></td>
                    <td>Wanneer aanwezig, krijgt de separator een marge aan de zijkanten (1.5rem).</td>
                </tr>
                <tr>
                    <td><code>color</code></td>
                    <td><code>string</code></td>
                    <td><code>(dynamic)</code></td>
                    <td>Een custom CSS kleur voor de lijn.</td>
                </tr>
                <tr>
                    <td><code>opacity</code></td>
                    <td><code>string</code></td>
                    <td><code>1</code></td>
                    <td>De transparantie van de lijn (0 tot 1).</td>
                </tr>
            </tbody>
        </table>
    </sol-table>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">Theming</h3>
    <p>Je kunt de standaard separator kleur ook globaal aanpassen via CSS variabelen:</p>
    <sol-code language="css">
:root {
    --sol-hr-color: rgba(0, 0, 0, 0.1);
}

:root.dark {
    --sol-hr-color: rgba(255, 255, 255, 0.1);
}
    </sol-code>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
