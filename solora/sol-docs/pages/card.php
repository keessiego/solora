<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="cards">
    <h2>Cards</h2>
    <p class="description">
        Veelzijdige containers met een hoogwaardig Apple-stijl "liquid glass" effect.
    </p>

    <div class="demo-grid">
        <sol-card style="width: 300px;">
            <h3 style="margin-top: 0;">Standaard (Glass)</h3>
            <p>De standaardstijl is "glass".</p>
        </sol-card>

        <sol-card bg="white" style="width: 300px;">
            <h3 style="margin-top: 0;">White Card</h3>
            <p>Gebruik <code>bg="white"</code> voor een solide witte achtergrond.</p>
        </sol-card>

        <sol-card bg="#ffebf0" style="width: 300px;">
            <h3 style="margin-top: 0;">Custom Color</h3>
            <p>Gebruik hex-codes zoals <code>bg="#ffebf0"</code>.</p>
        </sol-card>

        <sol-card bg="white/30" style="width: 300px;">
            <h3 style="margin-top: 0;">Opacity Syntax</h3>
            <p>Gebruik <code>bg="white/30"</code> voor 30% wit met behoud van blur.</p>
        </sol-card>
    </div>

    <h3 style="margin-top: 60px;">Geanimeerde Card</h3>
    <div class="demo-card">
        <sol-card animated bg="primary/20" style="max-width: 400px;">
            <h3 style="margin: 0;">Brand Transparency</h3>
            <p>Je kunt ook je primary kleur gebruiken met transparantie: <code>bg="primary/20"</code>.</p>
        </sol-card>
    </div>

    <sol-code language="html" label="Usage">
&lt;!-- Standaard glass --&gt;
&lt;sol-card bg="glass"&gt;...&lt;/sol-card&gt;

&lt;!-- Kleur met transparantie (behoudt blur!) --&gt;
&lt;sol-card bg="white/30"&gt;...&lt;/sol-card&gt;
&lt;sol-card bg="primary/20"&gt;...&lt;/sol-card&gt;

&lt;!-- Solide kleur (geen blur) --&gt;
&lt;sol-card bg="white"&gt;...&lt;/sol-card&gt;
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
                    <td><code>bg</code></td>
                    <td>string</td>
                    <td><code>"glass"</code></td>
                    <td>Bepaalt de achtergrondkleur. Ondersteunt <code>glass</code>, CSS kleurnamen, hex-codes of de <code>kleur/opacity</code> syntax (bijv. <code>white/30</code>).</td>
                </tr>
                <tr>
                    <td><code>animated</code></td>
                    <td>boolean</td>
                    <td><code>false</code></td>
                    <td>Activeert het hover-effect (omhoog komen en lichte vergroting) en het vloeibare glas-effect.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
