<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="switches">
    <h2>Switches</h2>
    <p class="description">
        De iconische iOS-stijl toggles voor instellingen en voorkeuren.
    </p>
    <div class="demo-card">
        <div class="demo-grid">
            <sol-switch></sol-switch>
            <sol-switch color-primary="#0071e3"></sol-switch>
            <sol-switch color-primary="#ff3b30"></sol-switch>
        </div>
    </div>
    <sol-code language="html" label="Usage">
&lt;sol-switch&gt;&lt;/sol-switch&gt;
&lt;sol-switch color-primary="#0071e3"&gt;&lt;/sol-switch&gt;
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
                    <td><code>color-primary</code></td>
                    <td>CSS Color</td>
                    <td><code>var(--color-primary, #34c759)</code></td>
                    <td>De achtergrondkleur wanneer de switch "aan" (checked) staat. Standaard is dit de Apple 'success' groen, maar je kan deze overschrijven.</td>
                </tr>
                <tr>
                    <td><code>color-secondary</code></td>
                    <td>CSS Color</td>
                    <td><code>var(--color-secondary, #d1d1d6)</code></td>
                    <td>De achtergrondkleur voor hover-statussen indien uit.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
