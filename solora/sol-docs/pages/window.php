<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="window">
    <h2>Window</h2>
    <p class="description">
        Een macOS-stijl venstercontainer, ideaal voor het tonen van code previews, sandboxes of mockups met een authentieke "Title Bar".
    </p>

    <div class="demo-grid" style="grid-template-columns: 1fr;">
        <sol-window title="Mijn Sandbox">
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <h3 style="margin: 0;">Welkom in de Sandbox</h3>
                <p>Dit is een voorbeeld van content binnen een <code>&lt;sol-window&gt;</code>. Je kunt hier alles in plaatsen, van tekst tot complexe HTML/CSS experimenten.</p>
                <div style="display: flex; gap: 10px;">
                    <sol-button variant="primary">Actie</sol-button>
                    <sol-button variant="secondary">Annuleren</sol-button>
                </div>
            </div>
        </sol-window>
    </div>

    <sol-code language="html" label="Gebruik">
&lt;sol-window title="Terminal"&gt;
    &lt;p&gt;Content van het venster komt hier...&lt;/p&gt;
&lt;/sol-window&gt;
    </sol-code>

    <h3 style="margin-top: 60px;">Interactieve Elementen</h3>
    <p>
        Het venster bevat de standaard macOS knoppen (Rood, Oranje, Groen) die functioneel zijn:
    </p>
    <ul>
        <li><strong>Rood (Sluiten):</strong> Verwijdert het element uit de DOM met een vloeiende animatie.</li>
        <li><strong>Oranje (Minimaliseren):</strong> Verbergt de content van het venster (collapse).</li>
        <li><strong>Groen (Maximaliseren):</strong> Schakelt fullscreen modus in/uit voor dit specifieke venster.</li>
    </ul>

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
                    <td><code>title</code></td>
                    <td>string</td>
                    <td><code>""</code></td>
                    <td>De tekst die in het midden van de titelbalk wordt weergegeven.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
