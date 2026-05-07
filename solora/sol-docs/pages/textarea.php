<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="textareas">
    <h2>Textareas</h2>
    <p class="description">
        Veelzijdige tekstvakken voor grotere stukken tekst, met dezelfde designkwaliteit als de reguliere inputs.
    </p>
    <div class="demo-card">
        <div style="display: flex; flex-direction: column; gap: 20px; max-width: 500px;">
            <sol-textarea label="Bericht" placeholder="Typ je bericht hier..."></sol-textarea>
            <sol-textarea label="Notities" rows="5" variant="glass" placeholder="Dit is een glass textarea..."></sol-textarea>
            <sol-textarea label="Alleen-lezen" disabled placeholder="Je kunt hier niet typen."></sol-textarea>
        </div>
    </div>
    
    <sol-code language="html" label="Usage">
&lt;sol-textarea label="Opmerkingen" rows="4" placeholder="Typ iets..."&gt;&lt;/sol-textarea&gt;

&lt;sol-textarea variant="glass" label="Luxe variant"&gt;&lt;/sol-textarea&gt;

&lt;!-- Stel standaardwaarde in tussen de tags --&gt;
&lt;sol-textarea&gt;Dit is een standaardwaarde.&lt;/sol-textarea&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">API Referentie</h3>
    <div class="table-responsive">
        <table class="api-table">
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
                    <td><code>label</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>De tekst die boven het tekstvak wordt getoond.</td>
                </tr>
                <tr>
                    <td><code>placeholder</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>Placeholder tekst voor lege velden.</td>
                </tr>
                <tr>
                    <td><code>value</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>De vooringevulde waarde van het veld. Je kunt ook direct tekst tussen de tags plaatsen (<code>&lt;sol-textarea&gt;Hier&lt;/sol-textarea&gt;</code>).</td>
                </tr>
                <tr>
                    <td><code>rows</code></td>
                    <td>number</td>
                    <td>-</td>
                    <td>Het aantal regels dat initieel wordt getoond.</td>
                </tr>
                <tr>
                    <td><code>cols</code></td>
                    <td>number</td>
                    <td>-</td>
                    <td>De breedte van het tekstvak (vaak beter via CSS geregeld).</td>
                </tr>
                <tr>
                    <td><code>variant</code></td>
                    <td><code>"default" | "glass"</code></td>
                    <td><code>"default"</code></td>
                    <td>Verandert de achtergrondstijl van het tekstvak.</td>
                </tr>
                <tr>
                    <td><code>resize</code></td>
                    <td><code>"none" | "both" | "horizontal" | "vertical"</code></td>
                    <td><code>"vertical"</code></td>
                    <td>Bepaalt of en hoe de gebruiker het tekstvak kan vergroten.</td>
                </tr>
                <tr>
                    <td><code>disabled</code>, <code>required</code>, <code>autofocus</code></td>
                    <td>boolean</td>
                    <td>-</td>
                    <td>Native HTML attributen.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
