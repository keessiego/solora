<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="notifications">
    <h2>Notifications (Toasts)</h2>
    <p class="description">
        Subtiele, tijdelijke push-meldingen (toasts) in de hoek van het scherm. 
        Ondersteunt verschillende types, glas-effecten en automatische sluiting.
    </p>

    <div class="demo-card">
        <div class="demo-grid" style="gap: 20px;">
            <sol-button color="primary" onclick="solora.notify({ title: 'Melding', message: 'Dit is een standaard notificatie.' })">Standaard Notificatie</sol-button>
            <sol-button color="secondary" onclick="solora.notify({ title: 'Succes', message: 'Uw gegevens zijn opgeslagen.', type: 'success' })">Succes Melding</sol-button>
        </div>
    </div>

    <h3>Programmatisch (JavaScript API)</h3>
    <p>Je kunt notificaties overal in je applicatie aanroepen via het globale <code>solora.notify()</code> object.</p>

    <sol-code language="javascript" label="JavaScript">
// Standaard melding
solora.notify({
    title: "Update beschikbaar",
    message: "Klik hier om te vernieuwen.",
    duration: 5000 // Sluit na 5 seconden (default)
});

// Specifiek type
solora.notify({
    title: "Succes",
    message: "Profiel bijgewerkt",
    type: "success"
});
    </sol-code>

    <h3 style="margin-top: 40px;">Via Web Component</h3>
    <p>Je kunt notificaties ook direct in HTML declareren en ze later tonen, of direct tonen via het <code>show</code> attribuut.</p>
    
    <div class="demo-card">
        <sol-notification id="mijn-notificatie" title="HTML Notificatie" message="Aangeroepen vanuit een web component" type="info"></sol-notification>
        <sol-button variant="glass" onclick="document.getElementById('mijn-notificatie').show()">Toon HTML Notificatie</sol-button>
    </div>

    <sol-code language="html" label="HTML">
&lt;!-- Declareren in HTML --&gt;
&lt;sol-notification 
    id="mijn-notificatie" 
    title="Systeem" 
    message="Dit is een component" 
    type="info"&gt;
&lt;/sol-notification&gt;

&lt;!-- Aanroepen via JS --&gt;
&lt;sol-button onclick="document.getElementById('mijn-notificatie').show()"&gt;
    Toon
&lt;/sol-button&gt;

&lt;!-- Of direct tonen bij laden (voeg attribuut 'show' toe) --&gt;
&lt;sol-notification show title="Welkom" message="Welkom op de site"&gt;&lt;/sol-notification&gt;
    </sol-code>

    <h3 style="margin-top: 40px;">Types & Varianten</h3>
    <p>Kies uit verschillende kleuren die de semantiek van je melding versterken, of voeg een dieper glass-effect toe.</p>
    
    <div class="demo-card">
        <div class="demo-grid" style="gap: 15px;">
            <sol-button variant="primary" onclick="solora.notify({ title: 'Info', message: 'Informatieve melding.', type: 'info' })">Info</sol-button>
            <sol-button variant="success" onclick="solora.notify({ title: 'Success', message: 'Alles is gelukt!', type: 'success' })">Success</sol-button>
            <sol-button variant="warning" onclick="solora.notify({ title: 'Warning', message: 'Let op, dit kan fout gaan.', type: 'warning' })">Warning</sol-button>
            <sol-button variant="danger" onclick="solora.notify({ title: 'Error', message: 'Er is iets misgegaan.', type: 'error' })">Error</sol-button>
            <sol-button variant="glass" onclick="solora.notify({ title: 'Glass', message: 'Met extra transparantie.', variant: 'glass' })">Glass Variant</sol-button>
        </div>
    </div>

    <h3 style="margin-top: 40px;">Laravel Integratie</h3>
    <p>Voor Laravel projecten is er een speciale component die direct Flash Messages (Session data) kan omzetten naar popups.</p>
    
    <sol-code language="html" label="Laravel Blade">
&lt;!-- Zet dit ergens in je master layout (app.blade.php) --&gt;
&lt;sol-laravel-notification 
    success="{{ session('success') }}" 
    error="{{ session('error') }}"
    info="{{ session('info') }}"
    warning="{{ session('warning') }}"
    variant="glass"&gt;
&lt;/sol-laravel-notification&gt;
    </sol-code>

    <h3 style="margin-top: 60px; margin-bottom: 20px;">API Referentie</h3>
    <div class="table-responsive">
        <table class="api-table">
            <thead>
                <tr>
                    <th>Attribuut / Optie</th>
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
                    <td>De dikgedrukte titel van de notificatie.</td>
                </tr>
                <tr>
                    <td><code>message</code></td>
                    <td>string</td>
                    <td><code>""</code></td>
                    <td>De tekst of inhoud van de melding. (Kan ook als innerHTML gebruikt worden in de Web Component).</td>
                </tr>
                <tr>
                    <td><code>type</code></td>
                    <td><code>"success" | "error" | "warning" | "info"</code></td>
                    <td>-</td>
                    <td>Bepaalt de tekstkleur van de titel op basis van het type melding.</td>
                </tr>
                <tr>
                    <td><code>variant</code></td>
                    <td><code>"glass"</code></td>
                    <td>-</td>
                    <td>Voegt een alternatieve, meer transparante achtergrondstijl toe (Glassmorphism).</td>
                </tr>
                <tr>
                    <td><code>duration</code></td>
                    <td>number</td>
                    <td><code>5000</code></td>
                    <td>Tijd in milliseconden voordat de melding automatisch verdwijnt. Zet op <code>0</code> om auto-close uit te schakelen.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
