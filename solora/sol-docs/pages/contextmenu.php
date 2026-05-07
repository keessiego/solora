<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="contextmenu">
    <h2>Context Menu</h2>
    <p class="description">
        Rechtsklik ergens op deze pagina om het aangepaste contextmenu te zien. 
        Je kunt ook specifieke opties toevoegen aan elementen op de pagina.
    </p>
    <div class="demo-card">
        <div id="custom-context-target" style="padding: 40px; border: 2px dashed var(--border); border-radius: 12px; text-align: center;">
            Rechtsklik hier in dit vak voor specifieke opties
            <sol-context-options label="Element Opties" variant="glass">
                <sol-item label="Bewerken" action="js(alert('Bewerken!'))"></sol-item>
                <sol-item label="Opslaan" disabled></sol-item>
                <sol-divider></sol-divider>
                <sol-item label="Verwijderen" type="danger" onclick="solora.confirm('Weet je het zeker?', 'Wil je dit item verwijderen?', 'glass').then(confirmed => {if(confirmed) solora.notify({title: 'Succes', message: 'Item is verwijderd', type: 'success'});})"></sol-item>
            </sol-context-options>
        </div>
    </div>
    <sol-code language="html" label="Usage">
&lt;!-- Vereist 1x per pagina om de basis functionaliteit in te schakelen --&gt;
&lt;sol-contextmenu variant="default"&gt;&lt;/sol-contextmenu&gt;

&lt;!-- Om specifieke acties toe te voegen aan een gebied --&gt;
&lt;div&gt;
    Rechtsklik op mij
    &lt;!-- Optioneel: override de globale variant lokaal --&gt;
    &lt;sol-context-options label="Mijn Menu" variant="glass"&gt;
        &lt;sol-item label="Bekijk Profiel" href="/profile"&gt;&lt;/sol-item&gt;
        &lt;sol-item label="Help Center" href="https://help.example.com" target="_blank"&gt;&lt;/sol-item&gt;
        &lt;sol-divider&gt;&lt;/sol-divider&gt;
        &lt;sol-item label="Verwijderen" type="danger" onclick="alert('Verwijderd!')"&gt;&lt;/sol-item&gt;
    &lt;/sol-context-options&gt;
&lt;/div&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">API Referentie</h3>
    <div class="table-responsive">
        <table class="api-table">
            <thead>
                <tr>
                    <th>Element / Attribuut</th>
                    <th>Beschrijving</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td><code>&lt;sol-contextmenu&gt;</code></td>
                    <td>Plaats deze tag 1x in je document (bijv. vlak voor <code>&lt;/body&gt;</code>) om het Solora contextmenu globaal te activeren (tekst kopiëren, links openen, etc). Ondersteunt <code>variant="glass"</code> of <code>variant="default"</code>.</td>
                </tr>
                <tr>
                    <td><code>&lt;sol-context-options&gt;</code></td>
                    <td>Plaats deze <em>binnenin</em> een element om eigen items toe te voegen wanneer men specifiek in dat element rechtsklikt. Met attribuut <code>label="..."</code> geef je de groep een naam. Optioneel kun je lokaal het thema overschrijven met <code>variant="..."</code>.</td>
                </tr>
                <tr>
                    <td><code>&lt;sol-item&gt;</code></td>
                    <td>Een actie-knop in je menu. Attributen: <code>label="..."</code> (tekst) en <code>action="..."</code>, <code>onclick="..."</code> of <code>href="..."</code> (wat er moet gebeuren). Optioneel: <code>disabled</code>, <code>readonly</code>, <code>type="danger"</code> of <code>target="_blank"</code> (voor links).</td>
                </tr>
                <tr>
                    <td><code>action="js(...)"</code></td>
                    <td>Voert pure JavaScript uit op de huidige pagina.</td>
                </tr>
                <tr>
                    <td><code>action="php(...)"</code></td>
                    <td>Voert een netwerkverzoek (POST) uit om een PHP hook aan te spreken (gebruikt X-Solora-PHP-Action header).</td>
                </tr>
                <tr>
                    <td><code>&lt;sol-divider&gt;</code></td>
                    <td>Voegt een horizontale lijn toe.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
