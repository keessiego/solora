<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="icons">
    <h2>Icons</h2>
    <p class="description">
        Solora gebruikt <a href="#" id="open-lucide" class="lucide-link">Lucide</a> voor al haar iconen. Je hebt toegang tot duizenden prachtige, consistente iconen door simpelweg de naam te gebruiken.
    </p>
    
    <div class="demo-card">
        <div class="demo-grid">
            <sol-icon name="home" size="32"></sol-icon>
            <sol-icon name="user" size="32" color="var(--primary)"></sol-icon>
            <sol-icon name="settings" size="32"></sol-icon>
            <sol-icon name="bell" size="32" color="#ff9500"></sol-icon>
            <sol-icon name="cloud" size="32" color="#5ac8fa"></sol-icon>
            <sol-icon name="zap" size="32" color="#ff3b30"></sol-icon>
        </div>
    </div>
    
    <sol-code language="html" label="Usage">
<!-- Standaard (24px, currentColor) -->
&lt;sol-icon name="activity"&gt;&lt;/sol-icon&gt;

<!-- Met attributen -->
&lt;sol-icon name="activity" size="32" color="red" stroke-width="1.5"&gt;&lt;/sol-icon&gt;
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
                    <td><code>name</code></td>
                    <td>string</td>
                    <td>-</td>
                    <td>Verplicht. De naam van het Lucide icoon (bijv. <code>"heart"</code>, <code>"arrow-right"</code>). Klik op de link hierboven om ze te zoeken.</td>
                </tr>
                <tr>
                    <td><code>size</code></td>
                    <td>string | number</td>
                    <td><code>"24"</code></td>
                    <td>De breedte en hoogte van het icoon in pixels.</td>
                </tr>
                <tr>
                    <td><code>color</code></td>
                    <td>string</td>
                    <td><code>"currentColor"</code></td>
                    <td>De kleur van de lijnen (CSS color value).</td>
                </tr>
                <tr>
                    <td><code>stroke-width</code></td>
                    <td>string | number</td>
                    <td><code>"2"</code></td>
                    <td>De dikte van de lijnen.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
