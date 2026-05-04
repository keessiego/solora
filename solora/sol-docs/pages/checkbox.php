<?php include __DIR__ . '/../includes/header.php'; ?>

<section id="checkbox">
    <h2>Checkbox</h2>
    <p class="description">
        Een moderne, aanpasbare checkbox met vloeiende SVG-animaties. 
        Perfect voor formulieren en instellingen.
    </p>
    
    <div class="demo-card">
        <div style="display: flex; flex-direction: column; gap: 15px;">
            <sol-check checked>Onthoud mij</sol-check>
            <sol-check>Accepteer voorwaarden</sol-check>
            <sol-check disabled>Niet beschikbaar</sol-check>
            <sol-check checked disabled>Geselecteerd en uitgeschakeld</sol-check>
        </div>
    </div>

    <sol-code language="html" label="Gebruik">
&lt;sol-check checked&gt;Nieuwsbrief ontvangen&lt;/sol-check&gt;
&lt;sol-check id="terms"&gt;Ik ga akkoord&lt;/sol-check&gt;
    </sol-code>

    <h3 style="margin-top: 40px;">Javascript Voorbeeld</h3>
    <sol-code language="javascript">
const checkbox = document.querySelector('#terms');
checkbox.addEventListener('change', (e) => {
    console.log('Status gewijzigd:', e.detail.checked);
});
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
                    <td><code>checked</code></td>
                    <td>boolean</td>
                    <td><code>false</code></td>
                    <td>Bepaalt of de checkbox geselecteerd is.</td>
                </tr>
                <tr>
                    <td><code>disabled</code></td>
                    <td>boolean</td>
                    <td><code>false</code></td>
                    <td>Schakelt de interactie uit.</td>
                </tr>
            </tbody>
        </table>
    </div>
</section>

<?php include __DIR__ . '/../includes/footer.php'; ?>
